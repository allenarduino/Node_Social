import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback
} from "react-native";
import { Constants } from "expo";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import getPermission from "../utils/getPermission";
import * as Animatable from "react-native-animatable";
import { AuthContext } from "../App";
import jwt_decode from "jwt-decode";
import { Header } from "react-native-elements";
import { RectButton } from "react-native-gesture-handler";
import DrawerLayout from "react-native-gesture-handler/DrawerLayout";
import { useIsFocused } from "@react-navigation/native";
import EventSource from "react-native-sse";

const io = require("socket.io-client");

import {
  ContainerScroll,
  Container,
  ContainerHeader,
  ContainerItemStory,
  ContainerPhoto,
  Photo,
  Name,
  PostPhoto,
  ContainerActions,
  ContainerActionsIcons,
  GroupIcons,
  Label
} from "../Components/Posts/styles";
import { FontAwesome5 } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/Ionicons";
import { Video, AVPlaybackStatus } from "expo-av";
import Autolink from "react-native-autolink";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const socket = io("http://10.74.12.37:4000", {
  transports: ["websocket"]
});

const options = {
  allowsEditing: true
};

const options2 = {
  type: "video/*"
};

const Home = ({ navigation }) => {
  const { state, dispatch } = React.useContext(AuthContext);
  let url = state.url;
  const isFocused = useIsFocused();

  const token = state.token;
  const decoded = jwt_decode(token);
  const user_id = decoded;

  const [iconsConfigure] = React.useState({
    color: "#333",
    size: 20,
    style: {
      paddingRight: 15
    }
  });

  const [posts, setState] = React.useState([]);
  const [user, fetch_user] = React.useState([]);
  const [loading, controlLoading] = React.useState(true);
  const [max, setMax] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [bottomModalVisible, setBottomModalVisible] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(null);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  const openModal = id => {
    setModalVisible(true);
    setSelectedId(id);
  };

  const delete_post = id => {
    setModalVisible(false);
    let post_list = posts;
    for (let i = 0; i < post_list.length; i++) {
      let p = post_list[i];
      if (p.p_id === id) {
        post_list.splice(i, 1);
        break;
      }
    }
    setState(post_list);
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const data = { post_id: id };
    fetch(`${url}/delete_post`, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: myHeaders
    })
      .then(res => res.json())
      .then(data => {
        // alert(data.message);
      })
      .catch(err => console.log(err));
  };

  const _selectPhoto = async () => {
    const status = await getPermission(Permissions.CAMERA_ROLL);
    if (status) {
      const result = await ImagePicker.launchImageLibraryAsync(options);
      if (!result.cancelled) {
        navigation.navigate("PostPicture", { image: result.uri });
        toggleBottomSheet();
      }
    }
  };

  const fetch_posts = () => {
    let myHeaders = new Headers();
    myHeaders.append("x-access-token", state.token);
    fetch(`${url}/posts`, {
      method: "GET",
      headers: myHeaders
    })
      .then(res => res.json())
      .then(data => {
        setState(data.posts);
        fetch_user(data.user);
        controlLoading(false);
      })
      .catch(err => console.log(err));
  };
  /*
  const fetch_event_posts = () => {
    let myHeaders = new Headers();
    myHeaders.append("x-access-token", state.token);
    const source = new EventSource(`${url}/posts`, {
      method: "GET",
      headers: myHeaders
    });
    source.addEventListener("connected", event => {
      setState(event.data.posts);
      alert(event);
    });
  };
  */
  const like = id => {
    const newPost = posts.map(p =>
      p.p_id === id
        ? { ...p, post_liker: user_id, total_likes: p.total_likes + 1 }
        : p
    );

    setState(newPost);
    let myHeaders = new Headers();
    myHeaders.append("x-access-token", state.token);
    myHeaders.append("Content-Type", "application/json");
    const data = { post_id: id };
    fetch(`${url}/like_post`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: myHeaders
    })
      .then(res => res.json())
      .then(data => console.log(data.message))
      .catch(err => alert(err));
    setTimeout(fetch_posts, 50000);

    //socket.emit("like_post", { user_id: user_id, id: id });
  };

  const unlike = async (e, id) => {
    const newPost = posts.map(p =>
      p.p_id === id
        ? { ...p, post_liker: null, total_likes: p.total_likes - 1 }
        : p
    );

    setState(newPost);

    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const data = { post_id: id };
    fetch(`${url}/unlike_post`, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: myHeaders
    }).then(res => res.json());
    // .then(data => alert(data.message));
    // .catch(err=>alert(err))
  };

  React.useEffect(() => {
    if (isFocused) {
      fetch_posts();
      // fetch_event_posts();
    }
  }, [navigation, isFocused, socket]);

  const drawerRef = React.useRef(null);
  const renderDrawer = () => {
    return (
      <View style={{ marginTop: 10 }}>
        {user.map(u => (
          <View>
            <Image
              source={{ uri: `${url}/${u.coverphoto}` }}
              style={styles.coverPhoto}
            />

            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("SingleProfile", { user_id: u.user_id })
                }
              >
                <Image
                  source={{ uri: `${url}/${u.user_img}` }}
                  style={styles.avartar}
                />
              </TouchableOpacity>
              <Text style={styles.name}>{u.full_name}</Text>
            </View>
          </View>
        ))}
        <View style={{ marginTop: 50, marginLeft: 50 }}>
          <View style={styles.drawerTextContainer}>
            <Icon name="calendar" size={30} color="black" />
            <Text style={styles.drawerText}>Events</Text>
          </View>

          <View style={styles.drawerTextContainer}>
            <Icon
              name="cart"
              size={30}
              color="black"
              onPress={() => navigation.navigate("BuynSellStack")}
            />
            <Text style={styles.drawerText}>Buy and Sell</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <DrawerLayout
        ref={drawerRef}
        drawerWidth={270}
        drawerPosition={DrawerLayout.positions.Left}
        drawerType="slide"
        drawerBackgroundColor="#fff"
        renderNavigationView={renderDrawer}
      >
        <Header
          placement="left"
          centerComponent={
            <Text
              style={{
                fontSize: 24,
                fontStyle: "italic",
                fontWeight: "bold",
                color: "rgb(95, 32, 155)",
                alignSelf: "center"
              }}
            >
              Teklife
            </Text>
          }
          rightComponent={
            <TouchableOpacity
              onPress={() => navigation.navigate("ChatSection")}
              style={{ marginLeft: 20 }}
            >
              <Icon name="chatbox-outline" size={27} color="rgb(95, 32, 155)" />
            </TouchableOpacity>
          }
          leftComponent={
            <TouchableOpacity onPress={() => drawerRef.current.openDrawer()}>
              <Icon name="menu-outline" size={27} color="rgb(95, 32, 155)" />
            </TouchableOpacity>
          }
          containerStyle={{
            backgroundColor: "#fff",
            //justifyContent: 'space-around',
            height: "13%"
          }}
        />
        {loading ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: HEIGHT / 3
            }}
          >
            <Image
              source={require("../Images/loader5.gif")}
              style={{ height: 100, width: 100 }}
            />
          </View>
        ) : (
          <ContainerScroll>
            {posts.map((post, index) => (
              <Container key={index}>
                <ContainerHeader>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("SingleProfile", {
                        user_id: post.owner_id
                      })
                    }
                  >
                    <ContainerItemStory>
                      <ContainerPhoto>
                        <Photo
                          source={{
                            uri: `${url}/${post.user_img}`
                          }}
                        />
                      </ContainerPhoto>
                      <Name>{post.full_name}</Name>
                    </ContainerItemStory>
                  </TouchableOpacity>
                  {post.owner_id == user_id ? (
                    <TouchableOpacity onPress={() => openModal(post.p_id)}>
                      <FontAwesome5 name="ellipsis-h" size={18} color="#888" />
                    </TouchableOpacity>
                  ) : null}
                </ContainerHeader>
                {post.is_video === "true" ? (
                  <Video
                    ref={video}
                    source={{
                      uri: `${url}/${post.post_media}`
                    }}
                    style={styles.myVideo}
                    useNativeControls={true}
                    resizeMode="cover"
                    //shouldPlay
                    onPlaybackStatusUpdate={status => setStatus(() => status)}
                  />
                ) : (
                  <PostPhoto
                    source={{
                      uri: `${url}/${post.post_media}`
                    }}
                  />
                )}
                <ContainerActions>
                  <ContainerActionsIcons>
                    <GroupIcons>
                      {post.post_liker === null ? (
                        <TouchableOpacity onPress={() => like(post.p_id)}>
                          <Icon name="heart-outline" size={25} color="black" />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity onPress={e => unlike(e, post.p_id)}>
                          <Icon name="heart" color="red" size={25} />
                        </TouchableOpacity>
                      )}
                      <TouchableOpacity
                        style={{ marginLeft: 10, marginTop: 2 }}
                      >
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate("SinglePost", {
                              post_id: post.p_id
                            })
                          }
                        >
                          <FontAwesome5 name="comment" {...iconsConfigure} />
                        </TouchableOpacity>
                      </TouchableOpacity>
                    </GroupIcons>
                    <FontAwesome5 name="bookmark" {...iconsConfigure} />
                  </ContainerActionsIcons>
                  <Label style={{ marginTop: -20 }}>
                    {post.total_likes} Likes
                  </Label>
                  <Label>
                    <Autolink text={post.post_caption} />
                  </Label>
                  {post.total_comments > 0 ? (
                    <TouchableOpacity>
                      <Text
                        onPress={() =>
                          navigation.navigate("SinglePost", {
                            post_id: post.p_id
                          })
                        }
                        style={{ color: "grey" }}
                      >
                        {post.total_comments} comments
                      </Text>
                    </TouchableOpacity>
                  ) : null}
                </ContainerActions>
              </Container>
            ))}
          </ContainerScroll>
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalOverlay}></View>
          </TouchableWithoutFeedback>
          <View style={styles.modalContent}>
            <Icon
              name="trash"
              size={30}
              onPress={() => delete_post(selectedId)}
            />
            <Text style={{ fontWeight: "bold" }}>Delete Post</Text>
          </View>
        </Modal>
      </DrawerLayout>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerText: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 5,
    color: "black"
  },
  drawerTextContainer: {
    flexDirection: "row",
    marginTop: 20,
    width: "100%"
  },
  coverPhoto: {
    height: 200,
    width: "100%"
  },
  avartar: {
    width: 110,
    height: 110,
    borderRadius: 110,
    marginTop: -50,
    borderWidth: 3,
    borderColor: "#fff"
  },
  name: {
    fontSize: 20,
    fontWeight: "bold"
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    height: HEIGHT,
    width: WIDTH
  },
  modalContent: {
    backgroundColor: "#fff",
    height: 150,
    width: "80%",
    alignSelf: "center",
    marginTop: HEIGHT / 3,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  bottomModal: {
    backgroundColor: "#fff",
    height: 250,
    width: "100%",
    alignSelf: "center",
    marginTop: HEIGHT / 3,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingLeft: 10,
    paddingTop: 10
  },

  myVideo: {
    flex: 1,
    margin: 5,
    borderRadius: 10
  }
});

export default Home;

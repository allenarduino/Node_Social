import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  Modal,
  TouchableWithoutFeedback
} from "react-native";
import { Header } from "react-native-elements";
import { AuthContext } from "../contexts/AuthContextProvider";
import jwt_decode from "jwt-decode";
import { Video, AVPlaybackStatus } from "expo-av";
import Autolink from "react-native-autolink";

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
import { useIsFocused } from "@react-navigation/native";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const SingleProfile = ({ route, navigation }) => {
  const { state, dispatch } = React.useContext(AuthContext);
  const isFocused = useIsFocused();

  let url = state.url;
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

  const initialState = {
    myprofile: [],
    myposts: []
  };

  //const [profile_data,setState]=React.useState(initialState);

  const [myposts, fetchPosts] = React.useState([]);
  const [myprofile, fetchProfile] = React.useState([]);
  const [loading, controlLoading] = React.useState(true);
  const [max, setMax] = React.useState("");
  const [modalVisible, setModalVisible] = React.useState(false);
  const [bottomModalVisible, setBottomModalVisible] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(null);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [posts, setState] = React.useState([]);
  const scrollRef = React.useRef();

  const openModal = id => {
    setModalVisible(true);
    setSelectedId(id);
  };

  const delete_post = id => {
    setModalVisible(false);
    let post_list = myposts;
    for (let i = 0; i < post_list.length; i++) {
      let p = post_list[i];
      if (p.p_id === id) {
        post_list.splice(i, 1);
        break;
      }
    }
    fetchPosts(post_list);
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

  let data_sent = JSON.stringify({
    user_id: route.params.user_id
  });

  const scroll_to_Top = () => {
    scrollRef.current.scrollTo({
      y: 0,
      animated: true
    });
  };

  const fetch_user = () => {
    let myHeaders = new Headers();
    myHeaders.append("x-access-token", state.token);
    fetch(`${url}/user_profile/${route.params.user_id}`, {
      method: "GET",
      headers: myHeaders
    })
      .then(res => res.json())
      .then(data => {
        fetchProfile(data.user_profile);
        fetchPosts(data.user_posts);
        controlLoading(false);
      })
      .catch(err => console.log(err));
    setTimeout(fetch_user, 50000);
  };

  React.useEffect(() => {
    if (isFocused) {
      fetch_user();
    }
  }, [{ route, navigation }, isFocused]);

  const like = async id => {
    const newPost = myposts.map(p =>
      p.p_id === id
        ? { ...p, post_liker: user_id, total_likes: p.total_likes + 1 }
        : p
    );

    //  dispatch({ type: "FETCH_USER_POSTS", payload: newPost });
    fetchPosts(newPost);

    const data = new FormData();
    data.append("post_id", id);
    data.append("token", state.token);

    fetch(`${url}/like_post.php`, {
      method: "POST",
      body: data
      //headers: {
      //  'Content-Type': 'multipart/form-data'
      //}
    })
      .then(res => res.json())
      .then(data => console.log(data.message));
    //.catch(err=>alert(err))
  };

  const unlike = async (e, id) => {
    const newPost = myposts.map(p =>
      p.p_id === id
        ? { ...p, post_liker: null, total_likes: p.total_likes - 1 }
        : p
    );

    fetchPosts(newPost);
    const data = new FormData();
    data.append("post_id", id);
    data.append("token", state.token);

    fetch(`${url}/unlike_post.php`, {
      method: "POST",
      body: data
      //headers: {
      //  'Content-Type': 'multipart/form-data'
      //}
    }).then(res => res.json());
    // .then(data=>alert(data.message))
    // .catch(err=>console.log(err))
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {myprofile.map(user => (
        <Header
          placement="left"
          leftComponent={
            <Text onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={27} />
            </Text>
          }
          centerComponent={
            <Text
              onPress={() => navigation.goBack()}
              s
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "black",
                marginLeft: -5
              }}
            >
              {user.full_name}
            </Text>
          }
          rightComponent={
            user_id == route.params.user_id ? (
              <TouchableOpacity
                onPress={() => navigation.navigate("EditProfile")}
              >
                <Icon name="pencil" size={25} color="rgb(95, 32, 155)" />
              </TouchableOpacity>
            ) : null
          }
          containerStyle={{
            backgroundColor: "#fff",
            //justifyContent: 'space-around',
            height: "13%"
          }}
        />
      ))}
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
        <ScrollView ref={scrollRef}>
          <ContainerScroll>
            {myprofile.map(p => (
              <View>
                <Image
                  source={{ uri: `${url}/${p.coverphoto}` }}
                  style={styles.coverPhoto}
                />
                <View style={{ alignItems: "center" }}>
                  <Image
                    source={{ uri: `${url}/${p.user_img}` }}
                    style={styles.avartar}
                  />
                  <Text style={styles.name}>{p.full_name}</Text>
                  <Text style={styles.bio}>{p.bio}</Text>
                  {user_id == p.user_id ? (
                    <TouchableOpacity
                      style={styles.editProfile}
                      onPress={() =>
                        navigation.navigate("EditProfile", {
                          user_id: p.user_id,
                          full_name: p.full_name,
                          bio: p.bio,
                          coverphoto: p.coverphoto,
                          user_img: p.user_img
                        })
                      }
                    >
                      <Text style={styles.editProfileText}>Edit Profile</Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      style={styles.messageUser}
                      onPress={() =>
                        navigation.navigate("DirectMessage", {
                          user_id: p.user_id,
                          full_name: p.full_name,
                          user_img: p.user_img
                        })
                      }
                    >
                      <Text style={styles.messageUserText}>Message</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))}

            <View style={{ marginTop: 100 }}>
              {myposts.map((post, index) => (
                <Container key={index}>
                  <ContainerHeader>
                    <TouchableOpacity onPress={() => scroll_to_Top()}>
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
                        <FontAwesome5
                          name="ellipsis-h"
                          size={18}
                          color="#888"
                        />
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
                          <TouchableOpacity onPress={e => like(post.p_id)}>
                            <Icon
                              name="heart-outline"
                              size={25}
                              color="black"
                            />
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity onPress={e => unlike(e, post.p_id)}>
                            <Icon name="heart" color="red" size={25} />
                          </TouchableOpacity>
                        )}
                        <TouchableOpacity
                          style={{ marginLeft: 10, marginTop: 2 }}
                          onPress={() =>
                            navigation.navigate("SinglePost", {
                              post_id: post.p_id
                            })
                          }
                        >
                          <FontAwesome5 name="comment" {...iconsConfigure} />
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
            </View>
          </ContainerScroll>
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
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  coverPhoto: {
    height: HEIGHT / 2,
    width: "100%",
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15
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
    fontSize: 25,
    fontWeight: "bold"
  },
  editProfile: {
    backgroundColor: "rgb(95, 32, 155)",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    height: 35,
    borderRadius: 20,
    marginTop: 30
  },
  editProfileText: {
    color: "#fff",
    fontWeight: "bold"
  },
  messageUser: {
    backgroundColor: "transparent",
    borderWidth: 3,
    borderColor: "rgb(95, 32, 155)",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    height: 35,
    borderRadius: 20,
    marginTop: 30
  },
  messageUserText: {
    color: "rgb(95, 32, 155)",
    fontWeight: "bold"
  },
  myVideo: {
    flex: 1,
    margin: 5,
    borderRadius: 10
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
  }
});

export default SingleProfile;

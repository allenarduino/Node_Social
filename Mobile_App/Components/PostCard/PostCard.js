import React from "react";
import * as Expo from "expo";
import Icon from "react-native-vector-icons/Ionicons";
import jwt_decode from "jwt-decode";
import Autolink from "react-native-autolink";
import { Video, AVPlaybackStatus } from "expo-av";
import { useNavigationState } from "@react-navigation/native";
import URL from "../../Screens/url";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { ThemeContext } from "../../contexts/ThemeContextProvider";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { PostContext } from "../../contexts/PostContextProvider";
import { ProfileContext } from "../../contexts/ProfileContextProvider";

import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableHighlight,
  Platform,
  Dimensions,
  Image,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";
import {
  PostCardDesign,
  UserImage,
  PostCardContent,
  Line1,
  LineBox,
  UserName,
  Delete_Background,
  Delete,
  Spacer,
  Line2,
  PostImage,
  Line3,
  Line4,
  HeartWrapper,
  CommentBackground
} from "./styles";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const PostCard = ({ post, navigation, scroll_to_Top }) => {
  let url = URL();
  const [pulse, setPulse] = React.useState({});
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(null);
  const { theme_state } = React.useContext(ThemeContext);
  const { auth_state } = React.useContext(AuthContext);
  const { post_state, post_dispatch } = React.useContext(PostContext);
  const { profile_state, profile_dispatch } = React.useContext(ProfileContext);

  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  const screenName = useNavigationState(
    state => state.routes[state.index].name
  );

  //For toggling heart animation

  const currentValue = new Animated.Value(1);
  const AnimatedIcon = Animated.createAnimatedComponent(MaterialCommunityIcons);

  const token = auth_state.token;
  const decoded = jwt_decode(token);
  const user_id = decoded;

  const like = id => {
    const newPost = post_state.posts.map(p =>
      p.p_id === id
        ? { ...p, post_liker: user_id, total_likes: p.total_likes + 1 }
        : p
    );

    //For user profile posts
    const newProfilePost = profile_state.user_posts.map(p =>
      p.p_id === id
        ? { ...p, post_liker: user_id, total_likes: p.total_likes + 1 }
        : p
    );
    post_dispatch({ type: "FETCH_POSTS", payload: newPost });
    profile_dispatch({ type: "FETCH_USER_POSTS", payload: newProfilePost });

    //Sending like details to server
    let myHeaders = new Headers();
    myHeaders.append("x-access-token", auth_state.token);
    myHeaders.append("Content-Type", "application/json");
    const data = { post_id: id };
    fetch(`${url}/like_post`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: myHeaders
    })
      .then(res => res.json())
      .then(data => console.log(data.message))
      .catch(err => console.log(err));
  };

  const unlike = id => {
    const newPost = post_state.posts.map(p =>
      p.p_id === id
        ? { ...p, post_liker: null, total_likes: p.total_likes - 1 }
        : p
    );

    //For handling user profile posts
    const newProfilePost = profile_state.user_posts.map(p =>
      p.p_id === id
        ? { ...p, post_liker: null, total_likes: p.total_likes - 1 }
        : p
    );

    post_dispatch({ type: "FETCH_POSTS", payload: newPost });
    profile_dispatch({ type: "FETCH_USER_POSTS", payload: newProfilePost });

    //Sending like details to server
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

  const openModal = id => {
    setModalVisible(true);
    setSelectedId(id);
  };

  const delete_post = id => {
    setModalVisible(false);
    post_dispatch({ type: "DELETE_POST", payload: id });
    profile_dispatch({ type: "DELETE_POST", payload: id });
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

  return (
    <>
      <PostCardDesign>
        <PostCardContent>
          <Line1>
            <LineBox>
              <TouchableOpacity
                onPress={() => {
                  screenName == "Home"
                    ? navigation.navigate("SingleProfile", {
                        user_id: post.owner_id
                      })
                    : scroll_to_Top();
                }}
              >
                <UserImage source={{ uri: `${url}/${post.user_img}` }} />
              </TouchableOpacity>
              <UserName
                onPress={() => {
                  screenName == "Home"
                    ? navigation.navigate("SingleProfile", {
                        user_id: post.owner_id
                      })
                    : scroll_to_Top();
                }}
              >
                {post.full_name}
              </UserName>
            </LineBox>
            {post.owner_id == user_id ? (
              <Delete
                style={{ marginRight: 10 }}
                onPress={() => openModal(post.p_id)}
              >
                <FontAwesome5 name="ellipsis-h" size={18} color="#888" />
              </Delete>
            ) : null}
          </Line1>
          {post.post_caption == null ? null : (
            <Line2>
              <Autolink style={{ fontSize: 18 }}>{post.post_caption}</Autolink>
            </Line2>
          )}
          <Line3>
            {post.post_media == null ? null : post.is_video === "true" ? (
              <Video
                ref={video}
                style={{ height: "100%", width: "100%" }}
                source={{
                  uri: `${url}/${post.post_media}`
                }}
                useNativeControls={true}
                resizeMode="cover"
                //shouldPlay
                onPlaybackStatusUpdate={status => setStatus(() => status)}
              />
            ) : (
              <TouchableWithoutFeedback
                onPress={() =>
                  navigation.navigate("DetailedImage", {
                    detailed_image: post.post_media
                  })
                }
              >
                <PostImage
                  source={{
                    uri: `${url}/${post.post_media}`
                  }}
                />
              </TouchableWithoutFeedback>
            )}
          </Line3>
          <Line4>
            <HeartWrapper>
              <AnimatedIcon
                onPress={() => {
                  post.post_liker == null ? like(post.p_id) : unlike(post.p_id);
                  post.post_liker == null ? setPulse(true) : setPulse(false);
                }}
                name={post.post_liker == null ? "heart-outline" : "heart"}
                size={25}
                color={post.post_liker == null ? "black" : "red"}
                style={{
                  transform: [{ scale: currentValue }]
                }}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  marginLeft: 10
                }}
              >
                {post.total_likes}
              </Text>
            </HeartWrapper>
            <CommentBackground>
              <FontAwesome5
                name="comment"
                size={24}
                onPress={() =>
                  navigation.navigate("Comments", { post_id: post.p_id })
                }
              />
              <Text
                style={{ fontSize: 18, fontWeight: "bold", marginLeft: 10 }}
              >
                {post.total_comments}
              </Text>
            </CommentBackground>
          </Line4>
        </PostCardContent>
      </PostCardDesign>
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
    </>
  );
};
export default PostCard;

const styles = StyleSheet.create({
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

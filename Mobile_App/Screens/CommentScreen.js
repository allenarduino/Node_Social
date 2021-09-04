import React from "react";
import jwt_decode from "jwt-decode";
import { AuthContext } from "../contexts/AuthContextProvider";
import { PostContext } from "../contexts/PostContextProvider";
import { CommentContext } from "../contexts/CommentContextProvider";
import { ThemeContext } from "../contexts/ThemeContextProvider";
import CommentCard from "../Components/CommentCard/CommentCard";
import URL from "./url";
const { v4: uuidv4 } = require("uuid");
import { Header } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import {
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  Dimensions,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image
} from "react-native";

//This modal is for Desktop Devices
const CommentScreen = ({ route, navigation }) => {
  const { post_state } = React.useContext(PostContext);
  const { comment_state, comment_dispatch } = React.useContext(CommentContext);
  const { auth_state } = React.useContext(AuthContext);
  let url = URL();
  const [comment_text, setComment] = React.useState("");
  const [loading, controlLoading] = React.useState(true);

  const token = auth_state.token;
  const decoded = jwt_decode(token);
  const user_id = decoded;

  //For scrolling when new comment is added
  const commentsEndRef = React.useRef(null);

  const scroll = React.useRef();

  //For fetching user_img  and name in context to use it offline
  const user_img = post_state.user.map(user => {
    return user.user_img;
  });
  const full_name = post_state.user.map(user => {
    return user.full_name;
  });

  //Fetching  the comments from server
  const fetch_comments = () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch(`${url}/fetch_comments/${route.params.post_id}`, {
      method: "GET",
      headers: myHeaders
    })
      .then(res => res.json())
      .then(data => {
        comment_dispatch({ type: "FETCH_COMMENTS", payload: data.comments });
        controlLoading(false);
      })
      .catch(err => console.log(err));
  };

  const offline_comment = {
    text: comment_text,
    user_img: user_img,
    full_name: full_name,
    id: uuidv4(),
    user_id: user_id
  };

  const create_comment = () => {
    if (comment_text == "") {
      return;
    }
    comment_dispatch({ type: "ADD_COMMENT", payload: offline_comment });
    //Clear innput
    setComment("");
    //Scroll to Top
    scroll.current.scrollTo({
      y: 0,
      animated: true
    });
    //Sending comment to the server
    let myHeaders = new Headers();
    myHeaders.append("x-access-token", auth_state.token);
    myHeaders.append("Content-Type", "application/json");
    const data = { comment_text: comment_text };
    fetch(`${url}/create_comment/${route.params.post_id}`, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(data => {
        console.log("Comment Created");
      })
      .catch(err => console.log(err));
  };

  React.useEffect(() => {
    fetch_comments();
  }, []);

  return (
    <View style={{ flex: 1 }}>
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
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "black",
              marginLeft: -5
            }}
          >
            Comments
          </Text>
        }
        containerStyle={{
          backgroundColor: "#fff",
          height: 100,
          flexDirection: "row",
          justifyContent: "center",
          display: "flex"
        }}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : null}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView ref={scroll}>
          {comment_state.comments.map(comment => (
            <CommentCard comment={comment} navigation={navigation} />
          ))}
        </ScrollView>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Write Comment"
              multiline
              style={styles.inputField}
              keyboardAppearance="dark"
              keyboardType="default"
              onChangeText={comment_text => setComment(comment_text)}
              value={comment_text}
            />
            <Icon name="image" size={25} color="rgb(95, 32, 155)" />
            <Icon
              name="camera"
              size={25}
              style={{ marginLeft: 10 }}
              color="rgb(95, 32, 155)"
            />
          </View>
          <Icon
            name="send"
            size={30}
            style={{ marginLeft: 10 }}
            color="rgb(95, 32, 155)"
            onPress={() => create_comment()}
          />
        </View>
        <View style={{ marginTop: 10 }}></View>
      </KeyboardAvoidingView>
    </View>
  );
};
export default CommentScreen;

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: "row",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 10,
    borderColor: "#fff",
    backgroundColor: "#fff",
    borderWidth: 2,
    marginTop: -10,
    borderRadius: 30,
    width: "83%"
  },

  inputField: {
    width: "78%",
    borderColor: "#fff",
    backgroundColor: "#fff",
    borderWidth: 2,
    paddingLeft: 10
  },
  chatBubble1: {
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 20,
    marginTop: 5,
    marginBottom: 5,
    marginRight: "4%",
    maxWidth: "80%",
    alignSelf: "flex-end",

    backgroundColor: "rgb(95, 32, 155)",
    color: "#fff"
  },

  chatBubble2: {
    paddingRight: 20,
    paddingLeft: 20,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 20,
    marginTop: 5,
    marginBottom: 5,
    maxWidth: "80%",
    marginLeft: "4%",
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    color: "#fff"
  },

  userAvatar: {
    height: 50,
    width: 50,
    borderRadius: 50
  }
});

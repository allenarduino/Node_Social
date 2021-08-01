import Icon from "react-native-vector-icons/Ionicons";
import React from "react";
import {
  Image,
  TextInput,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity
} from "react-native";
import HeaderButtons from "react-navigation-header-buttons";
import { Header } from "react-native-elements";
import { AuthContext } from "../App";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

import jwt_decode from "jwt-decode";
const io = require("socket.io-client");

const socket = io("http://10.74.12.37:4000", {
  transports: ["websocket"]
});

const PostPicture = ({ route, navigation }) => {
  const MyContext = React.createContext(MyContext);
  const { state, dispatch } = React.useContext(AuthContext);
  let url = state.url;
  const initialState = {
    post_caption: "",
    post_media: ""
  };
  const [mystate, setState] = React.useState(initialState);
  const [loading, controlLoading] = React.useState(false);

  const token = state.token;
  const decoded = jwt_decode(token);
  const user_id = decoded;

  const make_post = () => {
    controlLoading(true);

    let uri = route.params.image;
    let uriParts = route.params.image.split(".");
    let filename = uri.split("/").pop();
    let fileType = uriParts[uriParts.length - 1];
    const data = new FormData();
    data.append("post_media", {
      uri,
      name: `${filename}`,
      type: `image/${fileType}`
    });
    data.append("post_caption", mystate.post_caption);
    data.append("token", state.token);
    data.append("is_video", false);
    let myHeaders = new Headers();
    myHeaders.append("x-access-token", state.token);
    fetch(`http://10.74.12.37:4000/create_post`, {
      method: "POST",
      body: data,
      headers: myHeaders
    })
      .then(res => res.json())
      .then(data => {
        controlLoading(false);
        socket.emit("posts", user_id);
        // alert(data.message);
        navigation.navigate("Home");
      })
      .catch(err => {
        controlLoading(false);
        alert(err);
      });
  };

  //state = { text: '' };

  const { image } = route.params;
  return (
    <View>
      {loading ? (
        <View style={styles.modalWrapper}>
          <Image
            source={require("../Images/loader5.gif")}
            style={{ height: 100, width: 100 }}
          />
        </View>
      ) : null}
      <Header
        placement="left"
        leftComponent={
          <Icon
            name="close-outline"
            size={35}
            color="black"
            onPress={() => navigation.goBack()}
          />
        }
        rightComponent={
          <TouchableOpacity onPress={() => make_post()}>
            <Icon name="checkmark-circle-outline" size={35} color="black" />
          </TouchableOpacity>
        }
        containerStyle={{
          backgroundColor: "#fff",
          //justifyContent: 'space-around',
          height: 100
        }}
      />
      <ScrollView>
        <View>
          <View>
            <TextInput
              multiline
              placeholder="Write a Caption . . ."
              style={styles.input}
              onChangeText={post_caption => {
                setState(prevState => ({ ...prevState, post_caption }));
              }}
              value={mystate.post_caption}
            />
          </View>
          <Image
            source={{ uri: `${route.params.image}` }}
            style={styles.myImage}
          />
          <View style={styles.postContainer}></View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  myImage: {
    height: 400,
    width: "100%",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginTop: 10
  },
  input: {
    marginTop: 100,
    paddingTop: 20,
    fontSize: 20,
    paddingLeft: 10
  },

  myHeader: {
    width: "100%",
    paddingTop: 40,
    paddingBottom: 30,
    backgroundColor: "#fff"
  },

  postContainer: {
    display: "flex",
    alignItems: "center"
  },
  postButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 10,
    width: 70,
    height: 30,
    borderColor: "#333",
    color: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },

  modalWrapper: {
    height: HEIGHT,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default PostPicture;

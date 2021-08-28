import Icon from "react-native-vector-icons/Ionicons";
import styled from "styled-components";
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
import URL from "./url";
import HeaderButtons from "react-navigation-header-buttons";
import { Header } from "react-native-elements";
import { AuthContext } from "../contexts/AuthContextProvider";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

import jwt_decode from "jwt-decode";
const io = require("socket.io-client");

const socket = io("http://10.74.12.37:4000", {
  transports: ["websocket"]
});

const WritePost = ({ navigation }) => {
  const { auth_state } = React.useContext(AuthContext);
  let url = URL();

  const [post_caption, setPostCaption] = React.useState("");
  const [loading, controlLoading] = React.useState(false);

  const token = auth_state.token;
  const decoded = jwt_decode(token);
  const user_id = decoded;

  const make_post = () => {
    if (post_caption == "") {
      alert("Please never leave the form empty");
    } else {
      controlLoading(true);
      let myHeaders = new Headers();
      myHeaders.append("x-access-token", auth_state.token);
      myHeaders.append("Content-Type", "application/json");
      const data = { post_caption: post_caption };
      fetch(`${url}/write_post`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(data => {
          controlLoading(false);
          navigation.navigate("Home");
        })
        .catch(err => {
          console.log(err);
          controlLoading(false);
        });
    }
  };

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
              placeholder="Share your thoughts and experiences with people..."
              style={styles.input}
              value={post_caption}
              onChangeText={post_caption => setPostCaption(post_caption)}
            />
          </View>
          <View style={styles.postContainer}></View>
        </View>
      </ScrollView>
    </View>
  );
};
export default WritePost;

const styles = StyleSheet.create({
  input: {
    alignSelf: "center",
    fontSize: 20,
    height: 200,
    paddingLeft: 10,
    width: "90%",
    marginTop: 20,
    borderColor: "black",
    borderWidth: 1
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

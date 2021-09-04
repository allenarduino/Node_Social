import React from "react";

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
import Icon from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../contexts/AuthContextProvider";
import jwt_decode from "jwt-decode";
import { Header } from "react-native-elements";
import { useIsFocused } from "@react-navigation/native";
import URL from "./url";
import uuid from "uuid";
const io = require("socket.io-client");

const socket = io("http://10.74.9.244:3000", {
  transports: ["websocket"]
});

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export const MessageContext = React.createContext();

const DirectMessage = ({ route, navigation }) => {
  const { auth_state } = React.useContext(AuthContext);
  const scroll = React.useRef();
  const myinput = React.useRef();
  let url = URL();

  const isFocused = useIsFocused();

  const token = auth_state.token;
  const decoded = jwt_decode(token);
  const user_id = decoded;

  const [message, setMessage] = React.useState("");
  const [inputValue, setInputValue] = React.useState("");
  const [messages, updateMessages] = React.useState([]);
  const [sent, updateSent] = React.useState(false);
  const [max, setMax] = React.useState("");

  const sendMessage = async () => {
    const sender_id = user_id;
    const receipient_id = route.params.user_id;

    const offline_data = {
      sender_id: sender_id,
      receipient_id: route.params.user_id,
      message: message
    };

    if (message.trim().length === 0) {
      return;
    } else {
      setInputValue("");
      /* socket.emit("chat", offline_data);
      socket.on("chat", data => {
        alert(data);
      });*/
      updateMessages([...messages, offline_data]);
      //Sending message to the server
      let myHeaders = new Headers();
      myHeaders.append("x-access-token", auth_state.token);
      myHeaders.append("Content-Type", "application/json");
      const data = { message: message };
      fetch(`${url}/send_message/${receipient_id}`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(data => {
          console.log("Comment Created");
        })
        .catch(err => console.log(err));
    }
  };

  const fetch_messages = () => {
    const receipient_id = route.params.user_id;
    let myHeaders = new Headers();
    myHeaders.append("x-access-token", auth_state.token);
    myHeaders.append("Content-Type", "application/json");
    fetch(`${url}/fetch_messages/${receipient_id}`, {
      method: "GET",
      headers: myHeaders
    })
      .then(res => res.json())
      .then(data => {
        updateMessages(data.messages);
        controlLoading(false);
      })
      .catch(err => console.log(err));
    setTimeout(fetch_messages, 2000);
  };

  React.useEffect(() => {
    if (isFocused) {
      fetch_messages();
    }
  }, [navigation, isFocused]);

  return (
    <View style={{ flex: 1 }}>
      <Header
        placement="left"
        leftComponent={
          <Text onPress={() => navigation.goBack()} style={{ marginTop: 10 }}>
            <Icon name="arrow-back" size={27} />
          </Text>
        }
        centerComponent={
          <View style={{ flexDirection: "row" }}>
            <Image
              source={{
                uri: `${url}/${route.params.user_img}`
              }}
              style={styles.userAvatar}
            />
            <Text
              style={{
                marginLeft: 5,
                marginTop: 10,
                fontWeight: "bold",
                fontSize: 18
              }}
            >
              {route.params.full_name}
            </Text>
          </View>
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
        <ScrollView
          ref={scroll}
          onContentSizeChange={() =>
            scroll.current.scrollToEnd({ animated: true })
          }
        >
          <View style={{ marginTop: 100, marginBottom: 70 }}>
            {messages.map(m => (
              <View>
                {m.sender_id == user_id ? (
                  <View style={styles.chatBubble1}>
                    <Text style={{ color: "#fff" }}>{m.message}</Text>
                  </View>
                ) : (
                  <View style={styles.chatBubble2}>
                    <Text style={{ color: "#333" }}>{m.message}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </ScrollView>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Type Message"
              multiline
              style={styles.inputField}
              keyboardAppearance="dark"
              keyboardType="default"
              onChangeText={(message, inputValue) => {
                setMessage(message);
                setInputValue(inputValue);
              }}
              value={inputValue}
              ref={myinput}
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
            onPress={() => sendMessage()}
          />
        </View>
        <View style={{ marginTop: 10 }}></View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default DirectMessage;

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

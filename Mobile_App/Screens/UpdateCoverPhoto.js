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
import AsyncStorage from "@react-native-community/async-storage";
import HeaderButtons from "react-navigation-header-buttons";
import { Header } from "react-native-elements";
import { AuthContext } from "../App";

const io = require("socket.io-client");

const socket = io("http://10.74.14.80:5000", {
  transports: ["websocket"]
});

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

import jwt_decode from "jwt-decode";

const UpdateCoverPhoto = ({ route, navigation }) => {
  const MyContext = React.createContext(MyContext);
  const { state, dispatch } = React.useContext(AuthContext);
  let url = state.url;
  const initialState = {
    coverphoto: ""
  };
  const [mystate, setState] = React.useState(initialState);
  const [loading, controlLoading] = React.useState(false);

  const token = state.token;
  const decoded = jwt_decode(token);
  const user_id = decoded;

  const update_coverphoto = () => {
    controlLoading(true);

    let uri = route.params.image;
    let uriParts = route.params.image.split(".");
    let filename = uri.split("/").pop();
    let fileType = uriParts[uriParts.length - 1];
    const data = new FormData();
    data.append("coverphoto", {
      uri,
      name: `${filename}`,
      type: `image/${fileType}`
    });

    let myHeaders = new Headers();
    myHeaders.append("x-access-token", state.token);
    fetch(`${url}/update_coverphoto`, {
      method: "POST",
      body: data,
      headers: myHeaders
    })
      .then(res => res.json())
      .then(data => {
        controlLoading(false);
        navigation.navigate("Profile");
        //  alert("Coverphoto updating...");
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
          <TouchableOpacity onPress={() => update_coverphoto()}>
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
          <Image
            source={{ uri: `${route.params.image}` }}
            style={styles.myImage}
          />
          <Text
            style={{
              alignSelf: "center",
              fontWeight: "bold",
              fontSize: 20,
              marginTop: 20
            }}
          >
            CoverPhoto
          </Text>
          <View style={styles.postContainer}></View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  myImage: {
    height: HEIGHT / 2,
    width: "100%",
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15
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

export default UpdateCoverPhoto;

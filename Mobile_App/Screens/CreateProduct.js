import Icon from "react-native-vector-icons/Ionicons";
import React from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput
} from "react-native";
import HeaderButtons from "react-navigation-header-buttons";
import { Header } from "react-native-elements";
import { Video, AVPlaybackStatus } from "expo-av";
import { AuthContext } from "../contexts/AuthContextProvider";
import { Constants } from "expo";
import * as Permissions from "expo-permissions";
import URL from "../Screens/url";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import getPermission from "../utils/getPermission";
import { BottomSheet } from "react-native-btr";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

import jwt_decode from "jwt-decode";
import { number } from "prop-types";

const CreateProduct = ({ navigation }) => {
  const { auth_state, auth_dispatch } = React.useContext(AuthContext);
  const [image, setImage] = React.useState(null);
  const [imageVisible, setImageVisible] = React.useState(false);
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [loading, controlLoading] = React.useState(false);
  const [bottomModalVisible, setBottomModalVisible] = React.useState(false);

  const options = {
    allowsEditing: true
  };

  const toggleBottomSheet = () => {
    setBottomModalVisible(!bottomModalVisible);
  };

  const _takePhoto = async () => {
    const status = await getPermission(Permissions.CAMERA);
    if (status) {
      const result = await ImagePicker.launchCameraAsync(options);
      if (!result.cancelled) {
        setImageVisible(true);
        setImage(result.uri);
      }
    }
  };

  const _selectPhoto = async () => {
    const status = await getPermission(Permissions.CAMERA_ROLL);
    if (status) {
      const result = await ImagePicker.launchImageLibraryAsync(options);
      if (!result.cancelled) {
        setImageVisible(true);
        setImage(result.uri);
      }
    }
  };

  const cancel_photo = () => {
    setImageVisible(false);
    setImage(null);
  };

  let url = URL();

  const create_product = () => {
    const data = new FormData();
    data.append("name", name);
    data.append("price", price);
    data.append("phone_number", phoneNumber);
    data.append("description", description);
    if (
      !name.trim().length == 0 &&
      !price.trim().length == 0 &&
      !phoneNumber.trim().length == 0 &&
      imageVisible == true
    ) {
      let uri = image;
      let uriParts = image.split(".");
      let filename = uri.split("/").pop();
      let fileType = uriParts[uriParts.length - 1];

      data.append("product_img", {
        uri,
        name: `${filename}`,
        type: `image/${fileType}`
      });
      controlLoading(true);
      let myHeaders = new Headers();
      myHeaders.append("x-access-token", auth_state.token);
      fetch(`${url}/create_product`, {
        method: "POST",
        body: data,
        headers: myHeaders
      })
        .then(res => res.json())
        .then(mydata => {
          // alert(mydata.message);
          // controlLoading(false);
          navigation.navigate("Products");
        })
        .catch(err => {
          controlLoading(false);
          alert(err);
        });
    } else {
      alert("Please never leave any field empty");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Header
        placement="left"
        centerComponent={
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "black",
              alignSelf: "flex-start"
            }}
          >
            Add Product
          </Text>
        }
        rightComponent={
          <Icon
            name="menu"
            style={{ marginTop: 6 }}
            size={25}
            onPress={() => toggleBottomSheet()}
          />
        }
        containerStyle={{
          backgroundColor: "#fff",
          height: "13%"
        }}
      />
      <ScrollView>
        <View style={{ marginTop: 10 }}>
          {imageVisible ? (
            <View style={{ flexDirection: "row" }}>
              <Image
                source={{
                  uri: `${image}`
                }}
                style={styles.cameraBox}
              />
              <TouchableOpacity
                onPress={() => cancel_photo()}
                style={styles.cameraBox}
              >
                <Icon name="close-outline" size={30} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.BoxesWrapper}>
              <TouchableOpacity
                onPress={() => _takePhoto()}
                style={styles.cameraBox}
              >
                <Icon name="camera" size={20} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => _selectPhoto()}
                style={styles.cameraBox}
              >
                <Icon name="image" size={20} />
              </TouchableOpacity>
            </View>
          )}
          <TextInput
            style={styles.productName}
            placeholder="Product Name"
            value={name}
            onChangeText={name => setName(name)}
          />
          <TextInput
            style={styles.productPrice}
            placeholder="Price GHC"
            keyboardType="numeric"
            value={price}
            onChangeText={price => setPrice(price)}
          />
          <TextInput
            style={styles.productPrice}
            placeholder="Phone number"
            keyboardType="numeric"
            maxLength={10}
            value={phoneNumber}
            onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
          />
          <TextInput
            style={styles.productDescription}
            placeholder="Description"
            multiline
            value={description}
            onChangeText={description => setDescription(description)}
          />
          {!loading ? (
            <TouchableOpacity
              onPress={() => create_product()}
              style={styles.postButton}
            >
              <Text style={styles.postText}>POST</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.postButton}>
              <Text style={styles.postText}>Posting....</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      <BottomSheet
        visible={bottomModalVisible}
        onBackdropPress={toggleBottomSheet}
      >
        <View style={styles.bottomModal}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("CreateProduct");
                toggleBottomSheet();
              }}
              style={styles.button1}
            >
              <Text style={styles.buttonText}>Add Item</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button2}
              onPress={() => {
                navigation.navigate("MyProducts");
                toggleBottomSheet();
              }}
            >
              <Text style={styles.buttonText}>My Items</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  BoxesWrapper: {
    flexDirection: "row",
    alignSelf: "flex-start",
    marginLeft: 20
  },
  cameraBox: {
    backgroundColor: "whitesmoke",
    width: 80,
    height: 80,
    margin: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  },
  productName: {
    backgroundColor: "whitesmoke",
    width: "90%",
    alignSelf: "center",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    borderRadius: 22,
    marginTop: 20
  },
  productPrice: {
    backgroundColor: "whitesmoke",
    width: "40%",
    alignSelf: "flex-start",
    marginLeft: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    borderRadius: 22,
    marginTop: 20
  },
  productDescription: {
    backgroundColor: "whitesmoke",
    width: "90%",
    marginLeft: 20,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 22,
    marginTop: 20
  },
  postButton: {
    marginTop: 20,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(95, 32, 155)",
    width: "90%",
    color: "#fff",
    fontWeight: "bold",
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20
  },
  postText: {
    color: "#fff",
    fontWeight: "bold"
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
    paddingTop: 10,
    justifyContent: "center",
    alignItems: "center"
  },

  button1: {
    alignSelf: "center",
    backgroundColor: "rgb(95, 32, 155)",
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
    width: 100,
    height: 50,
    borderRadius: 20
  },
  button2: {
    alignSelf: "center",
    backgroundColor: "rgb(95, 32, 155)",
    marginLeft: 20,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 50,
    borderRadius: 20
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  }
});

export default CreateProduct;

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
  TouchableWithoutFeedback,
  Linking
} from "react-native";
import { Header } from "react-native-elements";
import { AuthContext } from "../contexts/AuthContextProvider";
import jwt_decode from "jwt-decode";
import { Video, AVPlaybackStatus } from "expo-av";
import Autolink from "react-native-autolink";

//import { FontAwesome5 } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const SingleProduct = ({ navigation, route }) => {
  const { state, dispatch } = React.useContext(AuthContext);
  let url = state.url;
  const {
    product_img,
    name,
    price,
    description,
    user_img,
    full_name,
    phone_number
  } = route.params;
  return (
    <View style={{ backgroundColor: "#fff", flex: 1 }}>
      <ScrollView>
        <Image
          source={{ uri: `${url}/${product_img}` }}
          style={styles.coverPhoto}
        />

        <View style={{ marginTop: 20, marginLeft: 20 }}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.price}>GHC {price}</Text>
          <Text style={styles.description}>{description}</Text>
          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <Image
              source={{ uri: `${url}/${user_img}` }}
              style={styles.avartar}
            />
            <Text style={styles.full_name}>{full_name}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.contactSeller}
          onPress={() => Linking.openURL(`tel:${phone_number}`)}
        >
          <Icon name="phone" color="#fff" size={20} />
          <Text style={styles.contactSellerText}>Contact Seller</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  coverPhoto: {
    height: HEIGHT / 2.5,
    width: "100%",
    marginTop: 30
  },
  name: {
    fontSize: 17
  },
  price: {
    fontWeight: "bold",
    color: "rgb(95, 32, 155)"
  },
  description: {
    color: "black",
    marginTop: 20,
    alignSelf: "center"
  },
  avartar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff"
  },
  full_name: {
    fontWeight: "bold",
    color: "black",
    marginTop: 12,
    marginLeft: 10
  },
  contactSeller: {
    backgroundColor: "rgb(95, 32, 155)",
    alignSelf: "center",
    width: "80%",
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    height: 40,
    borderRadius: 100
  },
  contactSellerText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 10
  }
});
export default SingleProduct;

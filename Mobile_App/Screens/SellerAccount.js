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
import { AuthContext } from "../App";
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

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const SellerAccount = ({ navigation }) => {
  const [products, setProducts] = React.useState([]);
  const [loading, controlLoading] = React.useState(true);
  const [max, setMax] = React.useState(0);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [bottomModalVisible, setBottomModalVisible] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(null);
  const { state, dispatch } = React.useContext(AuthContext);
  let url = state.url;

  const fetch_products = () => {
    fetch(`${url}/fetch_products.php/?max=${max}`, {
      method: "GET",
      "Content-Type": "application/json"
    })
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        controlLoading(false);
        setMax(data.product_count);
      })
      .catch(err => console.log(err));
    setTimeout(fetch_products, 6000);
  };

  return (
    <View>
      <Text>My Products</Text>
    </View>
  );
};

export default SellerAccount;

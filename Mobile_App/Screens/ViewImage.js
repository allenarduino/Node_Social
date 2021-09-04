import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions
} from "react-native";
import { Header } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import URL from "./url";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;
const ViewImage = ({ route, navigation }) => {
  const url = URL();
  return (
    <View style={{ flex: 1, backgroundColor: " rgba(0,0,0, 0.8)" }}>
      <Header
        placement="left"
        leftComponent={
          <Text onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={27} color="#fff" />
          </Text>
        }
        containerStyle={{
          backgroundColor: "transparent",
          height: 100,
          flexDirection: "row",
          justifyContent: "center",
          display: "flex"
        }}
      />
      <Image
        source={{ uri: `${url}/${route.params.detailed_image}` }}
        style={styles.image}
      />
    </View>
  );
};
export default ViewImage;

const styles = StyleSheet.create({
  image: {
    height: "90%",
    width: "100%",
    resizeMode: "contain",
    bottom: 0,
    flex: 1,
    alignSelf: "center"
  }
});

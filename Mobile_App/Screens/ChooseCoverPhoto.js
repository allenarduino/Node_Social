import { Constants } from "expo";
import React, { Component } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import getPermission from "../utils/getPermission";
import Icon from "react-native-vector-icons/Ionicons";

const options = {
  allowsEditing: true
};

export default class ChooseCoverPhoto extends Component {
  state = {};

  _selectPhoto = async () => {
    const status = await getPermission(Permissions.CAMERA_ROLL);
    if (status) {
      const result = await ImagePicker.launchImageLibraryAsync(options);
      if (!result.cancelled) {
        this.props.navigation.navigate("UpdateCoverPhoto", {
          image: result.uri
        });
        return (
          <Image
            source={{ uri: `${result.uri}` }}
            style={{ height: 200, width: "100%", zIndex: 2 }}
          />
        );
      }
    }
  };

  _takePhoto = async () => {
    const status = await getPermission(Permissions.CAMERA);
    if (status) {
      const result = await ImagePicker.launchCameraAsync(options);
      if (!result.cancelled) {
        this.props.navigation.navigate("UpdateCoverPhoto", {
          image: result.uri
        });
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text onPress={this._selectPhoto} style={styles.text}>
          <Icon name="image" size={20} />
          Select Photo
        </Text>
        <Text onPress={this._takePhoto} style={styles.text}>
          <Icon name="camera" size={20} />
          Take Photo
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    padding: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "rgb(95, 32, 155)"
  }
});

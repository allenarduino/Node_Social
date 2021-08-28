import React from "react";
import { Constants } from "expo";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import getPermission from "../utils/getPermission";
import Icon from "react-native-vector-icons/Ionicons";
import { BottomSheet } from "react-native-btr";

import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from "react-native";

const options = {
  allowsEditing: true
};

const options2 = {
  type: "video/*"
};

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const AddSection = ({ navigation }) => {
  const [bottomModalVisible, setBottomModalVisible] = React.useState(true);

  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  const toggleBottomSheet = () => {
    setBottomModalVisible(false);
  };

  const _selectPhoto = async () => {
    const status = await getPermission(Permissions.CAMERA_ROLL);
    if (status) {
      const result = await ImagePicker.launchImageLibraryAsync(options);
      if (!result.cancelled) {
        navigation.navigate("PostPicture", { image: result.uri });
        toggleBottomSheet();
      }
    }
  };

  const _takePhoto = async () => {
    const status = await getPermission(Permissions.CAMERA);
    if (status) {
      const result = await ImagePicker.launchCameraAsync(options);
      if (!result.cancelled) {
        navigation.navigate("PostPicture", { image: result.uri });
        toggleBottomSheet();
      }
    }
  };

  const _addVideo = async () => {
    const status = await getPermission(Permissions.CAMERA_ROLL);
    if (status) {
      const result = await DocumentPicker.getDocumentAsync(options2);
      if (!result.cancelled) {
        navigation.navigate("PostVideo", { video: result.uri });
        toggleBottomSheet();
      }
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "flex-end" }}>
      <View style={styles.bottomModal}>
        <TouchableOpacity onPress={() => _selectPhoto()}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Icon name="image-outline" size={24} />
            <Text style={{ marginTop: 2, marginLeft: 10 }}>Select Photo</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => _takePhoto()}>
          <View
            style={{ display: "flex", flexDirection: "row", marginTop: 20 }}
          >
            <Icon name="camera-outline" size={24} />
            <Text style={{ marginTop: 2, marginLeft: 10 }}>Take Photo</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => _addVideo()}>
          <View
            style={{ display: "flex", flexDirection: "row", marginTop: 20 }}
          >
            <Icon name="videocam-outline" size={24} />
            <Text style={{ marginTop: 2, marginLeft: 10 }}>Add Video/GIF</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("WritePost")}>
          <View
            style={{ display: "flex", flexDirection: "row", marginTop: 20 }}
          >
            <Icon name="pencil-outline" size={24} />
            <Text style={{ marginTop: 2, marginLeft: 10 }}>Write Post</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomModal: {
    backgroundColor: "#fff",
    height: 280,
    width: "100%",
    alignSelf: "center",
    marginTop: HEIGHT / 3,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingLeft: 10,
    paddingTop: 10
  }
});
export default AddSection;

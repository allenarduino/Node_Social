import React from "react";
import jwt_decode from "jwt-decode";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import Autolink from "react-native-autolink";
import Icon from "react-native-vector-icons/Ionicons";

import {
  PostCardDesign,
  UserImage,
  PostCardContent,
  Line1,
  LineBox,
  UserName,
  Delete_Background,
  Delete,
  Spacer,
  Line2,
  PostImage,
  Line3,
  Line4,
  HeartWrapper,
  CommentBackground
} from "./styles";

import {
  StyleSheet,
  View,
  Text,
  Modal,
  TouchableHighlight,
  Platform,
  Dimensions,
  Image,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

import { ThemeContext } from "../../contexts/ThemeContextProvider";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { CommentContext } from "../../contexts/CommentContextProvider";
import URL from "../../Screens/url";

const CommentCard = ({ comment, navigation }) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState(null);
  const { auth_state } = React.useContext(AuthContext);
  const { comment_dispatch } = React.useContext(CommentContext);
  let url = URL();

  const token = auth_state.token;
  const decoded = jwt_decode(token);
  const user_id = decoded;

  const openModal = id => {
    setModalVisible(true);
    setSelectedId(id);
  };

  const delete_comment = id => {
    setModalVisible(false);
    comment_dispatch({ type: "DELETE_COMMENT", payload: id });
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const data = { comment_id: id };
    fetch(`${url}/delete_comment`, {
      method: "DELETE",
      body: JSON.stringify(data),
      headers: myHeaders
    })
      .then(res => res.json())
      .then(data => {
        // alert(data.message);
      })
      .catch(err => alert(err));
  };

  return (
    <>
      <PostCardDesign>
        <PostCardContent>
          <Line1>
            <LineBox>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SingleProfile", {
                    user_id: comment.user_id
                  });
                }}
              >
                <UserImage source={{ uri: `${url}/${comment.user_img}` }} />
              </TouchableOpacity>
              <UserName
                onPress={() => {
                  navigation.navigate("SingleProfile", {
                    user_id: comment.user_id
                  });
                }}
              >
                {comment.full_name}
              </UserName>
            </LineBox>
            {comment.user_id == user_id ? (
              <Delete
                style={{ marginRight: 10 }}
                onPress={() => openModal(comment.id)}
              >
                <FontAwesome5 name="ellipsis-h" size={18} color="#888" />
              </Delete>
            ) : null}
          </Line1>

          <Line2>
            <Autolink style={{ fontSize: 18 }}>{comment.text}</Autolink>
          </Line2>
          <Line4></Line4>
        </PostCardContent>
      </PostCardDesign>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}></View>
        </TouchableWithoutFeedback>
        <View style={styles.modalContent}>
          <Icon
            name="trash"
            size={30}
            onPress={() => delete_comment(selectedId)}
          />
          <Text style={{ fontWeight: "bold" }}>Delete Comment</Text>
        </View>
      </Modal>
    </>
  );
};

export default CommentCard;

const styles = StyleSheet.create({
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    height: HEIGHT,
    width: WIDTH
  },
  modalContent: {
    backgroundColor: "#fff",
    height: 150,
    width: "80%",
    alignSelf: "center",
    marginTop: HEIGHT / 3,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center"
  }
});

import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { AuthContext } from "../contexts/AuthContextProvider";
import { ProfileContext } from "../contexts/ProfileContextProvider";
import URL from "./url";
import { useIsFocused } from "@react-navigation/native";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const EditProfile = ({ navigation, route }) => {
  const [full_name, setfullName] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [my_profile, setMyProfile] = React.useState([]);
  const [loadingName, controlNameLoading] = React.useState(false);
  const [loadingBio, controlBioLoading] = React.useState(false);
  const [loggedOutLoading, controlLogoutLoading] = React.useState(false);
  const { auth_state, auth_dispatch } = React.useContext(AuthContext);
  const { profile_state, profile_dispatch } = React.useContext(ProfileContext);

  let url = URL();
  const isFocused = useIsFocused();

  const update_name = () => {
    if (full_name == "") {
      alert("Name must not be empty");
    } else {
      controlNameLoading(true);
      const myHeaders = new Headers();
      myHeaders.append("x-access-token", auth_state.token);
      myHeaders.append("Content-Type", "application/json");
      fetch(`${url}/update_name`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({ full_name: full_name })
      })
        .then(res => res.json())
        .then(data => {
          controlNameLoading(false);
          alert(data.message);
        })
        .catch(err => {
          console.log(err);
          controlNameLoading(false);
        });
    }
  };

  const update_bio = () => {
    if (bio == "") {
      alert("Your bio must not be empty");
    } else {
      controlBioLoading(true);
      const myHeaders = new Headers();
      myHeaders.append("x-access-token", auth_state.token);
      myHeaders.append("Content-Type", "application/json");
      fetch(`${url}/update_bio`, {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({ bio: bio })
      })
        .then(res => res.json())
        .then(data => {
          controlBioLoading(false);
          alert(data.message);
        })
        .catch(err => {
          console.log(err);
          controlBioLoading(false);
        });
    }
  };

  const logOut = () => {
    controlLogoutLoading(true);
    let data = new FormData();
    data.append("token", auth_state.token);
    fetch(`${url}/log_out.php`, {
      method: "POST",
      body: data
    })
      .then(res => res.json())
      .then(data => {
        dispatch({ type: "LOGOUT" });
      })
      .catch(err => console.log(err));
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View>
          <Image
            source={{ uri: `${url}/${route.params.coverphoto}` }}
            style={styles.coverPhoto}
          />

          <Icon
            name="camera"
            size={35}
            color="#fff"
            onPress={() => navigation.navigate("ChooseCoverPhoto")}
            style={{
              marginLeft: "80%",
              alignSelf: "flex-end",
              marginRight: 10,
              marginTop: -30
            }}
          />

          <View style={{ alignItems: "center" }}>
            <Image
              source={{ uri: `${url}/${route.params.user_img}` }}
              style={styles.avartar}
            />
            <Icon
              name="camera"
              size={35}
              color="#fff"
              style={{
                alignSelf: "center",
                marginRight: 10,
                marginTop: -30
              }}
              onPress={() => navigation.navigate("ChooseUserImg")}
            />
          </View>
          <View style={{ marginTop: "20%" }}>
            <View style={styles.editName}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                Edit Name
              </Text>
              <View style={styles.TextInputContainer}>
                <TextInput
                  style={styles.inputField}
                  placeholder={route.params.full_name}
                  onChangeText={full_name => setfullName(full_name)}
                />
                {loadingName ? (
                  <Text style={{ fontSize: 12 }}>Updating...</Text>
                ) : (
                  <TouchableOpacity onPress={() => update_name()}>
                    <Icon
                      name="checkmark-circle-outline"
                      size={35}
                      style={{ marginLeft: 20 }}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <View style={styles.editName}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>Edit Bio</Text>
              <View style={styles.TextInputContainer}>
                <TextInput
                  style={styles.inputField2}
                  placeholder={route.params.bio}
                  multiline
                  maxLength={70}
                  onChangeText={bio => setBio(bio)}
                />
                {loadingBio ? (
                  <Text style={{ fontSize: 12 }}>Updating...</Text>
                ) : (
                  <TouchableOpacity onPress={() => update_bio()}>
                    <Icon
                      name="checkmark-circle-outline"
                      size={35}
                      style={{ marginLeft: 20 }}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  coverPhoto: {
    height: HEIGHT / 4,
    width: "100%",
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15
  },
  avartar: {
    width: 110,
    height: 110,
    borderRadius: 110,
    marginTop: -50,
    borderWidth: 3,
    borderColor: "#fff"
  },
  editName: {
    marginTop: 20,
    alignItems: "center"
  },

  TextInputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  inputField: {
    width: "80%",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: "#3333",
    borderRadius: 20,
    fontSize: 20
  },

  inputField2: {
    width: "80%",
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: "#3333",
    borderRadius: 20,
    fontSize: 20,
    height: 100
  },
  logoutButton: {
    marginTop: 50,
    marginBottom: 20,
    alignSelf: "center",
    backgroundColor: "rgb(172, 12, 12)",
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    paddingTop: 10,
    paddingBottom: 10
  }
});

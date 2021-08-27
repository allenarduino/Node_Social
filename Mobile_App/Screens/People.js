import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  Image,
  StyleSheet,
  TextInput
} from "react-native";
import URL from "./url";
import { List, ListItem, Header } from "react-native-elements";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import { ScrollView, RectButton } from "react-native-gesture-handler";
import { AuthContext } from "../contexts/AuthContextProvider";
import Icon from "react-native-vector-icons/Ionicons";
import { useIsFocused } from "@react-navigation/native";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const People = ({ navigation }) => {
  const [users, setUsers] = React.useState([]);
  const [loading, controlLoading] = React.useState(true);
  const [formVisible, setFormVisible] = React.useState(false);
  const [filteredData, setFilteredData] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const { auth_state } = React.useContext(AuthContext);
  let url = URL();
  const isFocused = useIsFocused();

  const showForm = () => {
    setFormVisible(true);
  };

  const fetch_users = () => {
    let myHeaders = new Headers();
    myHeaders.append("x-access-token", auth_state.token);
    myHeaders.append("Content-Type", "application/json");
    fetch(`${url}/users`, {
      method: "GET",
      headers: myHeaders
    })
      .then(res => res.json())
      .then(data => {
        setFilteredData(data);
        setUsers(data);
        controlLoading(false);
      })
      .catch(err => console.log(err));
  };

  const searchFilterFunction = text => {
    if (text) {
      const newData = users.filter(function(item) {
        const itemData = item.full_name
          ? item.full_name.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearch(text);
    } else {
      setFilteredData(users);
      setSearch(text);
    }
  };

  React.useEffect(() => {
    if (isFocused) {
      fetch_users();
    }
  }, [{ navigation }, useIsFocused]);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Header
        placement="left"
        leftComponent={
          !formVisible ? (
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>
              Find Users
            </Text>
          ) : null
        }
        centerComponent={
          formVisible ? (
            <TextInput
              onChangeText={text => searchFilterFunction(text)}
              value={search}
              placeholder="Search users..."
              style={{
                borderRadius: 25,
                borderColor: "whitesmoke",
                backgroundColor: "whitesmoke",
                width: "100%",
                paddingTop: 12,
                paddingBottom: 12,
                paddingLeft: 10
              }}
            />
          ) : null
        }
        rightComponent={
          !formVisible ? (
            <Icon
              name="search"
              style={{ marginTop: 6 }}
              size={20}
              onPress={() => showForm()}
            />
          ) : null
        }
        containerStyle={{
          backgroundColor: "#fff",
          //justifyContent: 'space-around',
          height: 100
        }}
      />

      <ScrollView>
        {loading ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: HEIGHT / 3,
              flex: 1
            }}
          >
            <Image
              source={require("../Images/loader5.gif")}
              style={{ height: 100, width: 100 }}
            />
          </View>
        ) : (
          filteredData.map(item => (
            <RectButton
              onPress={() =>
                navigation.navigate("SingleProfile", {
                  user_id: item.user_id
                })
              }
            >
              <View
                style={{
                  flexDirection: "row",
                  padding: 16,
                  alignItems: "center"
                }}
              >
                <Image
                  source={{ uri: `${url}/${item.user_img}` }}
                  size="giant"
                  style={styles.userImg}
                />
                <Text
                  style={{
                    color: "#000",
                    marginLeft: 10
                  }}
                >
                  {`${item.full_name}`}
                </Text>
              </View>
            </RectButton>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default People;

const styles = StyleSheet.create({
  userImg: {
    height: 50,
    width: 50,
    borderRadius: 50
  },

  container: {
    height: 300,
    margin: 10,
    borderRadius: 6
  }
});

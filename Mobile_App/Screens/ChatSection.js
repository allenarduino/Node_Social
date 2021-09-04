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
import { List, ListItem, Header } from "react-native-elements";
import { Avatar } from "react-native-elements/dist/avatar/Avatar";
import { ScrollView, RectButton } from "react-native-gesture-handler";
import { AuthContext } from "../contexts/AuthContextProvider";
import URL from "./url";
import Icon from "react-native-vector-icons/Ionicons";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const ChatSection = ({ navigation }) => {
  const [chats, setChats] = React.useState([]);
  const [loading, controlLoading] = React.useState(true);
  const [formVisible, setFormVisible] = React.useState(false);
  const [filteredData, setFilteredData] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const { auth_state, auth_dispatch } = React.useContext(AuthContext);
  let url = URL();

  const showForm = () => {
    setFormVisible(true);
  };

  const fetch_chats = () => {
    let myHeaders = new Headers();
    myHeaders.append("x-access-token", auth_state.token);
    myHeaders.append("Content-Type", "application/json");
    fetch(`${url}/fetch_chats`, {
      method: "GET",
      headers: myHeaders
    })
      .then(res => res.json())
      .then(data => {
        setFilteredData(data.chats);
        setChats(data.chats);
        controlLoading(false);
      })
      .catch(err => console.log(err));
    setTimeout(fetch_chats, 6000);
  };

  const searchFilterFunction = text => {
    if (text) {
      const newData = chats.filter(function(item) {
        const itemData = item.full_name
          ? item.full_name.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearch(text);
    } else {
      setFilteredData(chats);
      setSearch(text);
    }
  };

  React.useEffect(() => {
    fetch_chats();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Header
        placement="left"
        leftComponent={
          !formVisible ? (
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "black" }}>
              Chats
            </Text>
          ) : null
        }
        centerComponent={
          formVisible ? (
            <TextInput
              //autoCapitalize="none"
              //autoCorrect={false}
              onChangeText={text => searchFilterFunction(text)}
              value={search}
              placeholder="Search users..."
              style={{
                borderRadius: 25,
                borderColor: "#333",
                backgroundColor: "#fff",
                fontSize: 18
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
                navigation.navigate("DirectMessage", {
                  user_id: item.user_id,
                  full_name: item.full_name,
                  user_img: item.user_img
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
                <View>
                  <Text
                    style={{
                      color: "#000",
                      marginLeft: 10,
                      fontWeight: "bold"
                    }}
                  >
                    {`${item.full_name}`}
                  </Text>
                  <Text
                    style={{
                      color: "#000",
                      marginLeft: 10
                    }}
                  >
                    {item.lastmessage}
                  </Text>
                </View>
              </View>
            </RectButton>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default ChatSection;

const styles = StyleSheet.create({
  userImg: {
    height: 55,
    width: 55,
    borderRadius: 50
  },

  container: {
    height: 300,
    margin: 10,
    borderRadius: 6
  }
});

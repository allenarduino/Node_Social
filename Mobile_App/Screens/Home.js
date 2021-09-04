import React from "react";
import URL from "./url";
import PostCard from "../Components/PostCard/PostCard";
import { PostContext } from "../contexts/PostContextProvider";
import { AuthContext } from "../contexts/AuthContextProvider";
import { ThemeContext } from "../contexts/ThemeContextProvider";
import { Header } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import { useIsFocused } from "@react-navigation/native";
import jwt_decode from "jwt-decode";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal
} from "react-native";
import PostSkeletonLoader from "../Components/PostSkeletonLoader";

const Home = ({ navigation }) => {
  const { auth_state } = React.useContext(AuthContext);
  const { post_state, post_dispatch } = React.useContext(PostContext);
  const { theme_state } = React.useContext(ThemeContext);
  let url = URL();

  const isFocused = useIsFocused();

  const token = auth_state.token;
  const decoded = jwt_decode(token);
  const user_id = decoded;

  const fetch_posts = () => {
    let myHeaders = new Headers();
    myHeaders.append("x-access-token", auth_state.token);
    fetch(`${url}/posts`, {
      method: "GET",
      headers: myHeaders
    })
      .then(res => res.json())
      .then(data => {
        post_dispatch({ type: "FETCH_POSTS", payload: data.posts });
        post_dispatch({ type: "FETCH_USER", payload: data.user });
      })
      .catch(err => console.log(err));
  };

  //For retrieving current user image
  const user_img = post_state.user.map(user => {
    return user.user_img;
  });

  React.useEffect(() => {
    if (isFocused) {
      fetch_posts();
    }
  }, [navigation, isFocused]);

  return (
    <>
      <Header
        placement="left"
        leftComponent={
          <TouchableOpacity onPress={() => navigation.navigate("ProfileStack")}>
            <Image
              source={{ uri: `${url}/${user_img}` }}
              style={{ height: 40, width: 40, borderRadius: 40 }}
            />
          </TouchableOpacity>
        }
        centerComponent={
          <Text
            style={{
              fontSize: 24,
              fontStyle: "italic",
              fontWeight: "bold",
              color: "rgb(95, 32, 155)",
              alignSelf: "center"
            }}
          >
            Teklife
          </Text>
        }
        rightComponent={
          <TouchableOpacity
            onPress={() => navigation.navigate("ChatSection")}
            style={{ marginLeft: 20 }}
          >
            <Icon name="chatbox-outline" size={27} color="rgb(95, 32, 155)" />
          </TouchableOpacity>
        }
        containerStyle={{
          backgroundColor: "#fff",
          //justifyContent: 'space-around',
          height: "14%"
        }}
      />
      <ScrollView>
        <View style={{ paddingBottom: 30 }}>
          {post_state.posts.length == 0 ? (
            <PostSkeletonLoader />
          ) : (
            post_state.posts.map(post => (
              <PostCard post={post} navigation={navigation} />
            ))
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default Home;

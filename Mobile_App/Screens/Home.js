import React from "react";
import URL from "./url";
import PostCard from "../Components/PostCard/PostCard";
import { PostContext } from "../contexts/PostContextProvider";
import { AuthContext } from "../contexts/AuthContextProvider";
import { ThemeContext } from "../contexts/ThemeContextProvider";
import { useIsFocused } from "@react-navigation/native";
import jwt_decode from "jwt-decode";
import { ScrollView } from "react-native";

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

  React.useEffect(() => {
    if (isFocused) {
      fetch_posts();
    }
  }, [navigation, isFocused]);

  return (
    <ScrollView style={{ marginTop: 50 }}>
      {post_state.posts.map(post => (
        <>
          <PostCard post={post} />
        </>
      ))}
    </ScrollView>
  );
};

export default Home;

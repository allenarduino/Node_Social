import React from "react";
import { Text, View, Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AddSection from "../Screens/AddSection";
import SelectPhotoScreen from "../Screens/SelectPhotoScreen";
import NewPostScreen from "../Screens/PostPicture";
import PostVideo from "../Screens/PostVideo";
import PostPicture from "../Screens/PostPicture";
import WritePost from "../Screens/WritePost";
import HomeStack from "./HomeStack";
import Home from "../Screens/Home";
import MyContext from "../Screens/PostPicture";

const Stack = createStackNavigator();

function AddStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="AddSection"
      headerMode="screen"
      mode="modal"
    >
      <Stack.Screen
        name="AddSection"
        component={AddSection}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="PostPicture"
        component={PostPicture}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="PostVideo"
        component={PostVideo}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="WritePost"
        component={WritePost}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AddStack;

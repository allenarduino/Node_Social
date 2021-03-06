import React from "react";
import { Text, View, Button, TouchableOpacity } from "react-native";
import {
  NavigationContainer,
  useNavigationState
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Screens/Home";
import ChatSection from "../Screens/ChatSection";
import SingleProfile from "../Screens/SingleProfile";
import DirectMessage from "../Screens/DirectMessage";
import SinglePost from "../Screens/SinglePost";
import CommentScreen from "../Screens/CommentScreen";
import EditProfile from "../Screens/EditProfile";
import ChooseUserImg from "../Screens/ChooseUserImg";
import ChooseCoverPhoto from "../Screens/ChooseCoverPhoto";
import UpdateUserImg from "../Screens/UpdateUserImg";
import UpdateCoverPhoto from "../Screens/UpdateCoverPhoto";
import NewPostScreen from "../Screens/PostPicture";
import Icon from "react-native-vector-icons/Ionicons";

import MyContext from "../Screens/PostPicture";
import ViewImage from "../Screens/ViewImage";

const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home" headerMode="screen">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SingleProfile"
        component={SingleProfile}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="DirectMessage"
        component={DirectMessage}
        options={{ headerShown: false, tabBarVisible: false }}
      />

      <Stack.Screen
        name="SinglePost"
        component={SinglePost}
        options={{
          title: "Comments"
        }}
      />

      <Stack.Screen
        name="ChatSection"
        component={ChatSection}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Comments"
        component={CommentScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DetailedImage"
        component={ViewImage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default HomeStack;

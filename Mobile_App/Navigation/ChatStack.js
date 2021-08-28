import React from "react";
import { Text, View, Button, TouchableOpacity } from "react-native";
import { NavigationContainer, navigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ChatSection from "../Screens/ChatSection";
import DirectMessage from "../Screens/DirectMessage";
import Icon from "react-native-vector-icons/Ionicons";

const Stack = createStackNavigator();

function ChatStack() {
  return (
    <Stack.Navigator initialRouteName="People" headerMode="screen">
      <Stack.Screen
        name="ChatSection"
        component={ChatSection}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="DirectMessage"
        component={DirectMessage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

ChatStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  console.log("navigation.state.routes[1].routeName", navigation);
  if (
    navigation.state.index > 0 &&
    navigation.state.routes[1].routeName === "DirectMessage"
  ) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

export default ChatStack;

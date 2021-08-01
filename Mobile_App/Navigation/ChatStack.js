import React from "react";
import { Text, View, Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
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

export default ChatStack;

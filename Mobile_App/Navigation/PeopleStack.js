import React from "react";
import { Text, View, Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import ChatSection from "../Screens/ChatSection";
import SingleProfile from "../Screens/SingleProfile";
import People from "../Screens/People";
import DirectMessage from "../Screens/DirectMessage";
import Icon from "react-native-vector-icons/Ionicons";
import ViewImage from "../Screens/ViewImage";

const Stack = createStackNavigator();

function PeopleStack({ navigation }) {
  return (
    <Stack.Navigator initialRouteName="People" headerMode="screen">
      <Stack.Screen
        name="People"
        component={People}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ChatSection"
        component={ChatSection}
        options={{
          title: "Chats"
        }}
      />

      <Stack.Screen
        name="SingleProfile"
        component={SingleProfile}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="DirectMessage"
        component={DirectMessage}
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

export default PeopleStack;

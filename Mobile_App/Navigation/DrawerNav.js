import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Home from "../Screens/Home";
import Profile from "../Screens/Profile";
import BottomTab from "../Navigation/BottomNav";
import { createAppContainer } from "react-navigation";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "react-navigation-drawer";

const DrawerNav = createDrawerNavigator(
  {
    Home: Home,
    Profile: Profile
  },
  {
    drawerBackgroundColor: "rgba(255,255,9)",
    contentOptions: {
      activeTintColor: "#fff",
      activeBackgroundColor: "#6b52ae"
    }
  }
);
export default createAppContainer(DrawerNav);

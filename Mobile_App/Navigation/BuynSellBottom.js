import React from "react";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import ProfileStack from "./ProfileStack";
import Products from "../Screens/Products";
import AddStack from "./AddStack";
import Profile from "../Screens/Profile";
import BuynSellStack from "./BuynSellStack";
import CreateProduct from "./CreateProduct";
import SellerAccount from "../Screens/SellerAccount";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

function BuynSellTab() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "rgb(95, 32, 155)",
        initialRouteName: "Home"
      }}
    >
      <Tab.Screen
        name="Products"
        component={Products}
        options={{
          tabBarLabel: "Products",
          activeColor: "rgb(179, 7, 127)",
          inactiveColor: "black",
          tabBarIcon: ({ color }) => (
            <Icon name="basket-outline" color={color} size={26} />
          )
        }}
      />

      <Tab.Screen
        name="CreateProduct"
        component={CreateProduct}
        options={{
          tabBarLabel: "CreateProduct",
          activeColor: "rgb(179, 7, 127)",
          tabBarIcon: ({ color }) => (
            <Icon
              name="add-circle"
              color={color}
              size={55}
              style={{ marginTop: -30 }}
            />
          )
        }}
      />

      <Tab.Screen
        name="SellerAccount"
        component={SellerAccount}
        options={{
          tabBarLabel: "Seller Account",
          activeColor: "rgb(179, 7, 127)",
          inactiveColor: "black",
          tabBarIcon: ({ color }) => (
            <Icon name="person-outline" color={color} size={26} />
          )
        }}
      />
    </Tab.Navigator>
  );
}

/*
const BuynSellTab = createMaterialBottomTabNavigator({
  Products: {
    screen: Products,
    navigationOptions: {
      tabBarLabel: "Buy n sell",
      activeColor: "rgb(95, 32, 155)",
      inactiveColor: "black",
      barStyle: { backgroundColor: "#fff" },
      tabBarVisible: false,
      tabBarIcon: ({ tintColor }) => (
        <Icon name="cart-outline" size={27} color={tintColor} />
      )
    }
  },

  AddStack: {
    screen: AddStack,
    navigationOptions: {
      tabBarLabel: "Buy n sell",
      activeColor: "rgb(95, 32, 155)",
      inactiveColor: "black",
      barStyle: { backgroundColor: "#fff" },
      tabBarVisible: false,
      tabBarIcon: ({ tintColor }) => (
        <Icon name="plus-circle-outline" size={27} color={tintColor} />
      )
    }
  },

  ProfileStack: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarLabel: "Profile",
      activeColor: "rgb(95, 32, 155)",
      inactiveColor: "black",
      barStyle: { backgroundColor: "#fff" },
      tabBarIcon: ({ tintColor }) => (
        <Icon name="person-outline" size={25} color={tintColor} />
      )
    }
  }
});
*/
export default BuynSellTab;

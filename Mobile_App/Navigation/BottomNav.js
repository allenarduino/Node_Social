/*import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import HomeStack from "./HomeStack";
import ProfileStack from "./ProfileStack";
import PeopleStack from "./PeopleStack";
import BuynSellStack from "./BuynSellStack";
import ChatStack from "./ChatStack";
import BuynSellTab from "./BuynSellBottom";

const BottomTab = createMaterialBottomTabNavigator({
  HomeStack: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: "Home",
      activeColor: "rgb(95, 32, 155)",
      inactiveColor: "#333",
      barStyle: { backgroundColor: "#fff" },
      tabBarIcon: ({ tintColor }) => (
        <Icon name="home-outline" size={25} color={tintColor} />
      )
    }
  },

  PeopleStack: {
    screen: PeopleStack,
    navigationOptions: {
      tabBarLabel: "Explore",
      activeColor: "rgb(95, 32, 155)",
      inactiveColor: "#333",
      barStyle: { backgroundColor: "#fff" },
      tabBarVisible: true,
      tabBarIcon: ({ tintColor }) => (
        <Icon name="search-outline" size={25} color={tintColor} />
      )
    }
  },

  ChatStack: {
    screen: ChatStack,
    navigationOptions: {
      tabBarLabel: "Messages",
      activeColor: "rgb(95, 32, 155)",
      inactiveColor: "black",
      barStyle: { backgroundColor: "#fff" },
      tabBarVisible: false,
      tabBarIcon: ({ tintColor }) => (
        <Icon name="chatbox-outline" size={25} color={tintColor} />
      )
    }
  },

  BuynSellStack: {
    screen: BuynSellStack,
    navigationOptions: {
      tabBarLabel: "Buy n sell",
      activeColor: "rgb(95, 32, 155)",
      inactiveColor: "black",
      barStyle: { backgroundColor: "#fff" },
      //tabBarVisible: false,
      tabBarIcon: ({ tintColor }) => (
        <Icon name="cart-outline" size={27} color={tintColor} />
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

export default createAppContainer(BottomTab);
*/

import React from "react";
import { StyleSheet, Text, View, Dimensions, AsyncStorage } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Home from "../Screens/Home";
import { FontAwesome } from "react-native-vector-icons";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import PeopleStack from "./PeopleStack";
import ChatStack from "./ChatStack";
import AddStack from "./AddStack";
import ProfileStack from "./ProfileStack";
import BuynSellStack from "./BuynSellStack";

const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: "rgb(95, 32, 155)"
        }}
        mode="modal"
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarLabel: "Home",
            activeColor: "rgb(179, 7, 127)",
            inactiveColor: "black",
            tabBarIcon: ({ color }) => (
              <Icon name="home-outline" color={color} size={26} />
            )
          }}
        />

        <Tab.Screen
          name="PeopleStack"
          component={PeopleStack}
          options={{
            tabBarLabel: "Users",
            activeColor: "rgb(179, 7, 127)",
            inactiveColor: "black",
            tabBarIcon: ({ color }) => (
              <Icon name="search-outline" color={color} size={26} />
            )
          }}
        />

        <Tab.Screen
          name="AddStack"
          component={AddStack}
          options={{
            tabBarLabel: "Add post",
            activeColor: "rgb(179, 7, 127)",
            inactiveColor: "black",
            tabBarIcon: ({ color }) => (
              <Icon name="add-circle" color={color} size={40} />
            )
          }}
        />

        <Tab.Screen
          name="BuynSellStack"
          component={BuynSellStack}
          options={{
            tabBarLabel: "Buy N Sell",
            activeColor: "rgb(179, 7, 127)",
            inactiveColor: "black",
            tabBarIcon: ({ color }) => (
              <Icon name="cart-outline" color={color} size={26} />
            )
          }}
        />

        <Tab.Screen
          name="ProfileStack"
          component={ProfileStack}
          options={{
            tabBarLabel: "Profile",
            activeColor: "rgb(179, 7, 127)",
            inactiveColor: "black",

            tabBarIcon: ({ color }) => (
              <Icon name="person-outline" color={color} size={26} />
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default BottomTab;

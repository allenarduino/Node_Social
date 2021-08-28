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
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  AsyncStorage,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Home from "../Screens/Home";
import { FontAwesomeIcon } from "react-native-vector-icons/FontAwesome5";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./HomeStack";
import PeopleStack from "./PeopleStack";
import ChatStack from "./ChatStack";
import AddStack from "./AddStack";
import ProfileStack from "./ProfileStack";
import BuynSellStack from "./BuynSellStack";

const Tab = createBottomTabNavigator();

const CustomTabBarButton = () => {
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        width: 40,
        height: 40,
        borderRadius: 35,
        backgroundColor: "rgb(95, 32, 155)"
      }}
    >
      <Icon name="add" color="#fff" size={26} />
    </View>
  );
};

function BottomTab() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          showLabel: false,
          style: {
            bottom: 25,
            paddingTop: 20,
            paddingBottom: 20,
            backgroundColor: "#fff",
            alignItems: "center",
            textAlign: "center",
            left: 20,
            right: 20,
            width: "90%",
            borderRadius: 100,
            height: 55
          }
        }}
        mode="modal"
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarLabel: "",
            inactiveColor: "black",
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Icon
                  name="home-outline"
                  size={26}
                  color={focused ? " rgb(95, 32, 155)" : "black"}
                />
                <Text
                  style={{
                    color: `${focused ? "rgb(95, 32, 155)" : "black"}`,
                    fontSize: 12
                  }}
                >
                  Home
                </Text>
              </View>
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
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Icon
                  name="search-outline"
                  size={26}
                  color={focused ? " rgb(95, 32, 155)" : "black"}
                />
                <Text
                  style={{
                    color: `${focused ? "rgb(95, 32, 155)" : "black"}`,
                    fontSize: 12
                  }}
                >
                  Users
                </Text>
              </View>
            )
          }}
        />

        <Tab.Screen
          name="AddStack"
          component={AddStack}
          options={{
            tabBarLabel: "",
            activeColor: "rgb(179, 7, 127)",
            inactiveColor: "black",
            tabBarIcon: ({ focused }) => <CustomTabBarButton />
          }}
        />

        <Tab.Screen
          name="BuynSellStack"
          component={BuynSellStack}
          options={{
            tabBarLabel: "",
            activeColor: "rgb(179, 7, 127)",
            inactiveColor: "black",
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Icon
                  name="cart-outline"
                  size={26}
                  color={focused ? " rgb(95, 32, 155)" : "black"}
                />
                <Text
                  style={{
                    color: `${focused ? "rgb(95, 32, 155)" : "black"}`,
                    fontSize: 12
                  }}
                >
                  Buy N Sell
                </Text>
              </View>
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

            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Icon
                  name="person-outline"
                  size={26}
                  color={focused ? " rgb(95, 32, 155)" : "black"}
                />
                <Text
                  style={{
                    color: `${focused ? "rgb(95, 32, 155)" : "black"}`,
                    fontSize: 12
                  }}
                >
                  Profile
                </Text>
              </View>
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default BottomTab;

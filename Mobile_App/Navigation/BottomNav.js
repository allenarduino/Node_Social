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
import {
  NavigationContainer,
  useNavigationState
} from "@react-navigation/native";
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
  let routeName = "";
  const getTabBarVisibility = route => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : "";

    if (routeName === "DirectMessage") {
      return false;
    }

    return true;
  };
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          showLabel: false,
          style: {
            zIndex: 1,
            backgroundColor: "#fff",
            alignItems: "center",
            textAlign: "center",
            //left: 20,
            //right: 20,
            //width: "90%",
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            height: 55
          }
        }}
        mode="modal"
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={({ route }) => ({
            tabBarVisible: getTabBarVisibility(route),
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
          })}
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

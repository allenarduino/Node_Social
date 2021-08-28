import React from "react";
import { Text, View, Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import BuynSellTab from "./BuynSellBottom";
import SingleProduct from "../Screens/SingleProduct";
import Products from "../Screens/Products";
import CreateProduct from "../Screens/CreateProduct";
import MyProducts from "../Screens/MyProducts";

const Stack = createStackNavigator();

function BuynSellStack() {
  return (
    <Stack.Navigator initialRouteName="Products" headerMode="screen">
      <Stack.Screen
        name="Buy n sell"
        component={Products}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SingleProduct"
        component={SingleProduct}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateProduct"
        component={CreateProduct}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Products"
        component={Products}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="MyProducts"
        component={MyProducts}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default BuynSellStack;

import React from "react";
import { Text, View, Button, TouchableOpacity } from "react-native";
//import {createStackNavigator} from "react-navigation-stack";
//import {createAppContainer,NavigationContainer} from 'react-navigation';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AddSection from "../Screens/AddSection";
//import SelectImage from '../Screens/SelectPhotoScreen';
//import Save from '../Screens/NewPostScreen';
import SelectPhotoScreen from "../Screens/SelectPhotoScreen";
import NewPostScreen from "../Screens/PostPicture";
import PostVideo from "../Screens/PostVideo";
import PostPicture from "../Screens/PostPicture";
import HomeStack from "./HomeStack";
import Home from "../Screens/Home";
import MyContext from "../Screens/PostPicture";

const Stack = createStackNavigator();

function AddStack(props) {
  return (
    <Stack.Navigator
      initialRouteName="AddSection"
      headerMode="screen"
      mode="modal"
    >
      <Stack.Screen
        name="AddSection"
        component={AddSection}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="PostPicture"
        component={PostPicture}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="PostVideo"
        component={PostVideo}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AddStack;

/*
const RootStack=createStackNavigator(
    {

      AddPost:{
        screen:AddPost,
        navigationOptions:{
          header:null
        }
      },

      SelectImage:{
        screen:SelectImage,
        navigationOptions:{
          header:null
        }
      },

      Save:{
        screen:Save,
        navigationOptions:{
          header:null
        }
      },

    
         //initialRouteName:"AppIntroOne",
       }
)

const AddStack=createAppContainer(RootStack);


export default AddStack;
*/
/*
import React from 'react';
import {Text,View} from 'react-native';
import AuthLoading from '../Screens/AuthLoading';
import LoginScreen from '../Screens/LoginScreen';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

function MainStackNavigatorOne() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      headerMode="screen"
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'tomato' },
      }}
    >
    
    <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: 'Awesome app',
        }}
      />


    </Stack.Navigator>
  );
}

export default MainStackNavigatorOne;
*/

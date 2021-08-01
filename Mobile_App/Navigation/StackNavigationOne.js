import React from 'react';
import {Text,View} from 'react-native';
import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer,NavigationContainer} from 'react-navigation'; 
import LoginScreen from '../Screens/LoginScreen';
import SignupScreen from '../Screens/SignupScreen';
import AppIntroOne from '../Screens/AppIntroOne';
import AppIntroTwo from '../Screens/AppIntroTwo';
import AppIntroThree from '../Screens/AppIntroThree';


 


const RootStack=createStackNavigator(
    {

      AppIntroOne:{
        screen:AppIntroOne,
        navigationOptions:{
          header:null
        }
      },

      AppIntroTwo:{
        screen:AppIntroTwo,
        navigationOptions:{
          header:null
        }
      },

      AppIntroThree:{
        screen:AppIntroThree,
        navigationOptions:{
          header:null
        }
      },

      SignupScreen:{
        screen:SignupScreen,
        navigationOptions:{
          header:null
        }
      },

      LoginScreen:{
        screen:LoginScreen,
        navigationOptions:{
          header:null
        }
      },

      },

    

    
     
    
      {
         initialRouteName:"AppIntroOne",
       }
)

const MainStackNavigatorOne=createAppContainer(RootStack);


export default MainStackNavigatorOne;

import React from 'react';
import {Text,View} from 'react-native';
import {createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from 'react-navigation'; 
import Products from '../Screens/Products';
import Login from '../Screens/Login';
import Cart from '../Screens/Cart';
import { StackActions } from 'react-navigation';
 


const RootStack=createStackNavigator(

 
    {

        Products:{
            screen: Products
        },

        Cart:{
            screen:Cart
        },
     
       
      

      
     

    
    },
      {
         initialRouteName:"Products",
    }
)

const AppNavOne=createAppContainer(RootStack);


export default AppNavOne;
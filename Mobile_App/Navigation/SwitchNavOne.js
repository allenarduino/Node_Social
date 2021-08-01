import React,{useState,useEffect} from 'react';
import {Text,AsyncStorage} from 'react-native';
import {createSwitchNavigator,createAppContainer} from 'react-navigation';
import MainStackNavigatorOne from './StackNavigationOne';
import BottomTab from './BottomNav';







const Switch=createSwitchNavigator ({


    MainStackNavigatorOne:{
        screen:MainStackNavigatorOne
    },
    
    BottomTab:{
    screen:BottomTab
},

},
{
    //initialRouteName:"MainStackNavigatorOne"
}

);
const SwitchNavOne=createAppContainer(Switch);
export default SwitchNavOne;
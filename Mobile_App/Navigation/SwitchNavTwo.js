import React,{useState,useEffect} from 'react';
import {Text,AsyncStorage} from 'react-native';
import {createSwitchNavigator,createAppContainer} from 'react-navigation';
import MainStackNavigatorOne from './StackNavigationOne';
import BottomTab from './BottomNav';







const Switch=createSwitchNavigator ({


    BottomTab:{
    screen:BottomTab
},

MainStackNavigatorOne:{
    screen:MainStackNavigatorOne
},

},
{
    initialRouteName:"BottomTab"
}

);
const SwitchNavTwo=createAppContainer(Switch);
export default SwitchNavTwo;
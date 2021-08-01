import * as React from 'react';
//import 'react-native-gesture-handler';

import { StyleSheet, Text, View,Dimensions,ActivityIndicator,TouchableOpacity } from 'react-native';
import BottomTab from '../Navigation/BottomNav';
import {NavigationContainer} from '@react-navigation/native';
//import MainStackNavigatorThree from '../Navigation/StackNavigationThree';
import SwitchNav from '../Navigation/SwitchNavOne';
import {connect} from 'react-redux';
import checkLoggedin from '../Actions/IsLoggedin';
import AsyncStorage from '@react-native-community/async-storage';
import MainStackNavigatorOne from '../Navigation/StackNavigationOne';

 

class AuthLoading extends React.Component{
    static navigationOptions = {
        header: null,
    };
    
    constructor(props) {
        super(props);
        this.bootsrapAsync();
    }

    componentDidMount(){
        this.bootsrapAsync();
    }

    bootsrapAsync=async()=>{
        const token=await AsyncStorage.getItem("token1");
        this.props.navigation.push("BottomTab");
        //alert("hey")
    }


    render(){
        {
            return(
                <View style={{marginTop:200}}>
                    <Text>Loading.......</Text>
                </View>
            )
        }
     }
}



const mapStateToProps = (state) => {
    return { token: state.token,}
 };

 

const mapDispatchToProps = dispatch => ({
    checkLoggedin
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoading);
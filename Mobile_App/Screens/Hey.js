import React from 'react';
import {
TouchableOpacity,
Text,
View
} from 'react-native';


class Hey extends React.Component{
render(){
    return(
        <View style={{marginTop:200}}>
            <TouchableOpacity >
                <Text>Login</Text>
            </TouchableOpacity>
        </View>
    )
}
}

export default Hey;
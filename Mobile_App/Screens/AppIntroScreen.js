import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Ionicons';

const slides=[
    {
        key: 1,
        title: "Codereservoir",
        text: "Your global community of developers ",
        image: require('../Images/img1.jpg'),
        backgroundColor: '#59b2ab',
      },

      {
        key: 1,
        title: "Codereservoir",
        text:"Codereservoir is where it's easy to connect with developers and programmers" ,
        image: require('../Images/img1.jpg'),
        backgroundColor: '#59b2ab',
      },

      {
        key: 1,
        title: "Codereservoir",
        text: "Share your achievements to motivate other developers",
        image: require('../Images/img1.jpg'),
        backgroundColor: '#59b2ab',
      },
      {
        key: 1,
        title: "Codereservoir",
        text: "Read coding articles and learn from other developers",
        image: require('../Images/img1.jpg'),
        backgroundColor: '#59b2ab',
      },
]


class AppIntroScreen extends React.Component{

    _renderItem = ({ item }) => {
        return (
          <View style={styles.slide}>
            <Text style={styles.title}>{item.title}</Text>
            <Image source={item.image} />
            <Text style={styles.text}>{item.text}</Text>
          </View>
        );
      }
      _renderNextButton = () => {
        return (
          <View style={styles.buttonCircle}>
            <Icon
              name="md-arrow-round-forward"
              color="rgba(255, 255, 255, .9)"
              size={24}
            />
          </View>
        );
      };
      _renderDoneButton = () => {
        return (
          <View style={styles.buttonCircle}>
            <Icon
              name="md-checkmark"
              color="rgba(255, 255, 255, .9)"
              size={24}
            />
          </View>
        );
      };
      render() {
        return (
          <AppIntroSlider
            data={slides}
            renderDoneButton={this._renderDoneButton}
            renderNextButton={this._renderNextButton}
          />
        );
      }
    
}


const styles = StyleSheet.create({
    buttonCircle: {
      width: 40,
      height: 40,
      backgroundColor: 'rgba(0, 0, 0, .2)',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    
  });

export default AppIntroScreen;
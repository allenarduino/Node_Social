import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions
} from "react-native";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

class AppIntroThree extends React.Component {
  render() {
    return (
      <View style={styles.appContainer}>
        <Text style={styles.headerText}>Teklife</Text>
        <Image
          source={require("../Images/edu_svg2.jpg")}
          style={styles.introImage}
        />
        <Text style={styles.descriptionText}>
          Read articles and learn from other students
        </Text>
        <Text style={styles.descriptionText2}>Ask questions</Text>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => this.props.navigation.navigate("SignupScreen")}
        >
          <Text style={styles.buttonText}>NEXT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default AppIntroThree;

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    alignItems: "center"
  },

  headerText: {
    color: "rgb(95, 32, 155)",
    fontSize: 30,
    marginTop: HEIGHT / 10
  },
  introImage: {
    height: HEIGHT - 462,
    borderRadius: WIDTH - 110,
    width: WIDTH - 110,
    marginTop: HEIGHT / 20
  },
  descriptionText: {
    color: "rgb(95, 32, 155)",
    marginTop: HEIGHT / 30,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center"
  },

  descriptionText2: {
    color: "rgb(95, 32, 155)",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center"
  },
  nextButton: {
    marginTop: HEIGHT / 6,
    backgroundColor: "rgb(95, 32, 155)",
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    paddingTop: 10,
    paddingBottom: 10
  }
});

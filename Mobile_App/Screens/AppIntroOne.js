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
import { ThemeContext } from "../contexts/ThemeContextProvider";

const AppIntroOne = ({ navigation }) => {
  const { theme_state } = React.useContext(ThemeContext);
  return (
    <View style={styles.appContainer}>
      <Text style={styles.headerText}>Teklife</Text>
      <Image
        source={require("../Images/edu_svg1.jpg")}
        style={styles.introImage}
      />
      <Text style={styles.descriptionText}>Your community of students</Text>
      <Text style={styles.descriptionText2}>Connect students in KNUST</Text>

      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate("AppIntroTwo")}
      >
        <Text style={styles.buttonText}>NEXT</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AppIntroOne;

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

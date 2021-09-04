import * as React from "react";
import "react-native-gesture-handler";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  Image
} from "react-native";
import BottomTab from "./Navigation/BottomNav";
import { NavigationContainer } from "@react-navigation/native";
import MainStackNavigatorOne from "./Navigation/StackNavigationOne";
import AsyncStorage from "@react-native-community/async-storage";
import { AuthContext } from "./contexts/AuthContextProvider";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

//For disabling the warnings
console.disableYellowBox = true;

const Index = () => {
  const { auth_state, auth_dispatch } = React.useContext(AuthContext);
  const bootstrapAsync = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      auth_dispatch({
        type: "LOGIN",
        payload: token
      });
    } else {
      auth_dispatch({
        type: "LOGOUT"
      });
    }
  };

  React.useEffect(() => {
    bootstrapAsync();
  }, []);

  return (
    <>
      {auth_state.loading ? (
        <View style={{ alignItems: "center", marginTop: HEIGHT / 3 }}>
          <Image
            source={require("./Images/launcher.png")}
            style={{ height: 200, width: 200 }}
          />
        </View>
      ) : auth_state.isLoggedIn ? (
        <BottomTab />
      ) : (
        <MainStackNavigatorOne />
      )}
    </>
  );
};

export default Index;

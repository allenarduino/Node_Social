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
import SwitchNavOne from "./Navigation/SwitchNavOne";
import SwitchNavTwo from "./Navigation/SwitchNavTwo";
import { NavigationContainer } from "@react-navigation/native";
import MainStackNavigatorOne from "./Navigation/StackNavigationOne";
import AsyncStorage from "@react-native-community/async-storage";
import URL from "./Screens/url";
const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export const AuthContext = React.createContext();

//For disabling the warnings
console.disableYellowBox = true;

const App = () => {
  //User auth state stuff
  const initialState = {
    isAuthenticated: false,
    token: null,
    isLoading: true,
    messages: [],
    myprofile: [],
    myposts: [],
    singleprofile: [],
    userposts: [],
    url: URL()
  };

  const ReducerFunction = (prevState, action) => {
    switch (action.type) {
      case "LOGIN":
        AsyncStorage.setItem("token", action.payload);
        return {
          ...prevState,
          isAuthenticated: true,
          token: action.payload,
          isLoading: false
        };
      case "LOGOUT":
        AsyncStorage.removeItem("token");
        return {
          ...prevState,
          isAuthenticated: false,
          token: null,
          isLoading: false
        };
      case "FETCH_PROFILE":
        return {
          ...prevState,
          myprofile: action.payload
        };
      case "FETCH_POSTS":
        return {
          ...prevState,
          myposts: action.payload
        };
      case "FETCH_SINGLE_PROFILE":
        return {
          ...prevState,
          singleprofile: action.payload
        };
      case "FETCH_USER_POSTS":
        return {
          ...prevState,
          userposts: action.payload
        };
      default:
        return prevState;
    }
  };

  const bootstrapAsync = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      dispatch({
        type: "LOGIN",
        payload: token
      });
    } else {
      dispatch({
        type: "LOGOUT"
      });
    }
  };

  const [state, dispatch] = React.useReducer(ReducerFunction, initialState);

  React.useEffect(() => {
    bootstrapAsync();
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {state.isLoading ? (
        <View style={{ alignItems: "center", marginTop: HEIGHT / 3 }}>
          <Image
            source={require("./Images/launcher.png")}
            style={{ height: 200, width: 200 }}
          />
        </View>
      ) : state.isAuthenticated ? (
        <BottomTab />
      ) : (
        <MainStackNavigatorOne />
      )}
    </AuthContext.Provider>
  );
};

export default App;

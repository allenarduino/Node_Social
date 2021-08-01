import React from "react";
import { NavigationContainer } from "@react-navigation/native";

export const AuthContext = React.createContext();
const initialState = {
  isAuthenticated: false,
  token: null,
  isLoading: true
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

    default:
      return prevState;
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(ReducerFunction, initialState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

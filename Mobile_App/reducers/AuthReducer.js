import AsyncStorage from "@react-native-community/async-storage";
export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      AsyncStorage.setItem("token", action.payload);
      return {
        ...state,
        isLoggedIn: true,
        token: action.payload,
        loading: false
      };

    case "LOGOUT":
      AsyncStorage.removeItem("token");
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        loading: false
      };
    default:
      return state;
  }
};

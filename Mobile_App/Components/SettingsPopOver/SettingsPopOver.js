import React from "react";
import { AuthContext } from "../../contexts/AuthContextProvider";

import {
  SettingsMain,
  SettingsHeader,
  SettingsTitle,
  Choices,
  Img,
  LogoutButton,
  ThemeText,
  Spacer,
  LogoutButtonText
} from "./styles";

const SettingsPopOver = ({ navigation }) => {
  const { auth_dispatch } = React.useContext(AuthContext);
  const logout = () => {
    auth_dispatch({ type: "LOGOUT" });
    navigation.navigate("LoginScreen");
  };
  return (
    <SettingsMain>
      <LogoutButton onPress={() => auth_dispatch({ type: "LOGOUT" })}>
        <LogoutButtonText>LOGOUT</LogoutButtonText>
      </LogoutButton>
    </SettingsMain>
  );
};

export default SettingsPopOver;

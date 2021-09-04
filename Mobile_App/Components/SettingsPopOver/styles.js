import styled from "styled-components";

export const SettingsMain = styled.View`
  display: flex;

  z-index: 222;
  align-self: flex-end;
  margin-right: 50px;
  width: 100px;
  font-weight: bold;
  flex-direction: column;
  padding: 10px 0;
  background-color: #fff;
  top: 0;
  border-radius: 15px;
`;

export const SettingsHeader = styled.View`
  display: flex;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: #3333;
  width: 100%;
  height: 30px;
  padding-left: 15px;
`;

export const SettingsTitle = styled.Text`
  font-weight: bold;
`;

export const Choices = styled.View`
  display: flex;
  flex-direction: row;
  padding-left: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 100%;
  height: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #3333;
`;
export const ThemeText = styled.View`
  font-weight: bold;
`;

export const Spacer = styled.View`
  width: 100px;
  display: flex;
  flex-direction: row;
  margin-left: 20px;
`;

export const Img = styled.Image`
  width: 20px;
  height: 20px;
  max-width: 100%;
  max-height: 100%;
  border-radius: 20px;
  margin-left: 10px;
`;

export const LogoutButton = styled.TouchableOpacity`
  text-align: center;
  border-radius: 9999px;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 14px;
  padding-bottom: 10px;
  padding-top: 10px;
  background-color: #e3405f;
  width: 100px;
  align-self: center;
`;

export const LogoutButtonText = styled.Text`
  font-weight: bold;
  color: #fff;
`;

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
export const MessageContext = React.createContext();

const initialState = {
  messages: []
};

const ReducerFunction = (prevState, action) => {
  switch (action.type) {
    case "ADD_MESSAGE":
      return {
        ...prevState,
        messages: [...prevState.messages, action.payload]
      };
    case "FETCH_MESSAGES":
      return {
        ...prevState,
        messages: action.payload
      };
    default:
      return prevState;
  }
};
const MessageContextProvider = ({ children }) => {
  const [messagesState, setMessages] = React.useReducer(
    ReducerFunction,
    initialState
  );

  return (
    <MessageContext.Provider value={{ messagesState, setMessages }}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageContextProvider;

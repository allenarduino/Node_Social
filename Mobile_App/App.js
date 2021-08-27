import React from "react";
import Index from "./Index";
import AuthContext from "./contexts/AuthContextProvider";
import ThemeContext from "./contexts/ThemeContextProvider";
import PostContext from "./contexts/PostContextProvider";
import ProfileContext from "./contexts/ProfileContextProvider";

//For disabling the warnings
console.disableYellowBox = true;

const App = () => {
  return (
    <AuthContext>
      <ThemeContext>
        <PostContext>
          <ProfileContext>
            <Index />
          </ProfileContext>
        </PostContext>
      </ThemeContext>
    </AuthContext>
  );
};

export default App;

import React from "react";
import Linkify from "react-linkify";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { ProfileContext } from "../../contexts/ProfileContextProvider";
import { ThemeContext } from "../../contexts/ThemeContextProvider";
import { useHistory } from "react-router-dom";

import Loader from "../../components/Loader/Loader";
import PostCard from "../../components/PostCard/PostCard";
import SideNav from "../../components/SideNav/SideNav";
import { Fade } from "react-reveal";
import jwt_decode from "jwt-decode";
import {
  ContentContainer,
  ProfileContainer,
  CoverPhoto,
  UserImg,
  FullName,
  Bio,
  EditProfileButton,
  Middle
} from "./styles";
import { RightSide, LeftSide } from "../home/styles";

const Profile = () => {
  const history = useHistory();
  const { auth_state } = React.useContext(AuthContext);
  const { profile_state, profile_dispatch } = React.useContext(ProfileContext);
  const { theme_state } = React.useContext(ThemeContext);

  let url = auth_state.url;

  const user_id =
    localStorage.getItem("token") && jwt_decode(localStorage.getItem("token"));

  const fetch_user = () => {
    let myHeaders = new Headers();
    myHeaders.append("x-access-token", localStorage.getItem("token"));
    fetch(`${url}/user_profile/${user_id}`, {
      method: "GET",
      headers: myHeaders
    })
      .then(res => res.json())
      .then(data => {
        profile_dispatch({ type: "FETCH_PROFILE", payload: data.user_profile });
        profile_dispatch({
          type: "FETCH_USER_POSTS",
          payload: data.user_posts
        });
      })
      .catch(err => console.log(err));
  };
  React.useEffect(() => {
    fetch_user();
  }, []);

  return (
    <>
      <ContentContainer style={{ backgroundColor: theme_state.background }}>
        <LeftSide style={{ backgroundColor: theme_state.background }}>
          <SideNav />
        </LeftSide>
        <Middle style={{ backgroundColor: theme_state.background }}>
          {profile_state.profile.map(profile => (
            <Fade bottom duration={900} distance="40px">
              <ProfileContainer>
                <CoverPhoto
                  src={`${url}/${profile.coverphoto}`}
                  onClick={() =>
                    history.push("/view_image", { image: profile.coverphoto })
                  }
                />
                <UserImg
                  src={`${url}/${profile.user_img}`}
                  onClick={() =>
                    history.push("/view_image", { image: profile.user_img })
                  }
                />
                <FullName style={{ color: theme_state.color }}>
                  {profile.full_name}
                </FullName>
                <Bio style={{ color: theme_state.color }}>
                  <Linkify>{profile.bio}</Linkify>
                </Bio>
                <EditProfileButton onClick={() => history.push("/editprofile")}>
                  Edit Profile
                </EditProfileButton>
              </ProfileContainer>
            </Fade>
          ))}

          {profile_state.user_posts.length == 0 ? (
            <Loader />
          ) : (
            profile_state.user_posts.map(post => (
              <Fade bottom duration={900} distance="40px">
                <PostCard post={post} />
              </Fade>
            ))
          )}
        </Middle>

        <RightSide></RightSide>
      </ContentContainer>
    </>
  );
};
export default Profile;

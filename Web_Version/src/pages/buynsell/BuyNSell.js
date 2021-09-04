import React from "react";
import SideNav from "../../components/SideNav/SideNav";
import { AuthContext } from "../../contexts/AuthContextProvider";
import { ProfileContext } from "../../contexts/ProfileContextProvider";
import { PostContext } from "../../contexts/PostContextProvider";
import { ThemeContext } from "../../contexts/ThemeContextProvider";
import { useHistory, useLocation, Link } from "react-router-dom";
import { Fade } from "react-reveal";
import HomeHeader from "../../components/HomeHeader/HomeHeader";
import Loader from "../../components/Loader/Loader";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import {
  ContentContainer,
  RightSide,
  LeftSide,
  Avatar,
  UserCard,
  Middle
} from "./styles";

const BuyNSell = () => {
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary
    }
  }));
  const [products, setProducts] = React.useState([]);
  const { profile_state, profile_dispatch } = React.useContext(ProfileContext);
  const { post_state, post_dispatch } = React.useContext(PostContext);
  const { theme_state } = React.useContext(ThemeContext);
  const { auth_state } = React.useContext(AuthContext);
  let url = auth_state.url;

  const fetch_products = () => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch(`${url}/products`, {
      method: "GET",
      headers: myHeaders
    })
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
      })
      .catch(err => console.log(err));
    setTimeout(fetch_products, 50000);
  };

  React.useEffect(() => {
    fetch_products();
  }, []);

  return (
    <main>
      <HomeHeader />
      <ContentContainer style={{ backgroundColor: theme_state.background }}>
        <LeftSide style={{ backgroundColor: theme_state.background }}>
          <SideNav />
        </LeftSide>

        <Middle style={{ backgroundColor: theme_state.background }}>
          {products.length == 0 ? (
            <Loader />
          ) : (
            products.map(post => (
              <Fade bottom duration={900} distance="40px">
                <div>Products</div>
              </Fade>
            ))
          )}
        </Middle>

        <RightSide style={{ backgroundColor: theme_state.background }}>
          {post_state.user.map(user => (
            <UserCard style={{ backgroundColor: theme_state.background }}>
              <Link to="/profile">
                {" "}
                <Avatar src={`${url}/${user.user_img}`} />
              </Link>
              <b style={{ color: theme_state.color }}>{user.full_name}</b>
            </UserCard>
          ))}
        </RightSide>
      </ContentContainer>
    </main>
  );
};

export default BuyNSell;

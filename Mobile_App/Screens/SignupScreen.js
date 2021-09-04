import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  TextInput,
  Image
} from "react-native";
import BottomTab from "../Navigation/BottomNav";
import AsyncStorage from "@react-native-community/async-storage";
import { AppStyles } from "../AppStyles";
import URL from "./url";
//I'm using this for email validation
const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

let url = URL();

class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      name_is_valid: true,
      email_is_valid: true,
      password_is_valid: true,
      form_is_valid: true,
      error: false, //Error  from server is false
      message: "", //Success message from server
      loading: false
    };
  }

  nameInputChange = val => {
    if (val.trim().length >= 6) {
      this.setState({
        name_is_valid: true,
        form_is_valid: true
      });
    } else {
      this.setState({
        name_is_valid: false,
        form_is_valid: false
      });
    }
  };

  emailInputchange = val => {
    if (validEmailRegex.test(val)) {
      this.setState({
        email_is_valid: true
      });
    } else {
      this.setState({
        email_is_valid: false
      });
    }
  };

  passwordInputchange = val => {
    if (val.trim().length >= 6) {
      this.setState({
        password_is_valid: true
      });
    } else {
      this.setState({
        password_is_valid: false
      });
    }
  };

  signup = () => {
    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };

    if (
      this.state.name_is_valid == true &&
      this.state.email_is_valid == true &&
      this.state.password_is_valid == true &&
      !this.state.name.trim().length == 0 &&
      !this.state.email.trim().length == 0 &&
      !this.state.password.trim().length == 0
    ) {
      this.setState({
        loading: true
      });
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      fetch(`${url}/register`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: myHeaders
      })
        .then(res => res.json())
        .then(data => {
          this.setState({
            loading: false
          });

          if (data.error == null) {
            alert(data.message);
            this.props.navigation.navigate("LoginScreen");
          } else {
            this.setState({ error: !this.state.error, loading: false });
          }
        })
        .catch(err => {
          alert(err);
          this.setState({ loading: false });
        });
    } else {
      alert("Form is invalid");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, styles.leftTitle]}>Sign Up</Text>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="Full Name"
            onChangeText={name => {
              this.nameInputChange(name);
              this.setState({ name });
            }}
            value={this.state.name}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
        {this.state.name_is_valid == false ? (
          <Text style={{ color: "red", fontSize: 14 }}>
            Name must not be less than 6 characters
          </Text>
        ) : null}
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="Email "
            onChangeText={email => {
              this.emailInputchange(email);
              this.setState({ email });
            }}
            value={this.state.email}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
        {this.state.error == true ? (
          <Text style={{ color: "red", fontSize: 14 }}>
            User with email already exists
          </Text>
        ) : null}

        {this.state.email_is_valid == false ? (
          <Text style={{ color: "red", fontSize: 14 }}>
            Please your email is not valid
          </Text>
        ) : null}

        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={password => {
              this.passwordInputchange(password);
              this.setState({ password });
            }}
            value={this.state.password}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
        {this.state.password_is_valid == false ? (
          <Text style={{ color: "red", fontSize: 14 }}>
            Password must not be less than 6 characters
          </Text>
        ) : null}
        {this.state.loading == false ? (
          <TouchableOpacity style={styles.loginContainer} onPress={this.signup}>
            <Text style={styles.loginText}>Sign up</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.loginContainer}>
            <Text style={styles.loginText}>Loading...</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={{ marginTop: 20 }}
          onPress={() => this.props.navigation.navigate("LoginScreen")}
        >
          <Text style={{ color: "rgb(95, 32, 155)" }}>Already a member?</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  or: {
    fontFamily: AppStyles.fontName.main,
    color: "black",
    marginTop: 40,
    marginBottom: 10
  },
  title: {
    fontSize: AppStyles.fontSize.title,
    fontWeight: "bold",
    color: AppStyles.color.tint,
    marginTop: 50,
    marginBottom: 20
  },
  leftTitle: {
    alignSelf: "stretch",
    textAlign: "left",
    marginLeft: 20
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: "center",
    fontSize: AppStyles.fontSize.content,
    color: AppStyles.color.text
  },
  myButton: {
    backgroundColor: "red"
  },
  loginContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
    alignItems: "center"
  },
  loginText: {
    color: AppStyles.color.white,
    fontSize: 15,
    fontWeight: "bold"
  },

  loginLoader: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: "#fff",
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
    alignItems: "center"
  },

  placeholder: {
    fontFamily: AppStyles.fontName.text,
    color: "red"
  },
  InputContainer: {
    width: AppStyles.textInputWidth.main,
    marginTop: 30,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main
  },
  body: {
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    color: AppStyles.color.text
  }
});

/*
const mapStateToProps = (state) => {
    return { token: state.token,}
 };

  

const mapDispatchToProps = dispatch => ({
    login:dispatch(login)
});

 export default connect(mapStateToProps,mapDispatchToProps)(Login);
*/

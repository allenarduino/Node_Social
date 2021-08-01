import React from 'react';
import {
TouchableOpacity,
Text,
View,
StyleSheet,
TextInput,


} from 'react-native';
import BottomTab from '../Navigation/BottomNav';
import AsyncStorage from '@react-native-community/async-storage';
import SwitchNav from '../Navigation/SwitchNavOne';
import { AppStyles}  from "../AppStyles";


//I'm using this for email validation
const validEmailRegex= 
RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);




class SignupScreen extends React.Component{



  constructor(props){
    super(props);
    this.state={
        name:"",
        email:"",
        password:"",
        name_is_valid:true,
        email_is_valid:true,
        password_is_valid:true,
        form_is_valid:true,
        error:false,//Error  from server is false
        message:"",//Success message from server
        
      
    }
}

  


nameInputChange=(val)=>{
  if(val.trim().length>=6){
      this.setState({
          name_is_valid:true,
          form_is_valid:true

      })
    }
    else{
        this.setState({
            name_is_valid:false,
            form_is_valid:false,
        })
    }
}

emailInputchange=(val)=>{
  if(validEmailRegex.test(val)){
      this.setState({
          email_is_valid:true,
      });
      
  }
  else{
      this.setState({
          email_is_valid:false,
      })
  }

}

passwordInputchange=(val)=>{
  if(val.trim().length>=6){
      this.setState({
          password_is_valid:true,
      });
      
  }
  else{
      this.setState({
          password_is_valid:false,
      })
  }

}



signup=()=>{
  const data=new FormData();
  /*data.append("name",this.state.name)
  data.append("email",this.state.email)
  data.append("password",this.state.password)
*/
  if(
      this.state.name_is_valid==true&&this.state.email_is_valid==true&&this.state.password_is_valid==true&&
      !this.state.name.trim().length==0&&!this.state.email.trim().length==0&&!this.state.password.trim().length==0){

  
fetch("http://c3143c7e34ca.ngrok.io/Code_Reservoir/signup.php",
{
    method:"POST",
    body:JSON.stringify(this.state)
   

})
.then(res=>res.json())
.then(data=>{
    this.setState({
        loading:false
    })
    
    if (data.error==null){
        alert(data.message);
        this.props.navigation.navigate("Login")
      
    }
    else{
        this.setState({error:!this.state.error})
    }
}).catch((err)=>{console.log(err)});
}
else{
  alert("Form is invalid")
}

  
}

render(){
    return(
        <View style={styles.container}>
        <Text style={[styles.title, styles.leftTitle]}>Sign Up</Text>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="Name"
            onChangeText={(name)=>{this.nameInputChange(name);this.setState({name})}}
            value={this.state.name}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
        {this.state.name_is_valid==false? <Text style={{color:"red",fontSize:14}}>Name must not be less than 6 characters</Text>:null}
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="Email "
            onChangeText={(email)=>{this.emailInputchange(email);this.setState({email})}}
            value={this.state.email}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
        {this.state.error==true?<Text style={{color:"red",fontSize:14}}>User with email already exists</Text>:null}

        {this.state.email_is_valid==false? <Text style={{color:"red",fontSize:14}}>Please your email is not valid</Text>:null}
 
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(password)=>{this.passwordInputchange(password);this.setState({password})}}
            value={this.state.password}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          />
        </View>
        {this.state.password_is_valid==false?<Text style={{color:"red",fontSize:14}}>Password must not be less than 6 characters</Text>:null}
        <TouchableOpacity style={styles.loginContainer} onPress={this.signup}>
          <Text style={styles.loginText}>Sign up</Text>
        </TouchableOpacity>
     <TouchableOpacity style={{marginTop:20}} onPress={()=>this.props.navigation.navigate("LoginScreen")}>
         <Text style={{color:"rgb(95, 32, 155)"}}>Already a member?</Text>
     </TouchableOpacity>
      </View>
    )
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
    myButton:{
      backgroundColor:"red"
    },
    loginContainer: {
      width: AppStyles.buttonWidth.main,
      backgroundColor: AppStyles.color.tint,
      borderRadius: AppStyles.borderRadius.main,
      padding: 10,
      marginTop: 30,
      alignItems:"center",
    },
    loginText: {
      color: AppStyles.color.white,
      fontSize:15
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
    },
   
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
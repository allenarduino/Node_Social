import React from 'react'
import { View,Text, TextInput, Image, Button,StyleSheet,TouchableOpacity } from 'react-native'

//import firebase from 'firebase'
import { NavigationContainer } from '@react-navigation/native'
//require("firebase/firestore")
//require("firebase/firebase-storage")
import { AppStyles}  from "../AppStyles";



class Save extends React.Component{
    constructor(props){
        super(props);
        this.state={
            post_caption:""
        }

    }


    post=()=>{
        const data=new FormData();
        data.append("post_media",this.props.route.params.image);
        data.append("post_caption",this.state.post_caption);

        fetch("http://31f67e651a81.ngrok.io/code_reservoir/create_post.php",
        {
            method:"POST",
            'Content-Type' : 'application/json',
            body:data
        }
        )
        .then(res=>res.json())
        .then(data=>alert("Image Uploaded"))
        .catch(err=>alert(err))
       // alert(this.props.route.params.image)
    }
  
    
    render(){
        return(
        <View>
           
                <TextInput
                placeholder="Write a Caption . . ."
                style={styles.input}
                onChangeText={(post_caption)=>{this.setState({post_caption})}}
            />
            <Image source={{uri:`${this.props.route.params.image}`}} style={styles.myImage}/>
             <View style={styles.postContainer}>
            <TouchableOpacity style={styles.loginContainer} onPress={this.post}>
          <Text style={styles.postText}>Post</Text>
          </TouchableOpacity>
            </View>
        </View>
        )
    }
}

const styles=StyleSheet.create({
    myImage:{
       height:400,
       width:"100%",
       borderBottomLeftRadius:10,
       borderBottomRightRadius:10

    },
    input:{
        marginTop:100,
        paddingTop:20,
        fontSize:16,
        paddingLeft:10
    },

    myHeader:{
        width:"100%",
        paddingTop:40,
        paddingBottom:30,
        backgroundColor:"#fff"
    },
    loginContainer: {
        width: AppStyles.buttonWidth.main,
        backgroundColor: AppStyles.color.tint,
        borderRadius: AppStyles.borderRadius.main,
        padding: 10,
        marginTop: 30,
        alignItems:"center",
      },

      postText:{
        color: AppStyles.color.white,
        fontSize:15
      },
      postContainer:{
          display:"flex",
          alignItems:"center"
      }
})

export default Save;

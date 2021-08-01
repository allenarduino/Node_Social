import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image,
  TouchableOpacity,TouchableHighlight,Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;


export default function SelectImage({ navigation }) {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

      const galleryStatus = await ImagePicker.requestCameraRollPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');


    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
      if(image){
      navigation.navigate("Save",{image})
    }
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }

  
    

  
  };


  if (hasCameraPermission === null || hasGalleryPermission === false) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    
      <View style={styles.cameraContainer}> 
        <Camera
          ref={ref => setCamera(ref)}
          style={styles.fixedRatio}
          type={type} 

     ratio={'1:1'} />
      <View style={{flexDirection:"column",alignItems:"flex-end",marginRight:10}}>
    <Icon name='camera-reverse-outline'
    style={{marginTop:-600,fontSize:30}}
      onPress={() => {
     
        setType(
          type === Camera.Constants.Type.back
            ? Camera.Constants.Type.front
            : Camera.Constants.Type.back
        );}}
       color="white"/>
   <Icon name="image-outline" color="white"
    style={{fontSize:30,marginTop:30}}
   onPress={()=>pickImage()}
   />
    </View>
    <View style={{alignItems:"center"}}>
    <TouchableOpacity style={styles.takePicture} onPress={()=>{takePicture()}} >
      <Text></Text>
    </TouchableOpacity>
    </View>
    {/*
    <TouchableOpacity style={styles.next} onPress={() => navigation.navigate('Save', { image })}>
      <Text style={{fontSize:17,color:"black"}}>Next</Text>
    </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={{ flex:1 }} />}
    */}    
  </View>  
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
       
  },
  fixedRatio: {
    flex: 1,
    //aspectRatio: 1
  },
  takePicture:{
    width:50,
    marginTop:-90,
    width:80,
    height:80,
    borderRadius:80,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"white"

  },
  next:{
     alignItems:"flex-end",
     paddingTop:10,
     paddingBottom:10,
     paddingRight:10,
     color:"black"
  }

})

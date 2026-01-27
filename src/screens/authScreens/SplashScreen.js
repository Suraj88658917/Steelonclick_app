import { StyleSheet, Text, View  } from 'react-native'
import React , {useEffect} from 'react';
import Logo from '../../assets/images/logo.svg'
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({navigation}) => {

  
  const checkOnbording = async() => {
    try{
      const value = await AsyncStorage.getItem("OnbordingScreen");

      setTimeout( () => {
        if(value === 'true'){
          navigation.replace("LoginScreen");
        }
        else{
          navigation.replace("OnbordingScreen");
        }
      },2000);
    }
    catch(error){
      console.log("error Storage" , error)
    }
  }
 
  useEffect( () => {
    checkOnbording();
  },[])

  return (
    <LinearGradient 
     colors={['#E8F9FF' , '#FFFFFF']}
    style={styles.container}>
      <Logo style={styles.box} />
    </LinearGradient>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
  },
  box:{
     width: 266,
    height: 64,
  }
})
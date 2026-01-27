import { StyleSheet, Text, View  } from 'react-native'
import React , {useEffect} from 'react';
import Logo from '../../assets/images/logo.svg'
import LinearGradient from 'react-native-linear-gradient';

const SplashScreen = ({navigation}) => {
  
  useEffect( () => {
    const timer = setTimeout(() => {
      navigation.replace("OnbordingScreen")
    },2000);

    return () => clearTimeout(timer);
  },[]);


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
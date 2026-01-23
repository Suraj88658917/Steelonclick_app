import { StyleSheet, Text, View  } from 'react-native'
import React , {useEffect} from 'react';
import Logo from '../../assets/images/logo.svg'

const SplashScreen = ({navigation}) => {
  
  useEffect( () => {
    const timer = setTimeout(() => {
      navigation.replace("OnbordingScreen")
    },3000);

    return () => clearTimeout(timer);
  },[]);


  return (
    <View style={styles.container}>
      <Logo width={220} height={230} />
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#fff"
  }
})
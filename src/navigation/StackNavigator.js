import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/authScreens/LoginScreen'
import SplashScreen from '../screens/authScreens/SplashScreen'
import OnbordingScreen from '../screens/authScreens/OnbordingScreen'
import RegisterScreen from '../screens/authScreens/RegisterScreen';
import WelcomeScreen from '../screens/authScreens/WelcomeScreen'
import BottomTabNavigator from './BottomNavigator';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
       <Stack.Screen name="OnbordingScreen" component={OnbordingScreen} />
       <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="Main" component={BottomTabNavigator} />

    </Stack.Navigator>
  );
};

export default StackNavigator;

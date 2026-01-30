import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/authScreens/SplashScreen';
import OnbordingScreen from '../screens/authScreens/OnbordingScreen';
import WelcomeScreen from '../screens/authScreens/WelcomeScreen';
import AuthLoadingScreen from '../screens/authScreens/AuthLoadingScreen';
import LoginScreen from '../screens/authScreens/LoginScreen';
import OTPScreen from '../screens/authScreens/OTPScreen';
import RegisterScreen from '../screens/authScreens/RegisterScreen';

import BottomNavigator from '../navigation/BottomNavigator'

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="AuthLoading"
    >
      <Stack.Screen name="AuthLoading" component={AuthLoadingScreen} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="OnbordingScreen" component={OnbordingScreen} />
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="OTPScreen" component={OTPScreen} />

      <Stack.Screen name="Main" component={BottomNavigator} />
    </Stack.Navigator>
  );
};

export default StackNavigator;

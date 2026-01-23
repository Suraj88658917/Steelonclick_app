import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/authScreens/HomeScreen'
import ProfileScreen from '../screens/authScreens/ProfileScreen'
import SettingsScreen from '../screens/authScreens/SettingsScreen'

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>

      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />

    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

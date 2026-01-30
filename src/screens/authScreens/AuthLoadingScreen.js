import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthLoadingScreen = ({ navigation }) => {
  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const token = await AsyncStorage.getItem('token');

    if (token) {
      navigation.replace('Main'); // Home screen -- BottomNavigator
    } else {
      navigation.replace('LoginScreen');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default AuthLoadingScreen;

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const PLATFORM =
  Platform.OS === 'android' ? 'ANDROID' : 'IOS';

const api = axios.create({
  baseURL: 'https://api.easeinfra.com/',
  timeout: 10000,
});

//  REQUEST INTERCEPTOR (MOST IMPORTANT)
api.interceptors.request.use(
  
  async (config) => {
    config.headers['platform'] = 'app';
    const token = await AsyncStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log('API HEADER PLATFORM:', PLATFORM);

    return config;
  },
  error => Promise.reject(error)
);

// RESPONSE
api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default api;

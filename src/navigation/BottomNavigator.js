import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screens/authScreens/HomeScreen';
import BidsScreen from '../screens/authScreens/BidsScreen';
import PricesScreen from '../screens/authScreens/PricesScreen';
import PostScreen from '../screens/authScreens/PostScreen';
import BuyScreen from '../screens/authScreens/BuyScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: '#03A4E6',
        tabBarInactiveTintColor: '#999',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Prices':
              iconName = focused ? 'pricetag' : 'pricetag-outline';
              break;
            case 'Buy':
              iconName = focused ? 'cart' : 'cart-outline';
              break;
            case 'Post':
              iconName = focused ? 'add-circle' : 'add-circle-outline';
              break;
            case 'Bids':
              iconName = focused ? 'hammer' : 'hammer-outline';
              break;
          }

          return <Icon name={iconName} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Prices" component={PricesScreen} />
      <Tab.Screen name="Buy" component={BuyScreen} />
      <Tab.Screen name="Post" component={PostScreen} />
      <Tab.Screen name="Bids" component={BidsScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

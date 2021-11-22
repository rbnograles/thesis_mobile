import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// components
import HomeScreen from '../screens/main-pages/QRCode-screen';
import { tabNavigation } from '../styles/styles-screens';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../styles/styles-colors';
const Tab = createMaterialTopTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      style={tabNavigation.container}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }: any) => {
          let iconName: any;

          if (route.name === 'qrcode') {
            iconName = 'qrcode';
          } else if (route.name === 'visithistory') {
            iconName = 'location-arrow';
          } else if (route.name === 'profile') {
            iconName = 'user';
          } else {
            iconName = 'cogs';
          }

          // You can return any component that you like here!
          return <FontAwesome name={iconName} size={23} color={color} />;
        },
        tabBarActiveTintColor: Colors.accent,
        tabBarInactiveTintColor: Colors.darkLight,
      })}
    >
      <Tab.Screen name="qrcode" component={HomeScreen} options={{ tabBarLabel: 'QR Code' }} />
      <Tab.Screen name="visithistory" component={HomeScreen} options={{ tabBarLabel: 'History' }} />
      <Tab.Screen name="profile" component={HomeScreen} options={{ tabBarLabel: 'Profile' }} />
      <Tab.Screen name="others" component={HomeScreen} options={{ tabBarLabel: 'Settings' }} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

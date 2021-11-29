import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { tabNavigation } from '../styles/styles-screens';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../styles/styles-colors';

// components
import HomeScreen from '../screens/main-pages/QRCode-screen';
import SettingsScreen from '../screens/main-pages/Settings-screen';
import SuccessPromptScreen from '../screens/landing-pages/Success-Prompt';
import ProfileScreen from '../screens/main-pages/Profile-screen';

const Tab = createMaterialTopTabNavigator();

const TabNavigator = ({ navigation }: any) => {
  const [isSetUp, setIsSetUp] = useState(true);

  // this will fetch the default states from the screen interactions
  const getWelcomePageStatus = async () => {
    try {
      const data = await AsyncStorage.getItem('@successWelcomePage');
      data !== null && setIsSetUp(data === 'true' ? false : true);
    } catch (error) {
      console.log(error);
    }
  };

  // this function is a react native lifecycle method that will run when a component is mounted / loaded
  useEffect(() => {
    navigation.addListener('focus', () => {
      getWelcomePageStatus();
    });
  }, []);

  return (
    <Tab.Navigator
      style={tabNavigation.container}
      initialRouteName="profile"
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
          return <FontAwesome name={iconName} size={22} color={color} />;
        },
        tabBarActiveTintColor: Colors.accent,
        tabBarInactiveTintColor: Colors.darkLight,
      })}
    >
      <Tab.Screen name="qrcode" component={HomeScreen} options={{ tabBarLabel: 'QR Code' }} />
      <Tab.Screen name="visithistory" component={HomeScreen} options={{ tabBarLabel: 'History' }} />
      <Tab.Screen
        name="profile"
        component={isSetUp ? SuccessPromptScreen : ProfileScreen}
        options={{ tabBarLabel: 'Profile' }}
      />
      <Tab.Screen name="others" component={SettingsScreen} options={{ tabBarLabel: 'Settings' }} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

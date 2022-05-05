import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { tabNavigation } from '../styles/styles-screens';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../styles/styles-colors';
import { View } from 'react-native'
import { Badge } from 'react-native-elements';

// components
import QRScreen from '../screens/main-pages/QRCode-screen';
import LocationHistoryScreen from '../screens/main-pages/LocationHistory-screen';
import SettingsScreen from '../screens/main-pages/Settings-screen';
import Loader from '../_utils/Loader';
import SuccessPromptScreen from '../screens/landing-pages/Success-Prompt';
import ProfileScreen from '../screens/main-pages/Profile-screen';
import AlarmScreen from '../screens/main-pages/Alarm-screen';
import { getAllNotificationCount } from "../apis/notifications";

const Tab = createMaterialTopTabNavigator();

const TabNavigator = ({ navigation }) => {
  const [isSetUp, setIsSetUp] = useState(true);
  const [isRendering, setRendering] = useState(false);
  const [count, setCount] = useState(0);
  // this will fetch the default states from the screen interactions
  const getWelcomePageStatus = async () => {
    try {
      const data = await AsyncStorage.getItem('@successWelcomePage');
      data !== null && setIsSetUp(data === 'true' ? false : true);
    } catch (error) {
      console.log(error);
    }
    setRendering(true);
  };

  const getUsersVisitationLogsPersonal = async () => {
    const userId = await AsyncStorage.getItem('@userRandomeQRID');
    try {
        const data = await getAllNotificationCount(userId);
        setCount(data.data.data)
      } catch (error) {
        setCount(0);
      }
  }

  // this function is a react native lifecycle method that will run when a component is mounted / loaded
  useEffect(() => {
    // running this function on mount
    getWelcomePageStatus();
    getUsersVisitationLogsPersonal();
    // running this function once on setup
    navigation.addListener('focus', () => {
      getWelcomePageStatus();
    });
  }, []);

  return (
    <Tab.Navigator
      style={tabNavigation.container}
      initialRouteName="qrcode"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          let iconName;

          if (route.name === 'qrcode') {
            iconName = 'qrcode';
          } else if (route.name === 'visithistory') {
            iconName = 'location-arrow';
          } else if (route.name === 'profile') {
            iconName = 'user';
          } else if (route.name === 'notification') {
            iconName = 'bell';
          } else {
            iconName = 'cogs';
          }

          // You can return any component that you like here!
          return <FontAwesome name={iconName} size={21} color={color} />;
        },
        tabBarActiveTintColor: Colors.accent,
        tabBarInactiveTintColor: Colors.darkLight,
        tabBarIconStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen name="qrcode" component={QRScreen} options={{ tabBarLabel: 'QR Code' }} />
      <Tab.Screen name="visithistory" component={LocationHistoryScreen} options={{ tabBarLabel: 'History' }} />
      {isSetUp && (
        <Tab.Screen
          name="profile"
          component={!isRendering ? Loader : SuccessPromptScreen}
          options={{ tabBarLabel: 'Profile' }}
        />
      )}
      {!isSetUp && (
        <Tab.Screen
          name="profile"
          component={!isRendering ? Loader : ProfileScreen}
          options={{ tabBarLabel: 'Profile' }}
        />
      )}
      <Tab.Screen 
        name="notification" 
        children={() => { return <AlarmScreen setCount={setCount} />}} 
        options={{ 
          tabBarLabel: 'News', 
          tabBarBadge:()=> { return ( 
            <View style={{ marginTop: 7, marginRight: 20}}>
              { count > 0 ? <Badge value={count} status='error' /> : <></> }
            </View> 
            )} 
        }} 
      />
      <Tab.Screen name="others" component={SettingsScreen} options={{ tabBarLabel: 'Privacy' }} />
    </Tab.Navigator>
  );
};

export default TabNavigator;

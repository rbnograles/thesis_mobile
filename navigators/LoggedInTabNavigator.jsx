import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { tabNavigation } from '../styles/styles-screens';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
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


const Tab = createBottomTabNavigator();

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
        tabBarPressColor: Colors.primary,
        tabBarIcon: ({ color }) => {
          if (route.name === 'qrcode') {
            return <AntDesign name="qrcode" size={21} color={color} />;
          } else if (route.name === 'visithistory') {
            return <FontAwesome name="history" size={21} color={color} />;
          } else if (route.name === 'profile') {
            return <AntDesign name="user" size={21} color={color} />;
          } else if (route.name === 'notification') {
            return <AntDesign name="bells" size={21} color={color} />;
          } else {
            return <FontAwesome name="cogs" size={21} color={color} />;
          } 
        },
        headerShown: false,
        tabBarStyle: {
          paddingVertical: 5,
          height: 60
        },
        tabBarActiveTintColor: Colors.accent,
        tabBarInactiveTintColor: Colors.darkLight,
        tabBarIconStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "600",
          marginBottom: 5
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

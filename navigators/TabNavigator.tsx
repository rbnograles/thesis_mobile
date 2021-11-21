import React from 'react';
import 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// components
import HomeScreen from '../screens/main-pages/Home';
import { landingPagesOrientation } from '../styles/styles-screens';
const Tab = createMaterialTopTabNavigator();

const TabNavigator = () => {
  return (
    <SafeAreaView style={landingPagesOrientation.container}>
      <Tab.Navigator initialRouteName="Yes">
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
        <Tab.Screen name="Yes" component={HomeScreen} options={{ tabBarLabel: 'Yes' }} />
        <Tab.Screen name="No" component={HomeScreen} options={{ tabBarLabel: 'No' }} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default TabNavigator;

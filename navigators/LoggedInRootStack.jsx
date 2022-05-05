import React from 'react';

// react navigations
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// main pages
import TabNavigator from './LoggedInTabNavigator';
// set-ups pages
import ProfileInformationSetupScreen from '../screens/main-pages/profile-setup/_profile-setup-screen';
import AddressInformationSetupScreen from '../screens/main-pages/profile-setup/_address-setup-screen';
import UserTypeSetupScreen from '../screens/main-pages/profile-setup/_usertype-setup-screen';
import UserTypeRelatedInfoSetupScreen from '../screens/main-pages/profile-setup/_usertype-related-info-setup-screen';
// utilities
import { Colors } from '../styles/styles-colors';
// create navigations
const Stack = createNativeStackNavigator();

const LoggedInRootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'transparent',
          },
          headerTintColor: 'red',
          headerTransparent: true,
          headerTitle: '',
        }}
        initialRouteName="MainPages"
      >
        <Stack.Screen
          options={{ headerTintColor: Colors.primary, headerShadowVisible: false, headerTitle: () => null }}
          name="MainPages"
          component={TabNavigator}
        />
        {/* Profile set up screens */}
        <Stack.Screen
          options={{ headerTintColor: Colors.primary, headerShadowVisible: false, headerTitle: () => null }}
          name="ProfileSetUp"
          component={ProfileInformationSetupScreen}
        />
        <Stack.Screen
          options={{ headerTintColor: Colors.primary, headerShadowVisible: false, headerTitle: () => null }}
          name="AddressSetUp"
          component={AddressInformationSetupScreen}
        />
        <Stack.Screen
          options={{ headerTintColor: Colors.primary, headerShadowVisible: false, headerTitle: () => null }}
          name="UserTypeSetup"
          component={UserTypeSetupScreen}
        />
        <Stack.Screen
          options={{ headerTintColor: Colors.primary, headerShadowVisible: false, headerTitle: () => null }}
          name="userTypeRelatedInfoSetup"
          component={UserTypeRelatedInfoSetupScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LoggedInRootStack;

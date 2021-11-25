import React from 'react';

// react navigations
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens landing pages
import AggreementScreen from '../screens/landing-pages/Screen-Agreement';
import Onboarding from '../screens/landing-pages/Screen-Safety';
import ScanQRScreen from '../screens/landing-pages/Screen-QR-Code';
import LocationHistoryScreen from '../screens/landing-pages/Screen-Location-History';
// screens otp onboarding pages
import SignInWithMobileScreen from '../screens/otp/screen-sign-mobile';
import OTPConfirmationScreen from '../screens/otp/screen-otp-confirmation';
// main pages
import TabNavigator from './TabNavigator';
// set-ups pages
import ProfileInformationSetupScreen from '../screens/main-pages/profile-setup/_profile-setup-screen';
import AddressInformationSetupScreen from '../screens/main-pages/profile-setup/_address-setup-screen';
import UserTypeSetupScreen from '../screens/main-pages/profile-setup/_usertype-setup-screen';
// utilities
import { Colors } from '../styles/styles-colors';

// create navigations
const Stack = createNativeStackNavigator();

const RootStack = () => {
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
        initialRouteName="AggreementScreen"
      >
        {/* landing pages */}
        <Stack.Screen options={{ headerShadowVisible: false }} name="AggreementScreen" component={AggreementScreen} />
        <Stack.Screen
          options={{ headerTintColor: 'white', headerShadowVisible: false, headerTitle: () => null }}
          name="SafetyScreen"
          component={Onboarding}
        />
        <Stack.Screen
          options={{ headerTintColor: 'white', headerShadowVisible: false, headerTitle: () => null }}
          name="QRScreen"
          component={ScanQRScreen}
        />
        <Stack.Screen
          options={{ headerTintColor: 'white', headerShadowVisible: false, headerTitle: () => null }}
          name="LocationHistoryScreen"
          component={LocationHistoryScreen}
        />
        <Stack.Screen
          options={{ headerTintColor: Colors.primary, headerShadowVisible: false, headerTitle: () => null }}
          name="SignInWithMobileScreen"
          component={SignInWithMobileScreen}
        />
        <Stack.Screen
          options={{ headerTintColor: Colors.primary, headerShadowVisible: false, headerTitle: () => null }}
          name="OTPConfirmationScreen"
          component={OTPConfirmationScreen}
        />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;

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
        <Stack.Screen options={{ headerShadowVisible: false }} name="AggreementScreen" component={AggreementScreen} />
        <Stack.Screen
          options={{ headerTintColor: 'white', headerShadowVisible: false }}
          name="SafetyScreen"
          component={Onboarding}
        />
        <Stack.Screen
          options={{ headerTintColor: 'white', headerShadowVisible: false }}
          name="QRScreen"
          component={ScanQRScreen}
        />
        <Stack.Screen
          options={{ headerTintColor: 'white', headerShadowVisible: false }}
          name="LocationHistoryScreen"
          component={LocationHistoryScreen}
        />
        <Stack.Screen
          options={{ headerTintColor: Colors.primary, headerShadowVisible: false }}
          name="SignInWithMobileScreen"
          component={SignInWithMobileScreen}
        />
        <Stack.Screen
          options={{ headerTintColor: Colors.primary, headerShadowVisible: false }}
          name="OTPConfirmationScreen"
          component={OTPConfirmationScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;

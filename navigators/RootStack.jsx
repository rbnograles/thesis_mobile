import React from 'react';

// react navigations
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import AggreementScreen from '../screens/landing-pages/Screen-Agreement';
import Onboarding from '../screens/landing-pages/Screen-Safety';
import ScanQRScreen from '../screens/landing-pages/Screen-QR-Code';
import LocationHistoryScreen from '../screens/landing-pages/Screen-Location-History';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;

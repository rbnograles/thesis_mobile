import React from 'react';

// react navigations
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import AggreementScreen from '../screens/landing-pages/Screen-Agreement';
import SafetyScreen from '../screens/landing-pages/Screen-Safety';

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
          name="FeatureScreen"
          component={SafetyScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;

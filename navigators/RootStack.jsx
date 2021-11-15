import React from 'react';

// react navigations
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import AggreementScreen from '../screens/Screen-Agreement';

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
        initialRouteName="Login"
      >
        <Stack.Screen
          options={{ headerTintColor: 'red', headerShadowVisible: false }}
          name="Welcome"
          component={AggreementScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;

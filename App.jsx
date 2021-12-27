import React, { useEffect, useState } from 'react';
// screens
import RootStack from './navigators/RootStack';
import LoggedInRootStack from './navigators/LoggedInRootStack';

// utilities
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  [appOTPReday, setAppOTPRead] = useState(false);

  const _otpSetUpChecking = async () => {
    try {
      const value = await AsyncStorage.getItem('@otpPageSuccessful');
      if (value !== null) {
        // value previously stored
        console.log(value);
        setAppOTPRead(value === 'true' ? true : false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // read and get the local number stored in the async storage

    _otpSetUpChecking();
  }, []);

  if (!appOTPReday) {
    return <RootStack />;
  }

  return <LoggedInRootStack />;
}

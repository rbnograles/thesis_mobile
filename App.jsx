import React, { useEffect, useState } from 'react';
import { BackHandler } from 'react-native';
// screens
import RootStack from './navigators/RootStack';
import LoggedInRootStack from './navigators/LoggedInRootStack';

// utilities
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [appOTPReday, setAppOTPRead] = useState(false);

  // handles back button
  const disableBackButton = () => {
    BackHandler.exitApp();
    return true;
  };

  // this will check if the otp set up is completed or not
  const _otpSetUpChecking = async () => {
    try {
      const value = await AsyncStorage.getItem('@otpPageSuccessful');
      if (value !== null) {
        // value previously stored
        setAppOTPRead(value === 'true' ? true : false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // this will check if the app data are all loaded
  const checkIfAppReady = () => {
    AsyncStorage.getItem('@otpPageSuccessful')
      .then(res => {
        console.log(res);
      })
      .catch(error => console.warn(error));
  };

  // react life cycle the runs always when the page is mounted
  useEffect(() => {
    // read and get the local number stored in the async storage
    _otpSetUpChecking();

    // this will run uppon clicking the back button of the phone
    BackHandler.addEventListener('hardwareBackPress', disableBackButton);
  }, []);

  // this section will ensire that the page rendering wont overlap while waiting for the proper state to complete
  if (!appReady) {
    return <AppLoading startAsync={checkIfAppReady} onFinish={() => setAppReady(true)} onError={console.warn()} />;
  }
  // this section will be render of the user is new
  if (!appOTPReday) {
    return <RootStack />;
  }
  // this section will render if there is already data inside the app's local storage
  return <LoggedInRootStack />;
}

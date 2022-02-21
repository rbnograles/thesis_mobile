import React, { useState, useEffect } from 'react';
// native components
import { Text, SafeAreaView, View, TextInput } from 'react-native';
import { Colors } from '../../styles/styles-colors';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkInternetConnection } from '../../_utils/CheckIfConnectedToInternet';
// stylesheet
import { landingPagesOrientation, buttonOrientation } from '../../styles/styles-screens';
// components
import CustomButton from '../../_utils/CustomButton';
// apis
import { registerMobileNumber } from '../../apis/otp';

const SignInWithMobileScreen = ({ navigation }) => {
  // default state, this will hold the mobile number input
  const [connectedToNet, setConnectedToNet] = useState(false);
  const [number, onChangeNumber] = useState('');
  const [isValidNumber, setIsValidNumber] = useState(false);
  const [error, setError] = useState('');

  const mobileNumberValidation = value => {
    let test = /^[0-9]{0,11}$/;
    if (test.test(value)) {
      onChangeNumber(value);
      setError('');
      setIsValidNumber(true);
    }
  };

  const _temporaryStorageForMobileNum = async () => {
    const connectionStatus = await checkInternetConnection();
    if (connectionStatus) {
      // this will check if the number is empty or invalid
      if (number.length === 0) {
        setError('Please provide a phone number to proceed');
      } else if (number.length !== 11 || !isValidNumber) {
        setError('Invalid phone number format');
      }
      // if all condition is satisfied save the data localy and go to the next page
      if (number.length === 11 && isValidNumber) {
        try {
          await AsyncStorage.setItem('@mobile_num_key', number);
          const newNumber = number.split('');
          newNumber.shift();
          // NOTICE: Send data to backend for otp sending
          await registerMobileNumber({ mobileNumber: newNumber.join('') });
        } catch (error) {
          console.log(error);
        }
        // Add Backend api here
        navigation.navigate('OTPConfirmationScreen');
      }
    } else {
      setConnectedToNet(connectionStatus);
    }
  };

  useEffect(() => {
    checkInternetConnection().then(res => setConnectedToNet(res));
  }, []);

  return (
    <SafeAreaView style={[landingPagesOrientation.container]}>
      {connectedToNet && (
        <>
          <View
            style={[
              landingPagesOrientation.textContainer,
              landingPagesOrientation.textContaineredCenter,
              landingPagesOrientation.otpContianer,
            ]}
          >
            <Feather name="smartphone" size={90} color={Colors.primary} />
            <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 18 }}>
              Continue with your mobile number, you'll receive a 4 digit code to verify next.
            </Text>
          </View>
          <View style={landingPagesOrientation.inputContainer}>
            <TextInput
              style={landingPagesOrientation.input}
              onChangeText={e => mobileNumberValidation(e)}
              value={number}
              placeholder="09 *** *** ***"
              keyboardType="numeric"
              maxLength={11}
            />
            {error !== '' && <Text style={{ color: Colors.red, marginTop: 5, fontWeight: '700' }}>{error}</Text>}
          </View>
        </>
      )}
      {!connectedToNet && (
        <View
          style={[
            landingPagesOrientation.textContainer,
            landingPagesOrientation.textContaineredCenter,
            landingPagesOrientation.otpContianer,
            {
              marginTop: '60%',
            },
          ]}
        >
          <Feather name="wifi-off" size={90} color={Colors.primary} />
          <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 17, fontWeight: '700' }}>
            Please make sure that you are connected to a stable internet connection in order to continue.
          </Text>
        </View>
      )}
      <View style={buttonOrientation.landingButtonOrientation}>
        {connectedToNet && (
          <CustomButton
            title="Continue"
            color={Colors.primary}
            textColor="white"
            onPress={() => _temporaryStorageForMobileNum()}
          />
        )}
        {!connectedToNet && (
          <CustomButton
            title="Reload page"
            color={'grey'}
            textColor={Colors.lightGrey}
            onPress={() => checkInternetConnection().then(res => setConnectedToNet(res))}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default SignInWithMobileScreen;

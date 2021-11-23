import React, { useState } from 'react';
// native components
import { Text, SafeAreaView, View, TextInput } from 'react-native';
import { Colors } from '../../styles/styles-colors';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
// stylesheet
import { landingPagesOrientation, buttonOrientation } from '../../styles/styles-screens';
// components
import CustomButton from '../../_utils/CustomButton';

const SignInWithMobileScreen = ({ navigation }: any) => {
  // default state, this will hold the mobile number input
  const [number, onChangeNumber] = useState('');
  const [isValidNumber, setIsValidNumber] = useState(false);
  const [error, setError] = useState('');

  const mobileNumberValidation = (value: any) => {
    let test = /^[0-9]{0,11}$/;
    if (test.test(value)) {
      onChangeNumber(value);
      setError('');
      setIsValidNumber(true);
    }
  };

  const _temporaryStorageForMobileNum = async () => {
    // this will check if the number is empty or invalid
    if (number.length < 0) {
      setError('Please provide phone number to proceed');
    } else if (number.length !== 11 || !isValidNumber) {
      setError('Invalid phone number format');
    }
    // if all condition is satisfied save the data localy and go to the next page
    if (number.length === 11 && isValidNumber) {
      try {
        await AsyncStorage.setItem('@mobile_num_key', number);
      } catch (error) {
        console.log(error);
      }
      navigation.navigate('OTPConfirmationScreen');
    }
  };

  return (
    <SafeAreaView style={[landingPagesOrientation.container]}>
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
        />
        {error !== '' && <Text style={{ color: Colors.red, marginTop: 5, fontWeight: '700' }}>{error}</Text>}
      </View>
      <View style={buttonOrientation.landingButtonOrientation}>
        <CustomButton
          title="Continue"
          color={Colors.primary}
          textColor="white"
          onPress={() => _temporaryStorageForMobileNum()}
        />
      </View>
    </SafeAreaView>
  );
};

export default SignInWithMobileScreen;

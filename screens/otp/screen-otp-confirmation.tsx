import React, { useEffect, useState } from 'react';
// native components
import { Text, SafeAreaView, View, TextInput } from 'react-native';
import { Colors } from '../../styles/styles-colors';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
// stylesheet
import { landingPagesOrientation, buttonOrientation } from '../../styles/styles-screens';
// components
import CustomButton from '../../_utils/CustomButton';

const OTPConfirmationScreen = ({ navigation }: any) => {
  // default values
  const [number, onChangeNumber] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const _readStoredNumber = async () => {
    try {
      const value = await AsyncStorage.getItem('@mobile_num_key');
      if (value !== null) {
        // value previously stored
        setMobileNumber(value);
      }
    } catch (error) {
      // error reading value
      setMobileNumber('');
      console.log(error);
    }
  };

  useEffect(() => {
    // read and get the local number stored in the async storage
    _readStoredNumber();
  }, []);

  /**
   * This will re send the otp function by recalling it
   */
  const sendOTP = () => {
    console.log('Sending OTP');
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
          Code is sent to <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>{mobileNumber}</Text>
        </Text>
      </View>
      <View style={[landingPagesOrientation.inputContainer, { justifyContent: 'space-around', flexDirection: 'row' }]}>
        <TextInput
          style={landingPagesOrientation.otpInput}
          onChangeText={onChangeNumber}
          value={number}
          keyboardType="numeric"
        />
        <TextInput
          style={landingPagesOrientation.otpInput}
          onChangeText={onChangeNumber}
          value={number}
          keyboardType="numeric"
        />
        <TextInput
          style={landingPagesOrientation.otpInput}
          onChangeText={onChangeNumber}
          value={number}
          keyboardType="numeric"
        />
        <TextInput
          style={landingPagesOrientation.otpInput}
          onChangeText={onChangeNumber}
          value={number}
          keyboardType="numeric"
        />
      </View>
      <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 18 }}>
        Didn't receive the code?{' '}
        <Text style={landingPagesOrientation.resendLink} onPress={() => sendOTP()}>
          Request again.
        </Text>
      </Text>
      <View style={buttonOrientation.landingButtonOrientation}>
        <CustomButton
          title="Verify and Continue"
          color={Colors.primary}
          textColor="white"
          onPress={() => navigation.navigate('MainPages')}
        />
      </View>
    </SafeAreaView>
  );
};

export default OTPConfirmationScreen;

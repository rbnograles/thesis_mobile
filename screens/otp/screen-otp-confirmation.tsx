import React from 'react';
// native components
import { Text, SafeAreaView, View, TextInput } from 'react-native';
import { Colors } from '../../styles/styles-colors';
import { Feather } from '@expo/vector-icons';
// stylesheet
import { landingPagesOrientation, buttonOrientation } from '../../styles/styles-screens';
// components
import CustomButton from '../../_utils/CustomButton';

const OTPConfirmationScreen = ({ navigation }: any) => {
  const [number, onChangeNumber] = React.useState('');

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
          Code is sent to <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>09516186637</Text>
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
          onPress={() => navigation.navigate('Next Page')}
        />
      </View>
    </SafeAreaView>
  );
};

export default OTPConfirmationScreen;

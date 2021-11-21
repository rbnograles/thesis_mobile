import React from 'react';
// native components
import { Text, SafeAreaView, View, TextInput } from 'react-native';
import { Colors } from '../../styles/styles-colors';
import { Feather } from '@expo/vector-icons';
// stylesheet
import { landingPagesOrientation, buttonOrientation } from '../../styles/styles-screens';
// components
import CustomButton from '../../_utils/CustomButton';

const SignInWithMobileScreen = ({ navigation }: any) => {
  const [number, onChangeNumber] = React.useState('');

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
          onChangeText={onChangeNumber}
          value={number}
          placeholder="09 *** *** ***"
          keyboardType="numeric"
        />
      </View>
      <View style={buttonOrientation.landingButtonOrientation}>
        <CustomButton
          title="Continue"
          color={Colors.primary}
          textColor="white"
          onPress={() => navigation.navigate('OTPConfirmationScreen')}
        />
      </View>
    </SafeAreaView>
  );
};

export default SignInWithMobileScreen;

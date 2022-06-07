import React, { useState, useEffect } from 'react';
// native components
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';
import { Text, SafeAreaView, View, TextInput, Image } from 'react-native';
import { Colors } from '../../styles/styles-colors';
import { Feather } from '@expo/vector-icons';
import { checkInternetConnection } from '../../_utils/CheckIfConnectedToInternet';
// stylesheet
import { landingPagesOrientation, buttonOrientation, pageSpecialCenteredImage } from '../../styles/styles-screens';
// components
import CustomButton from '../../_utils/CustomButton';
// apis
import LoaderCustom from '../../_utils/LoaderCustom';
import { registerMobileNumber } from '../../apis/otp';

const SignInWithMobileScreen = ({ navigation }) => {
  // default state, this will hold the mobile number input
  const [connectedToNet, setConnectedToNet] = useState(false);
  const [number, onChangeNumber] = useState('');
  const [isValidNumber, setIsValidNumber] = useState(false);
  const [error, setError] = useState('');
  const [isEditable, setEditable] = useState(true);

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
    let result = {};
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
          setEditable(!isEditable);
          // NOTICE: Send data to backend for otp sending
          result = await registerMobileNumber({ mobileNumber: newNumber.join('') });

        } catch (error) {
          setEditable(isEditable);
        }
        // Add Backend api here
        setEditable(isEditable);
        navigation.dispatch(StackActions.replace('OTPConfirmationScreen', { result: result}));
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
            <View style={pageSpecialCenteredImage.container}>
              <Image source={require('../../assets/VerifyNumber.png')} style={pageSpecialCenteredImage.image} />
            </View>
            <Text style={[landingPagesOrientation.header]}>Verify your number</Text>
            <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 16 }}>
              Continue with your mobile number, you'll receive a 4 digit code to verify next.
            </Text>
          </View>
          <View style={landingPagesOrientation.inputContainer}>
            <TextInput
              style={landingPagesOrientation.input}
              onChangeText={e => mobileNumberValidation(e)}
              editable={isEditable}
              value={number}
              placeholder="Enter your mobile number"
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
        {connectedToNet &&
          (!isEditable ? (
            <View style={{ display: "flex", flexDirection: "row", justifyContent: "center", textAlign: "center"}}>
              <Text style={{ width: "15%"}}>
                <LoaderCustom /> 
              </Text>
              <Text style={{ width:"50%", textAlign: "center", textAlignVertical: "center" }}>Please wait for a moment . . .</Text>
            </View>
          ) : (
            <CustomButton
              title="Continue"
              color={Colors.primary}
              textColor="white"
              onPress={() => _temporaryStorageForMobileNum()}
            />
          ))}
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

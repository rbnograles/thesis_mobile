import React, { useState, useEffect } from 'react';
// native components
import { Text, View, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CheckBox } from 'react-native-elements';
// stylesheet
import { formsContainer, landingPagesOrientation } from '../../../styles/styles-screens';
// custom components
import CustomButton from '../../../_utils/CustomButton';
import { checkBox } from '../../../styles/styles-screens';
import { Colors } from '../../../styles/styles-colors';
import { _setThisPageToCompleted } from '../../../_storages/_state_process';

const UserTypeSetupScreen = ({ navigation }) => {
  // default states
  const [userType, setUserType] = useState('');
  const [prevInfo, setPrevInfo] = useState(null);
  // this will fetch the default states from the screen interactions
  const getWelcomePageStatus = async () => {
    try {
      const data = await AsyncStorage.getItem('@profileInfo');
      setPrevInfo(JSON.parse(data));
    } catch (error) {
      console.log(error);
    }
  };

  const setUserTypeChoice = type => {
    setUserType(type);
  };

  const saveUserTypeChoice = () => {
    // store the data temporarily and remeber that this page is done
    _setThisPageToCompleted('@profileInfo', JSON.stringify({ userType, ...prevInfo }));
    _setThisPageToCompleted('@successProfileInfo', 'true');
    navigation.navigate('userTypeRelatedInfoSetup', { userType: userType });
  };

  // this function is a react native lifecycle method that will run when a component is mounted / loaded
  useEffect(() => {
    // running this function on mount
    getWelcomePageStatus();
  }, []);

  return (
    <SafeAreaView style={landingPagesOrientation.container}>
      <Text style={formsContainer.formsHeader}>Profile Information</Text>
      <Text style={formsContainer.formsSubHeader}>
        This information will be saved only on your device and not on the application's database.
      </Text>
      <View style={{ marginTop: 20 }}>
        <CheckBox
          checked={userType === 'Member'}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checkedColor={Colors.primary}
          onPress={() => setUserTypeChoice('Member')}
          containerStyle={[checkBox.radioOptions, { marginVertical: 7, marginLeft: -2 }]}
          title="Member"
        />
        <CheckBox
          checked={userType === 'Visitor / Guest'}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checkedColor={Colors.primary}
          onPress={() => setUserTypeChoice('Visitor / Guest')}
          containerStyle={[checkBox.radioOptions, { marginVertical: 7, marginLeft: -2 }]}
          title="Visitor / Guest"
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <CustomButton
          color={Colors.primary}
          textColor="white"
          onPress={() => {
            saveUserTypeChoice();
          }}
          title="Next"
        />
      </View>
    </SafeAreaView>
  );
};

export default UserTypeSetupScreen;

import React, { useState, useEffect } from 'react';
// native components
import { Text, View, SafeAreaView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// stylesheet
import { formsContainer, landingPagesOrientation, displayFormContainer } from '../../../styles/styles-screens';
// custom components
import CustomInputs from '../../../_utils/DisplayInput';
import { _setThisPageToCompleted } from '../../../_storages/_state_process';
import CustomButton from '../../../_utils/CustomButton';
import { Colors } from '../../../styles/styles-colors';

const UserTypeRelatedInfoSetupScreen = ({ route, navigation }) => {
  const { userType } = route.params;
  const [prevInfo, setPrevInfo] = useState({});
  // this will fetch the default states from the screen interactions
  const getWelcomePageStatus = async () => {
    try {
      const data = await AsyncStorage.getItem('@profileInfo');
      setPrevInfo(JSON.parse(data));
    } catch (error) {
      console.log(error);
    }
  };

  const process = () => {
    // store the data temporarily and remeber that this page is done
    _setThisPageToCompleted('@profileInfo', JSON.stringify({ ...prevInfo }));
    _setThisPageToCompleted('@successWelcomePage', 'true');
    navigation.navigate('MainPages', { isSetupComplete: true });
  }

  // this function is a react native lifecycle method that will run when a component is mounted / loaded
  useEffect(() => {
    // running this function on mount
    getWelcomePageStatus();
  }, []);

  return (
    <SafeAreaView style={landingPagesOrientation.container}>
      <Text style={formsContainer.formsHeader}>Profile Information Summary</Text>
      <Text style={formsContainer.formsSubHeader}>
        This information will be keep private and will not be shared to any third parties or individiual.
      </Text>
      <ScrollView>
        <View style={{ marginTop: 10, marginBottom: 20 }}>
          <View style={{ marginBottom: 15 }}>
            <Text style={displayFormContainer.formCaptions}>User Affiliation</Text>
            <CustomInputs
              labelTitle="User Type"
              required={true}
              placeHolder=""
              value={userType}
            />
          </View>
          <View style={{ marginBottom: 15 }}>
            <Text style={displayFormContainer.formCaptions}>Personal Name</Text>
            <CustomInputs
              labelTitle="First name"
              required={true}
              placeHolder=""
              value={prevInfo.firstName}
            />
            <CustomInputs
              labelTitle="Middle name"
              required={false}
              value={prevInfo.middleName}
            />
            <CustomInputs
              labelTitle="Last name"
              required={true}
              value={prevInfo.lastName}
            />
            <CustomInputs
              labelTitle="Suffix"
              required={false}
              value={prevInfo.nameExtension}
            />
          </View>
          <View style={{ marginBottom: 15 }}>
            <Text style={displayFormContainer.formCaptions}>Current Address</Text>
            <CustomInputs
              labelTitle="Lot Number"
              required={false}
              value={prevInfo.lotNumber}
            />
            <CustomInputs
              labelTitle="Street Name"
              required={true}
              value={prevInfo.streetName}
            />
            <CustomInputs
              labelTitle="District / Subdivision"
              required={false}
              value={prevInfo.district}
            />
            <CustomInputs
              labelTitle="Barangay"
              required={true}
              value={prevInfo.barangay}
            />
            <CustomInputs
              labelTitle="City"
              required={true}
              value={prevInfo.city}
            />
            <CustomInputs
              labelTitle="Province"
              required={true}
              value={prevInfo.province}
            />
          </View>
          <CustomButton color={Colors.primary} textColor="white" onPress={process} title="Finish Setup" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserTypeRelatedInfoSetupScreen;

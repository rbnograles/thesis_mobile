import React, { useState } from 'react';
// native components
import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// stylesheet
import { displayFormContainer, landingPagesOrientation, sectionContiner } from '../../styles/styles-screens';
import { Colors } from '../../styles/styles-colors';
import CustomButton from '../../_utils/CustomButton';

const SettingsScreen = () => {
  const [message, setMessage] = useState('');

  // reset everything
  const clearAsyncStorageData = async () => {
    try {
      await AsyncStorage.clear();
      setMessage('Data cleared successfully');
    } catch (error) {
      setMessage('Failed to clear data');
      console.log(error);
    }
  };

  return (
    <View style={landingPagesOrientation.container}>
      <Text style={displayFormContainer.formsHeader}>Settings</Text>
      <View style={sectionContiner.section}>
        <Text style={sectionContiner.sectionHeader}>Upload your Location History</Text>
        <Text style={sectionContiner.sectionDescription}>
          If you are diagnosed with COVID-19, please upload your location history to alert the community of a possible
          contact. If not done immediately, an authorized person from the university will obligate you to upload your
          location history.
        </Text>
        <CustomButton title="Upload" color={Colors.primary} textColor="white" onPress={() => clearAsyncStorageData()} />
      </View>
      <View style={sectionContiner.section}>
        <Text style={sectionContiner.sectionHeader}>Delete your account</Text>
        <Text style={sectionContiner.sectionDescription}>
          If you chose to delete your account, all data from this account will be deleted from the database and your
          mobile device.
        </Text>
        <CustomButton
          title="Delete Account"
          color={Colors.red}
          textColor="white"
          onPress={() => clearAsyncStorageData()}
        />
      </View>
    </View>
  );
};

export default SettingsScreen;

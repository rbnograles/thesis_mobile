import React, { useState } from 'react';
// native components
import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// stylesheet
import { landingPagesOrientation } from '../../styles/styles-screens';
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
      <Text>{message}</Text>
      <CustomButton
        title="Reset Saved Data"
        color={Colors.primary}
        textColor="white"
        onPress={() => clearAsyncStorageData()}
      />
    </View>
  );
};

export default SettingsScreen;

import React, { useState } from 'react';
// native components
import { Text, View } from 'react-native';
// stylesheet
import { landingPagesOrientation } from '../../styles/styles-screens';

const ProfileScreen = ({ navigation }: any) => {
  return (
    <View style={landingPagesOrientation.container}>
      <Text>Hi</Text>
    </View>
  );
};

export default ProfileScreen;
import React, { useState } from 'react';
// native components
import { Text, View, TextInput } from 'react-native';
// stylesheet
import { landingPagesOrientation } from '../../../styles/styles-screens';

const ProfileInformationSetupScreen = ({ navigation }: any) => {
  return (
    <View style={landingPagesOrientation.container}>
      <Text>Profile Information</Text>
      <Text>Please tell us some information related to you.</Text>
      <View style={landingPagesOrientation.inputContainer}>
        <TextInput style={landingPagesOrientation.input} placeholder="Juan" keyboardType="numeric" />
        <TextInput style={landingPagesOrientation.input} placeholder="D" keyboardType="numeric" />
        <TextInput style={landingPagesOrientation.input} placeholder="Dela Cruz" keyboardType="numeric" />
        <TextInput style={landingPagesOrientation.input} placeholder="Jr" keyboardType="numeric" />
      </View>
    </View>
  );
};

export default ProfileInformationSetupScreen;

import { Colors } from '../../styles/styles-colors';
import React, { useState } from 'react';
// native components
import { Text, SafeAreaView, View, Image } from 'react-native';
import { CheckBox, Button } from 'react-native-elements';
// stylesheet
import {
  landingPagesOrientation,
  agreementCheckBoxContainer,
  buttonOrientation,
  pageCenteredImage,
} from '../../styles/styles-screens';

const OnboardingScreen = ({ navigation }: any) => {
  const [isChecked, setChecked] = useState(false);

  return (
    <SafeAreaView style={landingPagesOrientation.container}>
      <View style={pageCenteredImage.container}>
        <Image source={require('../../assets/landing-page-1.png')} style={pageCenteredImage.image} />
      </View>
      <View style={landingPagesOrientation.textContainer}>
        <Text style={landingPagesOrientation.header}>Welcome to JuanBreath contact tracing mobile application</Text>
        <Text style={landingPagesOrientation.subHeader}>
          This application aims to help reduce the number of cases of COVID-19 in the community / campus.
        </Text>
      </View>
      <View style={agreementCheckBoxContainer.checkboxContainer}>
        <CheckBox
          checked={isChecked}
          checkedColor={Colors.primary}
          onPress={() => setChecked(!isChecked)}
          containerStyle={agreementCheckBoxContainer.containerStyle}
        />
        <Text style={agreementCheckBoxContainer.label}>I have read and agreed to the Terms and Conditions</Text>
      </View>
      <View style={buttonOrientation.landingButtonOrientation}>
        <Button
          title="Continue"
          buttonStyle={buttonOrientation.landingButtons}
          disabled={!isChecked}
          onPress={() => navigation.navigate('OnboardingScreen')}
        />
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

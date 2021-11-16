import { Colors } from '../../styles/styles-colors';
import React, { useState } from 'react';
// native components
import { Text, SafeAreaView, View } from 'react-native';
import { CheckBox, Button } from 'react-native-elements';
// stylesheet
import { landingPagesOrientation, agreementCheckBoxContainer, buttonOrientation } from '../../styles/styles-screens';

const AggreementScreen = ({ navigation }: any) => {
  const [isChecked, setChecked] = useState(false);

  return (
    <SafeAreaView style={landingPagesOrientation.container}>
      <Text style={landingPagesOrientation.header}>Welcome to JuanBreath contact tracing mobile application</Text>
      <Text style={landingPagesOrientation.subHeader}>
        This application aims to help reduce the number of cases of COVID-19 in the community / campus.
      </Text>
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
          onPress={() => navigation.navigate('FeatureScreen')}
        />
      </View>
    </SafeAreaView>
  );
};

export default AggreementScreen;

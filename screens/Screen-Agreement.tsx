import { Colors } from '../modules/styles/Colors';
import React, { useState } from 'react';
// native components
import { Text, SafeAreaView, View } from 'react-native';
import { CheckBox, Button } from 'react-native-elements';
// stylesheet
import { landingPagesOrientation, agreementCheckBoxContainer, buttonOrientation } from '../modules/styles/Screens';

const App = () => {
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
      <Button title="Continue" buttonStyle={buttonOrientation.landingButtons} disabled={!isChecked} />
    </SafeAreaView>
  );
};

export default App;

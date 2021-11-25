import React, { useState } from 'react';
// native components
import { Text, View, SafeAreaView } from 'react-native';
import { CheckBox } from 'react-native-elements';
// stylesheet
import { formsContainer, landingPagesOrientation } from '../../../styles/styles-screens';
// custom components
import CustomButton from '../../../_utils/CustomButton';
import { checkBox } from '../../../styles/styles-screens';
import { Colors } from '../../../styles/styles-colors';

const UserTypeSetupScreen = ({ navigation }: any) => {
  // default states
  const [userType, setUserType] = useState('');

  const setUserTypeChoice = (type: string) => {
    setUserType(type);
  };

  const saveUserTypeChoice = () => {
    console.log(userType);
  };

  return (
    <SafeAreaView style={landingPagesOrientation.container}>
      <Text style={formsContainer.formsHeader}>Profile Information</Text>
      <Text style={formsContainer.formsSubHeader}>Please tell us some information related to you.</Text>
      <View style={{ marginTop: 20 }}>
        <CheckBox
          checked={userType === 'Student'}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checkedColor={Colors.primary}
          onPress={() => setUserTypeChoice('Student')}
          containerStyle={checkBox.radioOptions}
          title="Student"
        />
        <CheckBox
          checked={userType === 'Faculty'}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checkedColor={Colors.primary}
          onPress={() => setUserTypeChoice('Faculty')}
          containerStyle={checkBox.radioOptions}
          title="Faculty"
        />
        <CheckBox
          checked={userType === 'Worker'}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checkedColor={Colors.primary}
          onPress={() => setUserTypeChoice('Worker')}
          containerStyle={checkBox.radioOptions}
          title="Worker"
        />
        <CheckBox
          checked={userType === 'Visitor / Guest'}
          checkedIcon="dot-circle-o"
          uncheckedIcon="circle-o"
          checkedColor={Colors.primary}
          onPress={() => setUserTypeChoice('Visitor / Guest')}
          containerStyle={checkBox.radioOptions}
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

import React, { useState } from 'react';
// native components
import { Text, View, SafeAreaView, ScrollView } from 'react-native';
import { checkBox } from '../../../styles/styles-screens';
import { CheckBox } from 'react-native-elements';
import * as yup from 'yup';
import { Formik } from 'formik';
// stylesheet
import { formsContainer, landingPagesOrientation } from '../../../styles/styles-screens';
// custom components
import KeyboardAvoidingWrapper from '../../../_utils/KeyboardAvoidingWrapper';
import CustomInputs from '../../../_utils/CustomInputs';
import CustomButton from '../../../_utils/CustomButton';
import { Colors } from '../../../styles/styles-colors';
import { _setThisPageToCompleted } from '../../../_storages/_state_process';
import { TextInput } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';

let personalInfoSchema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/[A-Za-z]/, 'First name must contain only letters')
    .required('First name is required'),
  middleName: yup
    .string()
    .matches(/[A-Za-z]/, 'Middle name must contain only letters')
    .nullable(),
  lastName: yup
    .string()
    .matches(/[A-Za-z]/, 'Last name must contain only letters')
    .required('Last name is required'),
  nameExtension: yup
    .string()
    .matches(/[A-Za-z.]/, 'Name extension name must contain only letters')
    .nullable(),
  age: yup
    .string()
    .required('Age is required')
});

const ProfileInformationSetupScreen = ({ navigation }) => {
  
  const [gender, setGender] = useState('');
  
  return (
    <KeyboardAvoidingWrapper>
      <SafeAreaView style={landingPagesOrientation.container}>
        <Text style={formsContainer.formsHeader}>Profile Information</Text>
        <Text style={formsContainer.formsSubHeader}>
          This information will be saved only on your device and not on the application's database.
        </Text>
        <ScrollView>
          <Formik
            initialValues={{
              firstName: '',
              middleName: '',
              lastName: '',
              nameExtension: '',
              age: ''
            }}
            validateOnMount={true}
            validationSchema={personalInfoSchema}
            onSubmit={values => {
              // store the data temporarily and remeber that this page is done
              _setThisPageToCompleted('@profileInfo', JSON.stringify({...values, gender: gender }));
              _setThisPageToCompleted('@successProfileInfo', 'true');
              navigation.navigate('AddressSetUp');
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View style={{ marginTop: 10 }}>
                <CustomInputs
                  labelTitle="First name"
                  required={true}
                  onChangeText={handleChange('firstName')}
                  placeHolder="Juan"
                  onBlur={handleBlur('firstName')}
                  value={values.firstName}
                />
                {errors.firstName && touched.firstName && (
                  <Text style={formsContainer.errorMessage}>{errors.firstName}</Text>
                )}
                <CustomInputs
                  labelTitle="Middle name"
                  required={false}
                  onChangeText={handleChange('middleName')}
                  placeHolder="Ramos"
                  onBlur={handleBlur('middleName')}
                  value={values.middleName}
                />
                {errors.middleName && touched.middleName && (
                  <Text style={formsContainer.errorMessage}>{errors.middleName}</Text>
                )}
                <CustomInputs
                  labelTitle="Last name"
                  required={true}
                  onChangeText={handleChange('lastName')}
                  placeHolder="Dela Cruz"
                  onBlur={handleBlur('lastName')}
                  value={values.lastName}
                />
                {errors.lastName && touched.lastName && (
                  <Text style={formsContainer.errorMessage}>{errors.lastName}</Text>
                )}
                <CustomInputs
                  labelTitle="Name extension"
                  required={false}
                  onChangeText={handleChange('nameExtension')}
                  placeHolder="Eg. Jr, Sr etc."
                  onBlur={handleBlur('nameExtension')}
                  value={values.nameExtension}
                />
                {errors.nameExtension && touched.nameExtension && (
                  <Text style={formsContainer.errorMessage}>{errors.nameExtension}</Text>
                )}
                <Text>
                  Age <Text style={{ color: Colors.red }}>{'*'}</Text>
                </Text>
                <TextInput
                  labelTitle="Age"
                  required={false}
                  onChangeText={handleChange('age')}
                  placeHolder=""
                  onBlur={handleBlur('age')}
                  style={{
                    height: 50,
                    width: '100%',
                    marginTop: 5,
                    borderWidth: 1,
                    fontSize: 18,
                    borderColor: Colors.inputColor,
                    backgroundColor: Colors.inputColor,
                    borderRadius: 5,
                    padding: 10,
                  }}
                  keyboardType="numeric"
                  value={values.age}
                />
                {errors.age && touched.age && (
                  <Text style={formsContainer.errorMessage}>{errors.age}</Text>
                )}
                <View style={{ marginTop: 5 }}>
                  <Text>Gender <Text style={{ color: Colors.red }}>{'*'}</Text></Text>
                  <CheckBox
                    checked={gender === 'Male'}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checkedColor={Colors.primary}
                    onPress={() => setGender('Male')}
                    containerStyle={[checkBox.radioOptions, { marginVertical: 2, marginLeft: -2 }]}
                    title="Male"
                  />
                  <CheckBox
                    checked={gender === 'Female'}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                    checkedColor={Colors.primary}
                    onPress={() => setGender('Female')}
                    containerStyle={[checkBox.radioOptions, { marginVertical: 7, marginLeft: -2 }]}
                    title="Female"
                  />
                  </View>
                <View style={{ marginTop: 20 }}>
                  <CustomButton color={Colors.primary} textColor="white" onPress={handleSubmit} title="Next" />
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingWrapper>
  );
};

export default ProfileInformationSetupScreen;

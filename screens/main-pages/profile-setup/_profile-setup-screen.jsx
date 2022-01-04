import React, { useState } from 'react';
// native components
import { Text, View, SafeAreaView, ScrollView } from 'react-native';
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
});

const ProfileInformationSetupScreen = ({ navigation }) => {
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
            }}
            validateOnMount={true}
            validationSchema={personalInfoSchema}
            onSubmit={values => {
              // store the data temporarily and remeber that this page is done
              _setThisPageToCompleted('@profileInfo', JSON.stringify(values));
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

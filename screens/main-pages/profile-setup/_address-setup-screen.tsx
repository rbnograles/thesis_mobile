import React, { useState } from 'react';
// native components
import { Text, View, SafeAreaView, ScrollView } from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
// stylesheet
import { formsContainer, landingPagesOrientation } from '../../../styles/styles-screens';
import KeyboardAvoidingWrapper from '../../../_utils/KeyboardAvoidingWrapper';
// custom components
import CustomInputs from '../../../_utils/CustomInputs';
import CustomButton from '../../../_utils/CustomButton';
import { Colors } from '../../../styles/styles-colors';

interface PersonalInformationValues {
  lotNumber: string | null;
  streetName: string;
  district: string | null;
  barangay: string;
  city: string;
  region: string;
}

let personalInfoSchema = yup.object().shape({
  lotNumber: yup
    .string()
    .matches(/[0-9A-Za-z]/, 'Lot number must contain numbers and letters only')
    .nullable(),
  streetName: yup
    .string()
    .matches(/[A-Za-z]/, 'Street name must contain only letters')
    .required('Street name is required'),
  district: yup
    .string()
    .matches(/[A-Za-z]/, 'District must contain only letters')
    .nullable(),
  barangay: yup
    .string()
    .matches(/[0-9A-Za-z.]/, 'Barangay name must contain only numbers, letters only')
    .required('Barangay is required'),
  city: yup
    .string()
    .matches(/[A-Za-z.]/, 'City name must contain only letters')
    .required('City is required'),
  region: yup
    .string()
    .matches(/[0-9A-Za-z.]/, 'Region name must contain only numbers and letters')
    .required('Region is required'),
});

const AddressInformationSetupScreen = ({ navigation }: any) => {
  return (
    <KeyboardAvoidingWrapper>
      <SafeAreaView style={landingPagesOrientation.container}>
        <Text style={formsContainer.formsHeader}>Profile Information</Text>
        <Text style={formsContainer.formsSubHeader}>Where are you currently residing in?</Text>
        <ScrollView>
          <Formik
            initialValues={{
              lotNumber: '',
              streetName: '',
              district: '',
              barangay: '',
              city: '',
              region: '',
            }}
            validateOnMount={true}
            validationSchema={personalInfoSchema}
            onSubmit={(values: PersonalInformationValues) => {
              console.log(values);
              navigation.navigate('UserTypeSetup');
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View style={{ marginTop: 10 }}>
                <CustomInputs
                  labelTitle="Lot Number"
                  required={false}
                  onChangeText={handleChange('lotNumber')}
                  placeHolder=""
                  onBlur={handleBlur('firstName')}
                  value={values.lotNumber}
                />
                {errors.lotNumber && touched.lotNumber && (
                  <Text style={formsContainer.errorMessage}>{errors.lotNumber}</Text>
                )}
                <CustomInputs
                  labelTitle="Street Name"
                  required={true}
                  onChangeText={handleChange('streetName')}
                  placeHolder=""
                  onBlur={handleBlur('streetName')}
                  value={values.streetName}
                />
                {errors.streetName && touched.streetName && (
                  <Text style={formsContainer.errorMessage}>{errors.streetName}</Text>
                )}
                <CustomInputs
                  labelTitle="District / Subdivision"
                  required={false}
                  onChangeText={handleChange('district')}
                  placeHolder=""
                  onBlur={handleBlur('district')}
                  value={values.district}
                />
                {errors.district && touched.district && (
                  <Text style={formsContainer.errorMessage}>{errors.district}</Text>
                )}
                <CustomInputs
                  labelTitle="Barangay"
                  required={true}
                  onChangeText={handleChange('barangay')}
                  placeHolder=""
                  onBlur={handleBlur('barangay')}
                  value={values.barangay}
                />
                {errors.barangay && touched.barangay && (
                  <Text style={formsContainer.errorMessage}>{errors.barangay}</Text>
                )}
                <CustomInputs
                  labelTitle="City"
                  required={true}
                  onChangeText={handleChange('city')}
                  placeHolder=""
                  onBlur={handleBlur('city')}
                  value={values.city}
                />
                {errors.city && touched.city && <Text style={formsContainer.errorMessage}>{errors.city}</Text>}
                <CustomInputs
                  labelTitle="Region"
                  required={true}
                  onChangeText={handleChange('region')}
                  placeHolder=""
                  onBlur={handleBlur('region')}
                  value={values.region}
                />
                {errors.region && touched.region && <Text style={formsContainer.errorMessage}>{errors.region}</Text>}
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

export default AddressInformationSetupScreen;

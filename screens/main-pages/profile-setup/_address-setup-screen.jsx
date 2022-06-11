import React, { useState, useEffect } from 'react';
// native components
import { Text, View, SafeAreaView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from 'yup';
import { Formik } from 'formik';
// stylesheet
import { formsContainer, landingPagesOrientation } from '../../../styles/styles-screens';
import KeyboardAvoidingWrapper from '../../../_utils/KeyboardAvoidingWrapper';
// custom components
import CustomInputs from '../../../_utils/CustomInputs';
import CustomButton from '../../../_utils/CustomButton';
import { Colors } from '../../../styles/styles-colors';
import { _setThisPageToCompleted } from '../../../_storages/_state_process';
import { FontAwesome } from '@expo/vector-icons';

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
  province: yup
    .string()
    .matches(/[0-9A-Za-z.]/, 'Province name must contain only numbers and letters')
    .required('Province is required'),
});

const AddressInformationSetupScreen = ({ navigation }) => {
  // this will fetch the default states from the screen interactions
  const [prevInfo, setPrevInfo] = useState(null);
  const getWelcomePageStatus = async () => {
    try {
      const data = await AsyncStorage.getItem('@profileInfo');
      setPrevInfo(JSON.parse(data));
    } catch (error) {
      console.log(error);
    }
  };

  // this function is a react native lifecycle method that will run when a component is mounted / loaded
  useEffect(() => {
    // running this function on mount
    getWelcomePageStatus();
  }, []);

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
              lotNumber: '',
              streetName: '',
              district: '',
              barangay: '',
              city: '',
              province: '',
            }}
            validateOnMount={true}
            validationSchema={personalInfoSchema}
            onSubmit={values => {
              // store the data temporarily and remeber that this page is done
              _setThisPageToCompleted('@profileInfo', JSON.stringify({ ...values, ...prevInfo }));
              _setThisPageToCompleted('@successProfileInfo', 'true');
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
                  labelTitle="Province"
                  required={true}
                  onChangeText={handleChange('province')}
                  placeHolder=""
                  onBlur={handleBlur('province')}
                  value={values.province}
                />
                {errors.province && touched.province && (
                  <Text style={formsContainer.errorMessage}>{errors.province}</Text>
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

export default AddressInformationSetupScreen;

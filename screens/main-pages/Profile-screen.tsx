import React, { useState } from 'react';
// native components
import { Text, View, SafeAreaView, ScrollView, Modal, StyleSheet, Pressable, Alert } from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import { AntDesign } from '@expo/vector-icons';
// stylesheet
import { formsContainer, displayFormContainer, landingPagesOrientation } from '../../styles/styles-screens';
// custom components
import KeyboardAvoidingWrapper from '../../_utils/KeyboardAvoidingWrapper';
import CustomInputs from '../../_utils/CustomInputs';
import CustomButton from '../../_utils/CustomButton';
import { Colors } from '../../styles/styles-colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

// schema types interfaces
interface PersonalInformationValues {
  firstName: string;
  middleName: string | null;
  lastName: string;
  nameExtension: string | null;
}
interface StudentValues {
  studentNumber: string;
  collegeDepartment: string;
}

interface FacultyValues {
  facultyPosition: string;
  collegeDepartment: string;
}

interface WorkerValues {
  jobTitle: string;
}

// user types related information validation schema
let studentInfoSchema = yup.object().shape({
  studentNumber: yup.string().required('Student number is required'),
  collegeDepartment: yup
    .string()
    .matches(/[A-Za-z]/, 'College department must contain only letters')
    .required('College department is required'),
});

let facultyInfoSchema = yup.object().shape({
  facultyPosition: yup.string().required('Faculty Position is required'),
  collegeDepartment: yup
    .string()
    .matches(/[A-Za-z]/, 'College department must contain only letters')
    .required('College department is required'),
});

let workerInfoSchema = yup.object().shape({
  jobTitle: yup.string().required('Job title is required'),
});

// user profile validation schema
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
  lotNumber: yup
    .string()
    .matches(/[A-Za-z]/, 'Lot number must contain only letters')
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
    .matches(/[A-Za-z.]/, 'Barangay name must contain only letters')
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

const ProfileScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <KeyboardAvoidingWrapper>
      <SafeAreaView style={landingPagesOrientation.container}>
        <Text style={displayFormContainer.formsHeader}>Profile Information Summary</Text>
        <ScrollView>
          <Formik
            initialValues={{
              userType: '',
              studentNumber: '',
              collegeDepartment: '',
              firstName: '',
              middleName: '',
              lastName: '',
              nameExtension: '',
              lotNumber: '',
              streetName: '',
              district: '',
              barangay: '',
              city: '',
              region: '',
              mobileNumber: '',
            }}
            validateOnMount={true}
            validationSchema={personalInfoSchema}
            onSubmit={(values: PersonalInformationValues) => {
              console.log(values);
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View style={{ marginTop: 10 }}>
                <Text>Position</Text>
                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                  <View style={[displayFormContainer.flexContainer]}>
                    <Text>{values.userType}</Text>
                    <AntDesign name="caretdown" size={14} color="black" />
                  </View>
                </TouchableOpacity>
                <CustomInputs
                  labelTitle="Student Number"
                  required={true}
                  onChangeText={handleChange('studentNumber')}
                  placeHolder=""
                  onBlur={handleBlur('studentNumber')}
                  value={values.studentNumber}
                />
                {errors.studentNumber && touched.studentNumber && (
                  <Text style={formsContainer.errorMessage}>{errors.studentNumber}</Text>
                )}
                <CustomInputs
                  labelTitle="College Department"
                  required={true}
                  onChangeText={handleChange('collegeDepartment')}
                  placeHolder=""
                  onBlur={handleBlur('collegeDepartment')}
                  value={values.collegeDepartment}
                />
                {errors.collegeDepartment && touched.collegeDepartment && (
                  <Text style={formsContainer.errorMessage}>{errors.collegeDepartment}</Text>
                )}
                <CustomInputs
                  labelTitle="First name"
                  required={true}
                  onChangeText={handleChange('firstName')}
                  placeHolder=""
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
                  placeHolder=""
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
                  placeHolder=""
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
                  placeHolder=""
                  onBlur={handleBlur('nameExtension')}
                  value={values.nameExtension}
                />
                {errors.nameExtension && touched.nameExtension && (
                  <Text style={formsContainer.errorMessage}>{errors.nameExtension}</Text>
                )}
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
                <CustomInputs
                  labelTitle="Mobile Number"
                  required={true}
                  onChangeText={handleChange('mobileNumber')}
                  placeHolder=""
                  onBlur={handleBlur('mobileNumber')}
                  value={values.region}
                />
                {errors.mobileNumber && touched.mobileNumber && (
                  <Text style={formsContainer.errorMessage}>{errors.mobileNumber}</Text>
                )}
                <View style={{ marginTop: 20, marginBottom: 20 }}>
                  <CustomButton color={Colors.primary} textColor="white" onPress={handleSubmit} title="Update" />
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Change user position?</Text>
              <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </KeyboardAvoidingWrapper>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.secondary,
    borderRadius: 5,
    padding: 35,
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: Colors.primary,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ProfileScreen;

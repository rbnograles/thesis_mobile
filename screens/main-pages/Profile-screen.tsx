import React, { useState } from 'react';
// native components
import { Text, View, SafeAreaView, ScrollView, Modal, StyleSheet, Pressable, Alert } from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import { AntDesign } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
// stylesheet
import { formsContainer, displayFormContainer, landingPagesOrientation, checkBox } from '../../styles/styles-screens';
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

// user profile validation schema
let personalInfoSchema = yup.object().shape({
  studentNumber: yup.string().nullable(),
  facultyPosition: yup.string().nullable(),
  jobTitle: yup.string().nullable(),
  collegeDepartment: yup
    .string()
    .matches(/[A-Za-z]/, 'College department must contain only letters')
    .nullable(),
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
  // default states
  const [modalVisible, setModalVisible] = useState(false);
  const [userType, setUserType] = useState('Student');

  const setUserTypeChoice = (type: string) => {
    setUserType(type);
  };

  const renderStudentFields = ({ values, errors, handleChange, handleBlur, touched }: any) => {
    return (
      <>
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
      </>
    );
  };

  const renderFacultyFields = ({ values, errors, handleChange, handleBlur, touched }: any) => {
    return (
      <>
        <CustomInputs
          labelTitle="Faculty Position"
          required={true}
          onChangeText={handleChange('facultyPosition')}
          placeHolder=""
          onBlur={handleBlur('facultyPosition')}
          value={values.facultyPosition}
        />
        {errors.facultyPosition && touched.facultyPosition && (
          <Text style={formsContainer.errorMessage}>{errors.facultyPosition}</Text>
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
      </>
    );
  };

  const renderWorkerFields = ({ values, errors, handleChange, handleBlur, touched }: any) => {
    return (
      <>
        <CustomInputs
          labelTitle="Job Title"
          required={true}
          onChangeText={handleChange('jobTitle')}
          placeHolder=""
          onBlur={handleBlur('jobTitle')}
          value={values.jobTitle}
        />
        {errors.jobTitle && touched.jobTitle && <Text style={formsContainer.errorMessage}>{errors.jobTitle}</Text>}
      </>
    );
  };

  return (
    <KeyboardAvoidingWrapper>
      <SafeAreaView style={landingPagesOrientation.container}>
        <Text style={displayFormContainer.formsHeader}>Profile Information Summary</Text>
        <ScrollView>
          <Formik
            initialValues={{
              userType: userType,
              studentNumber: '',
              facultyPosition: '',
              jobTitle: '',
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
                    <Text>{userType}</Text>
                    <AntDesign name="caretdown" size={14} color="black" />
                  </View>
                </TouchableOpacity>
                {userType === 'Student' && renderStudentFields({ values, errors, handleChange, handleBlur, touched })}
                {userType === 'Faculty' && renderFacultyFields({ values, errors, handleChange, handleBlur, touched })}
                {userType === 'Worker' && renderWorkerFields({ values, errors, handleChange, handleBlur, touched })}
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
    marginTop: 20,
    marginHorizontal: 15,
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
    width: '100%',
    padding: 15,
    elevation: 2,
    marginHorizontal: '50%',
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
    justifyContent: 'center',
  },
  modalText: {
    marginBottom: 15,
    width: '100%',
  },
});

export default ProfileScreen;

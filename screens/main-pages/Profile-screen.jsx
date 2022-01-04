import React, { useState, useEffect } from 'react';
// native components
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, SafeAreaView, Modal, StyleSheet, Pressable } from 'react-native';
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
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';

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
  province: yup
    .string()
    .matches(/[0-9A-Za-z.]/, 'Province name must contain only letters')
    .required('Province is required'),
});

const ProfileScreen = () => {
  // default states
  const [modalVisible, setModalVisible] = useState(false);
  const [userType, setUserType] = useState('Student');
  const [prevInfo, setPrevInfo] = useState({});

  const setUserTypeChoice = type => {
    setUserType(type);
    setPrevInfo({ ...prevInfo, userType: type });
  };

  const overRideHandlerChange = (field, value) => {
    console.log(value);
    setPrevInfo({ ...prevInfo, [field]: value });
  };

  const getUserProfileData = async () => {
    // get the stored data and render to the fields
    try {
      const data = await AsyncStorage.getItem('@profileInfo');
      const value = await AsyncStorage.getItem('@mobile_num_key');
      const newdata = JSON.parse(data);
      setPrevInfo({ mobileNumber: value, ...newdata });
    } catch (error) {
      console.log(error);
    }
  };

  // this function is a react native lifecycle method that will run when a component is mounted / loaded
  useEffect(() => {
    // running this function on mount
    getUserProfileData();
  }, []);

  const renderStudentFields = ({ prevInfo, errors, overRideHandlerChange, handleBlur, touched }) => {
    return (
      <>
        <CustomInputs
          labelTitle="Student Number"
          required={true}
          onChangeText={e => overRideHandlerChange('studentNumber', e)}
          placeHolder=""
          onBlur={handleBlur('studentNumber')}
          value={prevInfo.studentNumber}
        />
        {errors.studentNumber && touched.studentNumber && (
          <Text style={formsContainer.errorMessage}>{errors.studentNumber}</Text>
        )}
        <CustomInputs
          labelTitle="College Department"
          required={true}
          onChangeText={e => overRideHandlerChange('collegeDepartment', e)}
          placeHolder=""
          onBlur={handleBlur('collegeDepartment')}
          value={prevInfo.collegeDepartment}
        />
        {errors.collegeDepartment && touched.collegeDepartment && (
          <Text style={formsContainer.errorMessage}>{errors.collegeDepartment}</Text>
        )}
      </>
    );
  };

  const renderFacultyFields = ({ prevInfo, errors, overRideHandlerChange, handleBlur, touched }) => {
    return (
      <>
        <CustomInputs
          labelTitle="Faculty Position"
          required={true}
          onChangeText={e => overRideHandlerChange('facultyPosition', e)}
          placeHolder=""
          onBlur={handleBlur('facultyPosition')}
          value={prevInfo.facultyPosition}
        />
        {errors.facultyPosition && touched.facultyPosition && (
          <Text style={formsContainer.errorMessage}>{errors.facultyPosition}</Text>
        )}
        <CustomInputs
          labelTitle="College Department"
          required={true}
          onChangeText={e => overRideHandlerChange('collegeDepartment', e)}
          placeHolder=""
          onBlur={handleBlur('collegeDepartment')}
          value={prevInfo.collegeDepartment}
        />
        {errors.collegeDepartment && touched.collegeDepartment && (
          <Text style={formsContainer.errorMessage}>{errors.collegeDepartment}</Text>
        )}
      </>
    );
  };

  const renderWorkerFields = ({ prevInfo, errors, overRideHandlerChange, handleBlur, touched }) => {
    return (
      <>
        <CustomInputs
          labelTitle="Job Title"
          required={true}
          onChangeText={e => overRideHandlerChange('jobTitle', e)}
          placeHolder=""
          onBlur={handleBlur('jobTitle')}
          value={prevInfo.jobTitle}
        />
        {errors.jobTitle && touched.jobTitle && <Text style={formsContainer.errorMessage}>{errors.jobTitle}</Text>}
      </>
    );
  };

  return (
    <KeyboardAvoidingWrapper>
      <ScrollView>
        <SafeAreaView style={landingPagesOrientation.container}>
          <Text style={displayFormContainer.formsHeader}>Profile Information Summary</Text>
          <Formik
            initialValues={{
              userType: '',
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
              province: '',
              mobileNumber: '',
            }}
            validateOnMount={true}
            validationSchema={personalInfoSchema}
            onSubmit={values => {
              console.log(values);
            }}
          >
            {({ handleBlur, handleSubmit, errors, touched }) => (
              <View style={{ marginTop: 10 }}>
                <View style={{ marginBottom: 15 }}>
                  <Text style={displayFormContainer.formCaptions}>User Affiliation</Text>
                  <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                    <View style={[displayFormContainer.flexContainer]}>
                      <Text>{prevInfo.userType}</Text>
                      <AntDesign name="caretdown" size={14} color="black" />
                    </View>
                  </TouchableOpacity>
                  {userType === 'Student' &&
                    renderStudentFields({ prevInfo, errors, overRideHandlerChange, handleBlur, touched })}
                  {userType === 'Faculty' &&
                    renderFacultyFields({ prevInfo, errors, overRideHandlerChange, handleBlur, touched })}
                  {userType === 'Worker' &&
                    renderWorkerFields({ prevInfo, errors, overRideHandlerChange, handleBlur, touched })}
                </View>
                <View style={{ marginBottom: 15 }}>
                  <Text style={displayFormContainer.formCaptions}>Personal Name</Text>
                  <CustomInputs
                    labelTitle="First name"
                    required={true}
                    onChangeText={e => overRideHandlerChange('firstName', e)}
                    placeHolder=""
                    onBlur={handleBlur('firstName')}
                    value={prevInfo.firstName}
                  />
                  {errors.firstName && touched.firstName && (
                    <Text style={formsContainer.errorMessage}>{errors.firstName}</Text>
                  )}
                  <CustomInputs
                    labelTitle="Middle name"
                    required={false}
                    onChangeText={e => overRideHandlerChange('middleName', e)}
                    placeHolder=""
                    onBlur={handleBlur('middleName')}
                    value={prevInfo.middleName}
                  />
                  {errors.middleName && touched.middleName && (
                    <Text style={formsContainer.errorMessage}>{errors.middleName}</Text>
                  )}
                  <CustomInputs
                    labelTitle="Last name"
                    required={true}
                    onChangeText={e => overRideHandlerChange('lastName', e)}
                    placeHolder=""
                    onBlur={handleBlur('lastName')}
                    value={prevInfo.lastName}
                  />
                  {errors.lastName && touched.lastName && (
                    <Text style={formsContainer.errorMessage}>{errors.lastName}</Text>
                  )}
                  <CustomInputs
                    labelTitle="Suffix"
                    required={false}
                    onChangeText={e => overRideHandlerChange('nameExtension', e)}
                    placeHolder=""
                    onBlur={handleBlur('nameExtension')}
                    value={prevInfo.nameExtension}
                  />
                  {errors.nameExtension && touched.nameExtension && (
                    <Text style={formsContainer.errorMessage}>{errors.nameExtension}</Text>
                  )}
                </View>
                <View style={{ marginBottom: 15 }}>
                  <Text style={displayFormContainer.formCaptions}>Current Address</Text>
                  <CustomInputs
                    labelTitle="Lot Number"
                    required={false}
                    onChangeText={e => overRideHandlerChange('lotNumber', e)}
                    placeHolder=""
                    onBlur={handleBlur('firstName')}
                    value={prevInfo.lotNumber}
                  />
                  {errors.lotNumber && touched.lotNumber && (
                    <Text style={formsContainer.errorMessage}>{errors.lotNumber}</Text>
                  )}
                  <CustomInputs
                    labelTitle="Street Name"
                    required={true}
                    onChangeText={e => overRideHandlerChange('streetName', e)}
                    placeHolder=""
                    onBlur={handleBlur('streetName')}
                    value={prevInfo.streetName}
                  />
                  {errors.streetName && touched.streetName && (
                    <Text style={formsContainer.errorMessage}>{errors.streetName}</Text>
                  )}
                  <CustomInputs
                    labelTitle="District / Subdivision"
                    required={false}
                    onChangeText={e => overRideHandlerChange('district', e)}
                    placeHolder=""
                    onBlur={handleBlur('district')}
                    value={prevInfo.district}
                  />
                  {errors.district && touched.district && (
                    <Text style={formsContainer.errorMessage}>{errors.district}</Text>
                  )}
                  <CustomInputs
                    labelTitle="Barangay"
                    required={true}
                    onChangeText={e => overRideHandlerChange('barangay', e)}
                    placeHolder=""
                    onBlur={handleBlur('barangay')}
                    value={prevInfo.barangay}
                  />
                  {errors.barangay && touched.barangay && (
                    <Text style={formsContainer.errorMessage}>{errors.barangay}</Text>
                  )}
                  <CustomInputs
                    labelTitle="City"
                    required={true}
                    onChangeText={e => overRideHandlerChange('city', e)}
                    placeHolder=""
                    onBlur={handleBlur('city')}
                    value={prevInfo.city}
                  />
                  {errors.city && touched.city && <Text style={formsContainer.errorMessage}>{errors.city}</Text>}
                  <CustomInputs
                    labelTitle="Province"
                    required={true}
                    onChangeText={e => overRideHandlerChange('province', e)}
                    placeHolder=""
                    onBlur={handleBlur('province')}
                    value={prevInfo.province}
                  />
                  {errors.province && touched.province && (
                    <Text style={formsContainer.errorMessage}>{errors.province}</Text>
                  )}
                </View>
                <View style={{ marginBottom: 15 }}>
                  <Text style={displayFormContainer.formCaptions}>Contact Information</Text>
                  <CustomInputs
                    labelTitle="Mobile Number"
                    required={true}
                    onChangeText={e => overRideHandlerChange('mobileNumber', e)}
                    placeHolder=""
                    onBlur={handleBlur('mobileNumber')}
                    value={prevInfo.mobileNumber}
                  />
                  {errors.mobileNumber && touched.mobileNumber && (
                    <Text style={formsContainer.errorMessage}>{errors.mobileNumber}</Text>
                  )}
                </View>
                <View style={{ marginTop: 20, marginBottom: 20 }}>
                  <CustomButton color={Colors.primary} textColor="white" onPress={handleSubmit} title="Update" />
                </View>
              </View>
            )}
          </Formik>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.modalText}>Change user position?</Text>
                  <Pressable onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={{ color: 'black' }}>
                      <FontAwesome name="times" color="black" size={22} />
                    </Text>
                  </Pressable>
                </View>
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
            </View>
          </Modal>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingWrapper>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#000000AA',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 7,
    padding: 35,
    alignItems: 'center',
    shadowColor: Colors.primary,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: '700',
    width: '100%',
  },
});

export default ProfileScreen;

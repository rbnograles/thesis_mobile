import React, { useState, useEffect } from 'react';
// native components
import { Text, View, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from 'yup';
import { Formik } from 'formik';
// stylesheet
import { formsContainer, landingPagesOrientation } from '../../../styles/styles-screens';
// custom components
import CustomInputs from '../../../_utils/CustomInputs';
import CustomButton from '../../../_utils/CustomButton';
import { Colors } from '../../../styles/styles-colors';
import { _setThisPageToCompleted } from '../../../_storages/_state_process';

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

const renderStudentTypeFields = ({ navigation, prevInfo }) => {
  return (
    <>
      <Formik
        initialValues={{
          studentNumber: '',
          collegeDepartment: '',
        }}
        validateOnMount={true}
        validationSchema={studentInfoSchema}
        onSubmit={values => {
          // store the data temporarily and remeber that this page is done
          _setThisPageToCompleted('@profileInfo', JSON.stringify({ ...values, ...prevInfo }));
          _setThisPageToCompleted('@successWelcomePage', 'true');
          navigation.navigate('MainPages', { isSetupComplete: true });
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={{ marginTop: 10 }}>
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
            <View style={{ marginTop: 20 }}>
              <CustomButton color={Colors.primary} textColor="white" onPress={handleSubmit} title="Finish Setup" />
            </View>
          </View>
        )}
      </Formik>
    </>
  );
};

const renderFacultyTypeFields = ({ navigation, prevInfo }) => {
  return (
    <>
      <Formik
        initialValues={{
          facultyPosition: '',
          collegeDepartment: '',
        }}
        validateOnMount={true}
        validationSchema={facultyInfoSchema}
        onSubmit={values => {
          // store the data temporarily and remeber that this page is done
          _setThisPageToCompleted('@profileInfo', JSON.stringify({ ...values, ...prevInfo }));
          _setThisPageToCompleted('@successWelcomePage', 'true');
          navigation.navigate('MainPages', { isSetupComplete: true });
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={{ marginTop: 10 }}>
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
            <View style={{ marginTop: 20 }}>
              <CustomButton color={Colors.primary} textColor="white" onPress={handleSubmit} title="Finish Setup" />
            </View>
          </View>
        )}
      </Formik>
    </>
  );
};

const renderWorkerTypeFields = ({ navigation, prevInfo }) => {
  return (
    <>
      <Formik
        initialValues={{
          jobTitle: '',
        }}
        validateOnMount={true}
        validationSchema={workerInfoSchema}
        onSubmit={values => {
          // store the data temporarily and remeber that this page is done
          _setThisPageToCompleted('@profileInfo', JSON.stringify({ ...values, ...prevInfo }));
          _setThisPageToCompleted('@successWelcomePage', 'true');
          navigation.navigate('MainPages', { isSetupComplete: true });
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={{ marginTop: 10 }}>
            <CustomInputs
              labelTitle="Job Title"
              required={true}
              onChangeText={handleChange('jobTitle')}
              placeHolder=""
              onBlur={handleBlur('jobTitle')}
              value={values.jobTitle}
            />
            {errors.jobTitle && touched.jobTitle && <Text style={formsContainer.errorMessage}>{errors.jobTitle}</Text>}
            <View style={{ marginTop: 20 }}>
              <CustomButton color={Colors.primary} textColor="white" onPress={handleSubmit} title="Finish Setup" />
            </View>
          </View>
        )}
      </Formik>
    </>
  );
};

const UserTypeRelatedInfoSetupScreen = ({ route, navigation }) => {
  const { userType } = route.params;
  const [prevInfo, setPrevInfo] = useState(null);
  // this will fetch the default states from the screen interactions
  const getWelcomePageStatus = async () => {
    try {
      const data = await AsyncStorage.getItem('@profileInfo');
      console.log(data);
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
    <SafeAreaView style={landingPagesOrientation.container}>
      <Text style={formsContainer.formsHeader}>Profile Information</Text>
      <Text style={formsContainer.formsSubHeader}>
        This information will be saved only on your device and not on the main database.
      </Text>
      {userType === 'Student' && renderStudentTypeFields({ navigation, prevInfo })}
      {userType === 'Worker' && renderWorkerTypeFields({ navigation, prevInfo })}
      {userType === 'Faculty' && renderFacultyTypeFields({ navigation, prevInfo })}
    </SafeAreaView>
  );
};

export default UserTypeRelatedInfoSetupScreen;

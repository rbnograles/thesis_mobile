import React from 'react';
// native components
import { Text, View, SafeAreaView } from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
// stylesheet
import { formsContainer, landingPagesOrientation } from '../../../styles/styles-screens';
// custom components
import CustomInputs from '../../../_utils/CustomInputs';
import CustomButton from '../../../_utils/CustomButton';
import { Colors } from '../../../styles/styles-colors';

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

const renderStudentTypeFields = ({ navigation }: any) => {
  return (
    <>
      <Formik
        initialValues={{
          studentNumber: '',
          collegeDepartment: '',
        }}
        validateOnMount={true}
        validationSchema={studentInfoSchema}
        onSubmit={(values: StudentValues) => {
          console.log(values);
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

const renderFacultyTypeFields = ({ navigation }: any) => {
  return (
    <>
      <Formik
        initialValues={{
          facultyPosition: '',
          collegeDepartment: '',
        }}
        validateOnMount={true}
        validationSchema={facultyInfoSchema}
        onSubmit={(values: FacultyValues) => {
          console.log(values);
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

const renderWorkerTypeFields = ({ navigation }: any) => {
  return (
    <>
      <Formik
        initialValues={{
          jobTitle: '',
        }}
        validateOnMount={true}
        validationSchema={workerInfoSchema}
        onSubmit={(values: WorkerValues) => {
          console.log(values);
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

const UserTypeRelatedInfoSetupScreen = ({ route, navigation }: any) => {
  const { userType } = route.params;

  return (
    <SafeAreaView style={landingPagesOrientation.container}>
      <Text style={formsContainer.formsHeader}>Profile Information</Text>
      <Text style={formsContainer.formsSubHeader}>Please tell us some information related to you.</Text>
      {userType === 'Student' && renderStudentTypeFields({ navigation })}
      {userType === 'Worker' && renderWorkerTypeFields({ navigation })}
      {userType === 'Faculty' && renderFacultyTypeFields({ navigation })}
    </SafeAreaView>
  );
};

export default UserTypeRelatedInfoSetupScreen;

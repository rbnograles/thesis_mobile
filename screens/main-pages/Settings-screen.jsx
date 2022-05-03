import React, { useState, useEffect } from 'react';
// native components
import { Text, View, Modal, TouchableOpacity, StyleSheet, BackHandler, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// stylesheet
import { displayFormContainer, landingPagesOrientation, sectionContiner } from '../../styles/styles-screens';
import { Colors } from '../../styles/styles-colors';
import CustomButton from '../../_utils/CustomButton';
import { updateUserPositiveLogsRecovered } from '../../apis/positive-logs';
import Loader from '../../_utils/Loader';
import Moment from 'moment';

const SettingsScreen = () => {

  const [positiveReportDate, setPositiveReportDate] = useState('');
  const [dateAfter14Days, setDateAfter14Days] = useState('');
  const [updating, setIsUpdating] = useState(false);
  const [prevInfo, setPrevInfo] = useState({});
  const [modalConfirmVisible, setModalConfirmVisible] = useState(false);
  const [positiveConfirmVisible, setPositiveModalConfirmVisible] = useState(false);
  const [recoveredConfirmVisible, setRecoveredModalConfirmVisible] = useState(false);

  // reset everything
  const clearAsyncStorageData = async () => {
    try {
      await AsyncStorage.clear();
      BackHandler.exitApp();
    } catch (error) {
      console.log(error)
    }
  };

  const getUserProfileData = async () => {
    // get the stored data and render to the fields
    try {
      const data = await AsyncStorage.getItem('@profileInfo');
      const value = await AsyncStorage.getItem('@mobile_num_key');
      const positiveDate = await AsyncStorage.getItem('@positiveReportDate');
      const dateAfter14Days = await AsyncStorage.getItem('@dateAfter14Days');
      const newdata = JSON.parse(data);
      setPrevInfo({ mobileNumber: value, ...newdata });
      setPositiveReportDate(positiveDate);
      setDateAfter14Days(dateAfter14Days);
    } catch (error) {
      Alert.alert(
      'Error',
      'Something went wrong, please try again later.',
      [
        {
          text: 'Close',
          style: 'default',
        },
      ],
      {
        cancelable: true,
      }
    );
    }
  };

  const showSuccessAlert = () => {
    Alert.alert(
      'Upload Successful',
      'Your personal information and visitation history was uploaded successfully, this will be used for contact tracing.',
      [
        {
          text: 'Close',
          style: 'default',
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const showFailedAlert = () => {
    Alert.alert(
      'Upload Failed',
      'Something went wrong, please try again later.',
      [
        {
          text: 'Close',
          style: 'default',
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const uploadPositiveInformationData = async () => {
    setIsUpdating(true);
    try {
      // prepare the number format for uploading to datebase
      const newNumber = prevInfo.mobileNumber.split('');
      newNumber.shift();
      // send api
      await createUserPositiveLogs({
        ...prevInfo,
        mobileNumber: `+63${newNumber.join('')}`,
        date: new Date().toISOString().split('T')[0],
      });
      // sets the current date as positive report date
      await AsyncStorage.setItem('@positiveReportDate', new Date().toISOString().split('T')[0]);
      await AsyncStorage.setItem('@dateAfter14Days', new Date(Date.now() + 12096e5).toISOString().split('T')[0]);
      setPositiveReportDate(new Date().toISOString().split('T')[0]);
      setDateAfter14Days(new Date(Date.now() + 12096e5).toISOString().split('T')[0]);
      // close modal, alert 
      setPositiveModalConfirmVisible(!positiveConfirmVisible);
      showSuccessAlert();
      setIsUpdating(false);
    } catch (error) {
      console.log(error.response);
      showFailedAlert();
      setIsUpdating(false);
    }
  };

  const updateHealthStatus = async () => {
    setIsUpdating(true);
    try {
      // prepare the number format for uploading to datebase
      const newNumber = prevInfo.mobileNumber.split('');
      newNumber.shift();
      // send api
      await updateUserPositiveLogsRecovered({ mobileNumber: `+63${newNumber.join('')}`});
      await AsyncStorage.removeItem('@positiveReportDate');
      await AsyncStorage.removeItem('@dateAfter14Days');
      setPositiveReportDate('');
      setDateAfter14Days('');
      setRecoveredModalConfirmVisible(!recoveredConfirmVisible);
      showSuccessAlert();
      setIsUpdating(false);
    } catch (error) {
      console.log(error.response);
      showFailedAlert();
      setIsUpdating(false);
    }
  }

  // @auto execute upon screen
  useEffect(() => {
    // get stored profile data
    getUserProfileData();
  }, []);

  return (
    <View style={landingPagesOrientation.container}>
      <Text style={displayFormContainer.formsHeader}>Account Privacy</Text>
      <View style={sectionContiner.section}>
        <Text style={sectionContiner.sectionHeader}>COVID-19 Status Alert</Text>
        {
          !positiveReportDate ? <>
            <Text style={sectionContiner.sectionDescription}>
              If you are diagnosed with COVID-19, please click the "I am positive" button. This will upload your personal
              information provided to alert the community of a possible contact. If not done immediately, an authorized
              person from the community will obligate you to upload your location history.
            </Text>
            <CustomButton
              title="I am positive of COVID-19"
              color={Colors.red}
              textColor="white"
              onPress={() => setPositiveModalConfirmVisible(true)}
            />
          </>
          :
          <>
            <Text style={sectionContiner.sectionDescription}>
              <Text style={{ color: Colors.red, fontWeight: "bold"}}>Notice:</Text> You have reported that you are positive of Covid 19 on <Text style={{ color: Colors.red, fontWeight: "bold"}}>
                {Moment(positiveReportDate).format('MMMM DD, YYYY')}
              </Text>.
            </Text>
            <Text style={sectionContiner.sectionDescription}>
              You are advised to follow the 14 day <Text style={{ color: Colors.green, fontWeight: "bold"}}>({ Moment(positiveReportDate).format('MMMM DD, YYYY') + " - " + Moment(dateAfter14Days).format('MMMM DD, YYYY') })</Text> quarantine protocol mandated by the government. 
              You can <Text style={{ fontWeight: "bold", color: Colors.green}}> can press the button below</Text>  after the 14 day quarantine protocol is over and
              the health officials gives you the signal that you are covid free now. 
            </Text>
            {
              new Date().toISOString().split('T')[0] !== dateAfter14Days ? 
              <CustomButton
                title="I have recovered from Covid-19"
                color={Colors.green}
                textColor="white"
                onPress={() => setRecoveredModalConfirmVisible(true)}
              />
              :
              <CustomButton
                title="I have recovered from Covid-19"
                color={Colors.grey}
                textColor="white"
                onPress={() => {}}
              />
            }
          </>
          
        }
      </View>
      <View style={sectionContiner.section}>
        <Text style={sectionContiner.sectionHeader}>Delete your account</Text>
        <Text style={sectionContiner.sectionDescription}>
          If you chose to delete your account, all data from this account will be deleted from the database and your
          mobile device.
        </Text>
        <CustomButton
          title="Delete Account"
          color={Colors.red}
          textColor="white"
          onPress={() => setModalConfirmVisible(true)}
        />
      </View>
      {/* confirm modal for saving the data */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={positiveConfirmVisible}
        onRequestClose={() => {
          setPositiveModalConfirmVisible(!positiveConfirmVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { alignItems: 'flex-start' }]}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={[styles.modalText, { color: Colors.red }]}>COVID-19 Health Notice</Text>
            </View>
            <Text style={{ fontSize: 15 }}>
              By clicking this button, you are stating that you are{' '}
              <Text style={[{ color: Colors.red }]}>Positive of COVID-19</Text>, this will notify the system
              administrator about your health status. A contact tracing will happen shortly after the upload.
            </Text>
            <Text style={{ fontSize: 15, marginTop: 10 }}>
              All of you information and visitation history will be collected by the system for health profiling and
              contact tracing.
            </Text>
            <Text style={{ fontSize: 15, marginTop: 10 }}>
              If you are unsure of your health status, please visit a health center/hospital for a COVID-19 test first,
              before you proceed.{' '}
              <Text style={[{ color: Colors.red }]}>
                False Information will be meet with a sanction from the management.
              </Text>
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: 15,
              }}
            >
              {
                !updating ? <>
                <TouchableOpacity
                style={{ width: '50%' }}
                onPress={() => setPositiveModalConfirmVisible(!positiveConfirmVisible)}
              >
                <View
                  style={{
                    backgroundColor: Colors.lightGrey,
                    height: 50,
                    justifyContent: 'center',
                    marginRight: 10,
                    alignItems: 'center',
                    borderRadius: 3,
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: '700' }}>Cancel</Text>
                </View>
              </TouchableOpacity>
              {/* yes button */}
              <TouchableOpacity
                style={{ width: '50%' }}
                onPress={() => {
                  uploadPositiveInformationData();
                }}
              >
                <View
                  style={{
                    backgroundColor: Colors.red,
                    height: 50,
                    marginLeft: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 3,
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: '700', color: 'white' }}>Proceed</Text>
                </View>
              </TouchableOpacity></>: <Loader/>
              }
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={recoveredConfirmVisible}
        onRequestClose={() => {
          setRecoveredModalConfirmVisible(!recoveredConfirmVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { alignItems: 'flex-start' }]}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={[styles.modalText, { color: Colors.green }]}>Recovered from COVID-19 Health Notice</Text>
            </View>
            <Text style={{ fontSize: 15 }}>
              By clicking this button, you are stating that you are{' '}
              <Text style={[{ color: Colors.green }]}>COVID-19 Recovered Patient</Text>, this will notify the system
              administrator about your health status.
            </Text>
            <Text style={{ fontSize: 15, marginTop: 10 }}>
              If you are unsure of your health status, please visit a health center/hospital for a COVID-19 test first,
              before you proceed.{' '}
              <Text style={[{ color: Colors.red }]}>
                False Information will be meet with a sanction from the management.
              </Text>
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: 15,
              }}
            >
              {
                !updating ? <>
                <TouchableOpacity
                style={{ width: '50%' }}
                onPress={() => setRecoveredModalConfirmVisible(!recoveredConfirmVisible)}
              >
                <View
                  style={{
                    backgroundColor: Colors.lightGrey,
                    height: 50,
                    justifyContent: 'center',
                    marginRight: 10,
                    alignItems: 'center',
                    borderRadius: 3,
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: '700' }}>Cancel</Text>
                </View>
              </TouchableOpacity>
              {/* yes button */}
              <TouchableOpacity
                style={{ width: '50%' }}
                onPress={() => {
                  updateHealthStatus();
                }}
              >
                <View
                  style={{
                    backgroundColor: Colors.green,
                    height: 50,
                    marginLeft: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 3,
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: '700', color: 'white' }}>Proceed</Text>
                </View>
              </TouchableOpacity></>: <Loader/>
              }
            </View>
          </View>
        </View>
      </Modal>

      {/* confirm modal for saving the data */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalConfirmVisible}
        onRequestClose={() => {
          setModalConfirmVisible(!modalConfirmVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, { alignItems: 'flex-start' }]}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={[styles.modalText, { color: Colors.red }]}>
                Are you sure you want to delete your account?
              </Text>
            </View>
            <Text style={{ fontSize: 15 }}>
              By deleting your account all data stored in your mobile device will be lost, after completing the deletion
              you will be exited from the application!
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                marginTop: 15,
              }}
            >
              <TouchableOpacity style={{ width: '50%' }} onPress={() => setModalConfirmVisible(!modalConfirmVisible)}>
                <View
                  style={{
                    backgroundColor: Colors.lightGrey,
                    height: 50,
                    justifyContent: 'center',
                    marginRight: 10,
                    alignItems: 'center',
                    borderRadius: 3,
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: '700' }}>No</Text>
                </View>
              </TouchableOpacity>
              {/* yes button */}
              <TouchableOpacity
                style={{ width: '50%' }}
                onPress={() => {
                  clearAsyncStorageData();
                  setModalConfirmVisible(!modalConfirmVisible);
                }}
              >
                <View
                  style={{
                    backgroundColor: Colors.red,
                    height: 50,
                    marginLeft: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 3,
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: '700', color: 'white' }}>Yes</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
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

export default SettingsScreen;

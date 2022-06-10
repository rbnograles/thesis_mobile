import React, { useState, useEffect } from 'react';
// native components
import Loader from '../../_utils/Loader';
import { Text, View, Modal, TouchableOpacity, StyleSheet, BackHandler, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// stylesheet
import { displayFormContainer, landingPagesOrientation, sectionContiner } from '../../styles/styles-screens';
import { Colors } from '../../styles/styles-colors';
import { updateUserPositiveLogsRecovered, createUserPositiveLogs, getAllMyReports } from '../../apis/positive-logs';
import { requestForDeletionOfAccount } from '../../apis/account-deletion';
import { getAllDiseases } from '../../apis/diseases';
import { CheckBox, ListItem, Icon } from 'react-native-elements';
import DiseaseStatusAlert from './SettingsComponents/DiseaseStatusAlert';
import RecovereyStatusUpdate from './SettingsComponents/RecovereyStatusUpdate';
import DeleteAccount from './SettingsComponents/DeleteAccount';

const SettingsScreen = () => {

  const [positiveReportDate, setPositiveReportDate] = useState('');
  const [dateAfter14Days, setDateAfter14Days] = useState('');
  const [updating, setIsUpdating] = useState(false);
  const [prevInfo, setPrevInfo] = useState({});
  const [modalConfirmVisible, setModalConfirmVisible] = useState(false);
  const [positiveConfirmVisible, setPositiveModalConfirmVisible] = useState(false);
  const [recoveredConfirmVisible, setRecoveredModalConfirmVisible] = useState(false);
  const [diseases, setDiseases] = useState([]);
  const [selectedDisease, setSelectedDisease] = useState([]);
  const [recoveredList, setRecoveredList] = useState([])
  const [currentReport, setCurrentReport] = useState([])
  const [isExpandedDisease, setIsExpandedDisease] = useState(true);
  const [isExpandedRecover, setIsExpandedRecover] = useState(false);
  const [isExpandedDelete, setisExpandedDelete] = useState(false);

  const addDiseaseToList = (disease) => {
    if(selectedDisease.includes(disease)) {
      const data = selectedDisease.filter(diseases => { return diseases !== disease })
      setSelectedDisease(data)
    } else {
      setSelectedDisease([...selectedDisease, disease])
    }
  }

  const addRecoveredList = (id) => {
    if(recoveredList.includes(id)) {
      const data = recoveredList.filter(recoveryId => { return recoveryId !== id })
      setRecoveredList(data)
    } else {
      setRecoveredList([...recoveredList, id])
    }
  }

  // reset everything
  const clearAsyncStorageData = async () => {
    try {
      const mobileNumber = await AsyncStorage.getItem('@mobile_num_key');
      await requestForDeletionOfAccount({ mobileNumber: mobileNumber, deletionDate: new Date(Date.now() + 12096e5).toISOString().split('T')[0] })
      await AsyncStorage.clear();
      BackHandler.exitApp();
    } catch (error) {
      console.log(error.response)
    }
  };

  const getAllDiseasesList  = async () => {
    try {
      const data = await getAllDiseases();
      setDiseases(data.data.data);
    } catch (error) {
      setDiseases([]);
    }
  }

  const getAllUserReports = async () => {
    try {
      const mobileNumber = await AsyncStorage.getItem('@mobile_num_key');
      let newNumber = mobileNumber.split('');
      newNumber.shift();
      const data = await getAllMyReports(`+63${newNumber.join('')}`);
      // sets the current date as positive report date
      await AsyncStorage.setItem('@positiveReportDate', data.data.data[0].date);
      await AsyncStorage.setItem('@dateAfter14Days', new Date(new Date(data.data.data[0].date).getTime() + 12096e5).toISOString().split('T')[0]);
      setPositiveReportDate(data.data.data[0].date);
      setDateAfter14Days(new Date(new Date(data.data.data[0].date).getTime() + 12096e5).toISOString().split('T')[0]);
      setCurrentReport(data.data.data)
      return data.data.data;
    } catch (error) {
      setCurrentReport([])
    }
  }

  const getUserProfileData = async () => {
    // get the stored data and render to the fields
    try {
      const data = await AsyncStorage.getItem('@profileInfo');
      const value = await AsyncStorage.getItem('@mobile_num_key');
      const newdata = JSON.parse(data);
      setPrevInfo({ mobileNumber: value, ...newdata });
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

  const showFailedUploadAlert = () => {
    Alert.alert(
      'Upload Failed',
      'Something went wrong, please check your internet connection or your profile information setup and try again.',
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
      for(let i =0; i < selectedDisease.length; i++) {
        await createUserPositiveLogs({
          ...prevInfo,
          disease: selectedDisease[i],
          mobileNumber: `+63${newNumber.join('')}`,
          date: new Date().toISOString().split('T')[0],
        });
      }

      getAllUserReports();
      setSelectedDisease([]);
      // close modal, alert 
      setPositiveModalConfirmVisible(!positiveConfirmVisible);
      showSuccessAlert();
      setIsUpdating(false);
    } catch (error) {
      showFailedUploadAlert();
      setIsUpdating(false);
    }
  };

  const updateHealthStatus = async () => {
    setIsUpdating(true);
    try {
      // send api
      for(let i = 0; i < recoveredList.length; i++) {
        await updateUserPositiveLogsRecovered(recoveredList[i]);
      }
      // execute the fetching again
      const data = getAllUserReports();

      if (data.length === 0) {
        await AsyncStorage.removeItem('@positiveReportDate');
        await AsyncStorage.removeItem('@dateAfter14Days');
        setPositiveReportDate('');
        setDateAfter14Days('');
      }
      setRecoveredModalConfirmVisible(!recoveredConfirmVisible);
      setRecoveredList([]);
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
    // get all diseases monitored by the system
    getAllDiseasesList();
    // get stored profile data
    getUserProfileData();
    // get all report from db and render it on user side
    getAllUserReports();
  }, []);

  return (
    <View style={[landingPagesOrientation.container2 ]}>
      <Text style={[displayFormContainer.formsHeader, { marginHorizontal: 20, marginVertical: 20 }]}>Account Status and Privacy</Text>
      {/* Disease List */}
      <ListItem.Accordion
        content={
          <>
            <Icon name="notification-important" size={20} color={Colors.red} />
            <ListItem.Content>
              <ListItem.Title style={[sectionContiner.sectionHeader, { color: Colors.red }]}>
                Disease Status Alert
              </ListItem.Title>
            </ListItem.Content>
          </>
        }
        topDivider
        containerStyle={{ backgroundColor: "transparent" }}
        isExpanded={isExpandedDisease}
        onPress={() => { 
          setIsExpandedDisease(!isExpandedDisease);
          setIsExpandedRecover(false);
          setisExpandedDelete(false);
        }}
      >
      <ListItem containerStyle={{ backgroundColor: "transparent"}} bottomDivider>
        <ListItem.Content>
          <DiseaseStatusAlert
            diseases={diseases}
            setPositiveModalConfirmVisible={setPositiveModalConfirmVisible}
          />
        </ListItem.Content>
      </ListItem> 
    </ListItem.Accordion>
    {/* Recover */}
    <ListItem.Accordion
      content={
          <>
            <Icon name="add-alert" size={20} color={Colors.accent} />
            <ListItem.Content>
              <ListItem.Title style={[sectionContiner.sectionHeader, { color: Colors.accent }]}>
                Recovery Status Update
              </ListItem.Title>
            </ListItem.Content>
          </>
      }
      topDivider
      containerStyle={{ backgroundColor: "transparent"}}
      isExpanded={isExpandedRecover}
      onPress={() => { 
        setIsExpandedRecover(!isExpandedRecover)
        setIsExpandedDisease(false);
        setisExpandedDelete(false);
      }}
    >
      <ListItem containerStyle={{ backgroundColor: "transparent"}} bottomDivider>
        <ListItem.Content>
          {
            currentReport.length > 0 ? 
            <RecovereyStatusUpdate
              currentReport={currentReport}
              positiveReportDate={positiveReportDate}
              dateAfter14Days={dateAfter14Days}
              setRecoveredModalConfirmVisible={setRecoveredModalConfirmVisible}
            />
            : <Text style={{ fontWeight: "bold", fontSize: 17}}>There are no reports to show.</Text>
          }
        </ListItem.Content>
      </ListItem> 
    </ListItem.Accordion>
    {/* Delete Account */}
    <ListItem.Accordion
      content={
          <>
            <Icon name="delete" size={20} color={Colors.red} />
            <ListItem.Content>
              <ListItem.Title style={[sectionContiner.sectionHeader, { color: Colors.red }]}>
                Delete Account
              </ListItem.Title>
            </ListItem.Content>
          </>
      }
      containerStyle={{ backgroundColor: "transparent"}}
      isExpanded={isExpandedDelete}
      topDivider
      bottomDivider={!isExpandedDelete ? true : false}
      onPress={() => { 
        setIsExpandedDisease(false);
        setIsExpandedRecover(false);
        setisExpandedDelete(!isExpandedDelete)
      }}
    >
      <ListItem containerStyle={{ backgroundColor: "transparent"}} bottomDivider>
        <ListItem.Content>
          <DeleteAccount
            setModalConfirmVisible={setModalConfirmVisible}
          />
        </ListItem.Content>
      </ListItem> 
    </ListItem.Accordion>    
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
            <Text style={[styles.modalText, { color: Colors.red }]}>Health Notice Report</Text>
          </View>
            <View style={{ height: 160, width: '100%', marginBottom: 10, backgroundColor: Colors.lightGrey, borderRadius: 5 }}>
              <Text style={{ marginVertical: 7, marginHorizontal: 10}}>Please Select the disease that you are positive of :</Text>
              <ScrollView >
                {(diseases.filter(disease => {
                    if(currentReport.length > 0) {
                      return currentReport.some(key => { return disease.name !== key.disease })
                    }else {
                      return disease.name
                    }
                  }).map((disease, i) => {
                    return(
                          <CheckBox
                            key={i}
                            title={disease.name}
                            checked={selectedDisease.includes(disease.name) ? true : false}
                            onPress={() => { addDiseaseToList(disease.name) }}
                          />
                    )
                  }))}
              </ScrollView>
            </View>
            {
              selectedDisease.length > 0 && (
              <>
                <Text style={{ fontSize: 15 }}>
                  By clicking <Text style={{ color: Colors.red, fontWeight: "bold"}}>Proceed</Text>, you are stating that you are{' '}
                  <Text style={[{ color: Colors.red, fontWeight: "bold" }]}>Positive of the selected disease/s above</Text>, this will notify the system
                  administrator about your health status. A contact tracing will happen shortly after the upload.
                </Text>
                <Text style={{ fontSize: 15, marginTop: 10 }}>
                  All of YOUR information and visitation history will be collected by the system for health profiling and
                  contact tracing.
                </Text>
                <Text style={{ fontSize: 15, marginTop: 10 }}>
                  If you are unsure of your health status, please visit a health center/hospital for a test first,
                  before you proceed.{' '}
                </Text>
                <Text style={{ color: Colors.red, fontSize: 15, marginTop: 10, fontWeight: "bold" }}>
                  False Information will be met with sanction from the management.
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
                    onPress={() => {
                      setPositiveModalConfirmVisible(!positiveConfirmVisible);
                      setSelectedDisease([]);
                    }}
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
              </>)
            }
        </View>
      </View>
    </Modal>
    {/* Recovery modal */}
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
            <Text style={[styles.modalText, { color: Colors.green }]}>Recovery Status Update</Text>
          </View>
          <View style={{ height: 160, width: '100%', marginBottom: 10, backgroundColor: Colors.lightGrey, borderRadius: 5 }}>
            <Text style={{ marginVertical: 7, marginHorizontal: 10}}>Please select the disease that you <Text style={{ color: Colors.accent, fontWeight: "bold"}}>RECOVERED</Text> from :</Text>
            <ScrollView >
              {
                currentReport.map((disease, i) => {
                  return(
                        <CheckBox
                          key={i}
                          title={disease.disease}
                          checked={recoveredList.includes(disease._id) ? true : false}
                          onPress={() => { addRecoveredList(disease._id) }}
                        />
                  )
                })
              }
            </ScrollView>
          </View>
          <Text style={{ fontSize: 15 }}>
            By clicking this button, you are stating that you are a{' '}
            <Text style={[{ color: Colors.green }]}>Recovered Patient</Text>, this will notify the system
            administrator about your health status.
          </Text>
          <Text style={{ fontSize: 15, marginTop: 10 }}>
            If you are unsure of your health status, please visit a health center/hospital for a test first,
            before you proceed.{' '}
          </Text>
          <Text style={{ color: Colors.red, fontSize: 15, marginTop: 10, fontWeight: "bold" }}>
            False Information will be met with sanction from the management.
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
              onPress={() => {
                setRecoveredModalConfirmVisible(!recoveredConfirmVisible);
                setRecoveredList([]);
              }}
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
    {/* confirm modal for deletion of account */}
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
              By deleting your account all data stored in your mobile device will be lost, contact tracing logs of your account from the system database will be deleted after a <Text style={{ fontWeight: "bold", color: Colors.red}}>14 day period</Text>. After completing the deletion
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
  diseaseList : {
    fontSize: 17,
    marginTop: 4, 
    marginLeft: 4, 
    fontWeight: "bold", 
    color: "red", 
  }
});

export default SettingsScreen;

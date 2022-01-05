import React, { useState } from 'react';
// native components
import { Text, View, Modal, TouchableOpacity, StyleSheet, BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// stylesheet
import { displayFormContainer, landingPagesOrientation, sectionContiner } from '../../styles/styles-screens';
import { Colors } from '../../styles/styles-colors';
import CustomButton from '../../_utils/CustomButton';

const SettingsScreen = () => {
  const [message, setMessage] = useState('');
  const [modalConfirmVisible, setModalConfirmVisible] = useState(false);

  // reset everything
  const clearAsyncStorageData = async () => {
    try {
      await AsyncStorage.clear();
      BackHandler.exitApp();
    } catch (error) {
      setMessage('Failed to clear data');
      console.log(error);
    }
  };

  return (
    <View style={landingPagesOrientation.container}>
      <Text style={displayFormContainer.formsHeader}>Settings</Text>
      <View style={sectionContiner.section}>
        <Text style={sectionContiner.sectionHeader}>Upload your Location History</Text>
        <Text style={sectionContiner.sectionDescription}>
          If you are diagnosed with COVID-19, please upload your location history to alert the community of a possible
          contact. If not done immediately, an authorized person from the university will obligate you to upload your
          location history.
        </Text>
        <CustomButton title="Upload" color={Colors.primary} textColor="white" onPress={() => clearAsyncStorageData()} />
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

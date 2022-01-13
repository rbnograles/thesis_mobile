import React, { useState, useEffect } from 'react';
// native components
import { Text, View, Dimensions, StyleSheet, Modal, TouchableOpacity, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import SvgQRCode from 'react-native-qrcode-svg';
import SwitchSelector from 'react-native-switch-selector';
// stylesheet
import { landingPagesOrientation } from '../../styles/styles-screens';
import { Colors } from '../../styles/styles-colors';
import CustomButton from '../../_utils/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import { _setThisPageToCompleted } from '../../_storages/_state_process';

const QRCodeScreen = () => {
  const [renderStatus, setRenderStatus] = useState('0');
  const [hasPermissions, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [location, setLocation] = useState('Not yet scanned');
  const [qrCodeID, setQRCodeID] = useState('');
  const [visitationHistroy, setVisitationHistroy] = useState([]);
  const [renderQR, setRenderQR] = useState(false);
  const [modalConfirmVisible, setModalConfirmVisible] = useState(false);

  const options = [
    { label: 'Your QR Code', value: '0' },
    { label: 'Scan A Place', value: '1' },
  ];

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  };

  const _getGeneratedQRId = async () => {
    try {
      // fetch the user random id saved on the mobile data
      const value = await AsyncStorage.getItem('@userRandomeQRID');
      // checks if there is a saved data
      if (value !== null) {
        // value previously stored
        setQRCodeID(value);
        setRenderQR(true);
      }
    } catch (error) {
      // error reading value
      setQRCodeID('');
      console.log(error);
    }
  };

  const _getVisitationHistroy = async () => {
    try {
      // fetch the user visitation history saved from the local storage
      const value = await AsyncStorage.getItem('@userVisitationHistory');
      // parse the data
      const parsedValue = JSON.parse(value);
      setVisitationHistroy(parsedValue);
    } catch (error) {
      setVisitationHistroy(null);
      Alert.alert(
        'Error',
        'Something went wrong while getting the visitation history',
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

  // request camera permission
  useEffect(() => {
    // get the data of all visitations history
    _getVisitationHistroy();
    // ask for camera permissions
    askForCameraPermission();
    // generations of random user id
    _getGeneratedQRId();

    console.log(visitationHistroy.length);
  }, []);

  // what happens when we scan the bar code
  const handlerBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setLocation(data);
    setModalConfirmVisible(true);

    // saving scanned history script starts here
    // get the current date
    if (visitationHistroy.length > 0) {
      // proceed with checking of the data
    } else {
      const newVisitation = [
        {
          date: new Date().toISOString().split('T')[0],
          visitation: [
            {
              location: data,
              time: new Date().toLocaleTimeString(),
              action: 'Scanned the QR Code',
            },
          ],
        },
      ];

      const stringfyData = JSON.stringify(newVisitation);
      // this will set the initial storing of the data in the states
      setVisitationHistroy(newVisitation);
      // this will save the user's visittation logs on to the mobile phone locally
      _setThisPageToCompleted('@userVisitationHistory', stringfyData);
    }
    // build a new object
    // check all save history if there is currently a date today that is saved
    // if there is a current date -> insert the scanned data on the visitation's array
    // else create a new instance of that data
  };

  // what happens when user leaves the event place
  const handleLeavingEventPlace = () => {
    if (visitationHistroy.length > 0) {
      // check if there is a current date present
    }
  };

  return (
    <View style={landingPagesOrientation.container}>
      {/* This section will render the users QR Code Scanner Screen */}
      {renderStatus === '1' && (
        <>
          {!hasPermissions && (
            <View style={{ justifyContent: 'center', marginHorizontal: 35, marginVertical: '50%' }}>
              <Text style={{ textAlign: 'center', fontSize: 20, marginBottom: 20, fontWeight: '700' }}>
                No camera permission!
              </Text>
              <CustomButton
                color={Colors.primary}
                textColor="white"
                title="Allow Camera"
                onPress={() => askForCameraPermission()}
              />
            </View>
          )}
          {hasPermissions && (
            <>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 20, fontWeight: '700', color: Colors.primary }}>
                  Place the QR Code in front of the camera
                </Text>
              </View>
              <View style={{ marginTop: -50 }}>
                <View style={styles.barcodebox}>
                  <BarCodeScanner
                    style={{
                      height: Dimensions.get('window').height - 70,
                      width: Dimensions.get('window').width - 70,
                    }}
                    onBarCodeScanned={scanned ? undefined : handlerBarCodeScanned}
                  />
                </View>
                <CustomButton
                  title={scanned ? 'Scan QR Code Again' : 'Scanning...'}
                  color={Colors.primary}
                  textColor="white"
                  onPress={() => {
                    setScanned(false);
                  }}
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
                  <View style={[styles.modalView]}>
                    <View>
                      <Text style={[styles.modalText, { marginBottom: 20 }]}>Data has been recorded!</Text>
                    </View>
                    <FontAwesome name="check-circle" color={Colors.accent} size={100} />
                    <View>
                      <Text style={styles.modalText}>You have scanned the venue</Text>
                    </View>
                    <Text style={styles.locationText}>{location}</Text>
                    <View
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                        marginTop: 15,
                      }}
                    >
                      {/* leave button */}
                      <TouchableOpacity
                        style={{ width: '100%' }}
                        onPress={() => {
                          handleLeavingEventPlace();
                          setModalConfirmVisible(!modalConfirmVisible);
                        }}
                      >
                        <View
                          style={{
                            backgroundColor: Colors.accent,
                            height: 50,
                            marginLeft: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 3,
                          }}
                        >
                          <Text style={{ fontSize: 16, fontWeight: '700', color: 'white' }}>Leave</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </>
          )}
        </>
      )}
      {/* This section has a logic of which if the render status is 0 it will render the users QR Code */}
      {renderStatus === '0' && (
        <>
          <View style={{ alignItems: 'center', marginBottom: 30 }}>
            <Text style={{ fontSize: 24, fontWeight: '700', color: Colors.primary }}>Scan QR Code</Text>
          </View>
          {renderQR && (
            <SvgQRCode
              size={Dimensions.get('window').width - 70}
              value={qrCodeID}
              logo={require('../../assets/icon-jb.png')}
            />
          )}
        </>
      )}
      <SwitchSelector
        options={options}
        style={{ width: '100%', position: 'absolute', bottom: 50, marginHorizontal: 40 }}
        textColor={Colors.primary} //'#7a44cf'
        selectedColor={'white'}
        buttonColor={Colors.accent}
        borderColor={Colors.primary}
        initial={0}
        onPress={value => setRenderStatus(value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  barcodebox: {
    marginBottom: 20,
    height: 500,
    width: 500,
    margin: 0,
    overflow: 'hidden',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#000000AA',
  },
  locationText: {
    color: Colors.primary,
    fontSize: 25,
    fontWeight: '700',
    marginBottom: 10,
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
    marginTop: 25,
    marginBottom: 10,
    fontWeight: '700',
    width: '100%',
  },
});

export default QRCodeScreen;

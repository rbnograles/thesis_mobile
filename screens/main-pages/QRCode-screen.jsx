import React, { useState, useEffect } from 'react';
// native components
import { Text, View, Dimensions, StyleSheet, Modal, TouchableOpacity, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import SvgQRCode from 'react-native-qrcode-svg';
import SwitchSelector from 'react-native-switch-selector';
// stylesheet
import CustomButton from '../../_utils/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { landingPagesOrientation } from '../../styles/styles-screens';
import { Feather } from '@expo/vector-icons';
import { Colors } from '../../styles/styles-colors';
import { FontAwesome } from '@expo/vector-icons';
import { checkInternetConnection } from '../../_utils/CheckIfConnectedToInternet';
import { _setThisPageToCompleted } from '../../_storages/_state_process';

// apis
import { createUserVisitationHistroy } from '../../apis/qr-code-visitation';

const QRCodeScreen = () => {
  // states
  const [connectedToNet, setConnectedToNet] = useState(false);
  const [renderStatus, setRenderStatus] = useState('0');
  const [hasPermissions, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [location, setLocation] = useState('');
  const [qrCodeID, setQRCodeID] = useState('');
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
    }
  };

  // @auto execute upon screen
  useEffect(() => {
    checkInternetConnection().then(res => setConnectedToNet(res));
    // ask for camera permissions
    askForCameraPermission();
    // generations of random user id
    _getGeneratedQRId();
  }, []);

  // what happens when we scan the bar code
  const handlerBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setLocation(data);
    setModalConfirmVisible(true);
    // saving scanned history script starts here
    const date = new Date().toISOString().split('T')[0];
    const record = {
      location: data,
      time: new Date().toLocaleTimeString(),
      action: 'Scanned the QR Code',
    };
    // this will run the api call
    try {
      await createUserVisitationHistroy({ ...record, userId: qrCodeID, date: date });
    } catch (error) {
      Alert.alert(
        'Scanning Failed',
        error.response,
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

  // what happens when user leaves the event place
  const handleLeavingEventPlace = async () => {
    const date = new Date().toISOString().split('T')[0];
    // construct leaving visitation object
    const leaveRecord = {
      location: location, // name of the location
      time: new Date().toLocaleTimeString(), // time
      action: "Left the venue", // event description
    };
    try {
      await createUserVisitationHistroy({ ...leaveRecord, userId: qrCodeID, date: date });
    } catch (error) {
      Alert.alert(
        'Scanning Failed',
        error.response,
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

  return (
    <View style={landingPagesOrientation.container}>
      {
        // This section will render the users QR Code Scanner Screen
        renderStatus === '1' && (
        <>
          {
            connectedToNet ? (
              <>
                {
                  // render when the app is installed the first time
                  !hasPermissions && (
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
                  )
                }
                {
                  // render if the app has the camera permission
                  hasPermissions && (
                    <>
                      <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: '700', color: Colors.primary }}>
                          Place the QR Code in front of the camera
                        </Text>
                      </View>
                      <View style={{ marginTop: -50 }}>
                        <View style={styles.barcodebox}>
                          {
                            console.log(scanned)
                          }
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
                  )
                }
              </>
            ) 
            : 
              <>
                <View
                  style={[
                    landingPagesOrientation.textContainer,
                    landingPagesOrientation.textContaineredCenter,
                    landingPagesOrientation.otpContianer,{
                      marginTop: "40%",
                      marginBottom: 20
                    }
                  ]}
                >
                  <Feather name="wifi-off" size={90} color={Colors.primary} />
                  <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 17, fontWeight: '700' }}>
                    Please make sure that you are connected to a stable internet connection in order to continue.
                  </Text>
                </View>
                <CustomButton
                  title="Reload page"
                  color={'grey'}
                  textColor={Colors.lightGrey}
                  onPress={() => checkInternetConnection().then(res => setConnectedToNet(res))}
                />
              </>
          }
        </>
      )}
      {/* This section has a logic of which if the render status is 0 it will render the users QR Code */}
      {renderStatus === '0' && (
        <>
          <View style={{ alignItems: 'center', marginBottom: 30 }}>
            <Text style={{ fontSize: 24, fontWeight: '700', color: Colors.primary }}>Scan My QR Code</Text>
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

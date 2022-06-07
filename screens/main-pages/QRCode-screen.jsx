import React, { useState, useEffect, useRef } from 'react';
// native components
import { Text, View, Dimensions, Alert, AppState, PixelRatio, BackHandler } from 'react-native';
import { Camera } from 'expo-camera';

import SwitchSelector from 'react-native-switch-selector';
// stylesheet
import CustomButton from '../../_utils/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { landingPagesOrientation } from '../../styles/styles-screens';
import { Colors } from '../../styles/styles-colors';
import { checkInternetConnection } from '../../_utils/CheckIfConnectedToInternet';
import { _setThisPageToCompleted } from '../../_storages/_state_process';
// apis
import { createUserVisitationHistroy } from '../../apis/qr-code-visitation';
import QRScanner from './QRComponents/QRScanner';
import QRCodeGenerator from './QRComponents/QRCodeGenerator';
import NoInternetConnection from './QRComponents/NoInternetConnection';
import ScanConfirmModal from './QRComponents/ScanConfirmModal';
import LeaveRecord from './QRComponents/LeaveRecord';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const scale = SCREEN_WIDTH / 320;

const QRCodeScreen = () => {
  
  const appState = useRef(AppState.currentState);
  // states
  const [connectedToNet, setConnectedToNet] = useState(false);
  const [renderStatus, setRenderStatus] = useState('0');
  const [hasPermissions, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [location, setLocation] = useState('');
  const [qrCodeID, setQRCodeID] = useState('');
  const [renderQR, setRenderQR] = useState(false);
  const [modalConfirmVisible, setModalConfirmVisible] = useState(false);
  const [hasCurrentLocation, setHasCurrentLocation] = useState(false);
 
  const options = [
    { label: 'Your QR Code', value: '0' },
    { label: 'Scan A Place', value: '1' },
  ];

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
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

  const _checkIfTheUserHasCurrentLocation = async () => {
    const data = await AsyncStorage.getItem('@currentScannedLocation');
    if(data) {
      setRenderStatus('1')
      setLocation(data);
      setHasCurrentLocation(true);
      setScanned(true);
    }
  }

  // what happens when we scan the bar code
  const handlerBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setLocation(data);
    setModalConfirmVisible(true);
    // saving scanned history script starts here
    const date = new Date().toISOString().split('T')[0];
    const time = new Date().toLocaleTimeString().split(':');
    // This will saved the scanned location locally on the mobile for reference
    // this will help the system to know if the users visitation status
    await AsyncStorage.setItem('@currentScannedLocation', data);
    const record = {
      location: data,
      time: `${time[0]}:${time[1]}`,
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
    const time = new Date().toLocaleTimeString().split(':');
    // construct leaving visitation object
    const leaveRecord = {
      location: location, // name of the location
      time: `${time[0]}:${time[1]}`, // time
      action: "Left the venue", // event description
    };
    try {
      await createUserVisitationHistroy({ ...leaveRecord, userId: qrCodeID, date: date });
      await AsyncStorage.removeItem('@currentScannedLocation');
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

  const normalize = (size) => {
    const newSize = size * scale 
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }

  // handles back button
  const disableBackButton = () => {
    BackHandler.exitApp();
    return true;
  };

  // @auto execute upon screen
  useEffect(() => {
    // ask for camera permissions
    askForCameraPermission();
     // this will run uppon clicking the back button of the phone
    BackHandler.addEventListener('hardwareBackPress', disableBackButton);
    // main function stuffs
    _checkIfTheUserHasCurrentLocation();
    // check if there is internet connection
    checkInternetConnection().then(res => setConnectedToNet(res));
    // generations of random user id
    _getGeneratedQRId();
    // check if the user has a scanned location already
    AppState.addEventListener("change", nextAppState => {
      if (appState.current.match(/inactive|background/) && nextAppState === "active") {
        _checkIfTheUserHasCurrentLocation();
      }
        appState.current = nextAppState;
    });
  }, []);

  return (
    <View style={landingPagesOrientation.container2}>
      {
        // This section will render the users QR Code Scanner Screen
        renderStatus === '1' && (
        <>
          {
            connectedToNet ? (<>
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
                  hasPermissions && 
                  <>
                    <LeaveRecord
                      hasCurrentLocation={hasCurrentLocation}
                      handleLeavingEventPlace={handleLeavingEventPlace}
                      setHasCurrentLocation={setHasCurrentLocation}
                      location={location}
                    />
                    <QRScanner
                      scanned={scanned}
                      hasCurrentLocation={hasCurrentLocation}
                      handlerBarCodeScanned={handlerBarCodeScanned}
                      normalize={normalize}
                      checkInternetConnection={checkInternetConnection}
                      setConnectedToNet={setConnectedToNet}
                      setScanned={setScanned}
                    />
                    <ScanConfirmModal
                      setModalConfirmVisible={setModalConfirmVisible}
                      modalConfirmVisible={modalConfirmVisible}
                      location={location}
                      handleLeavingEventPlace={handleLeavingEventPlace}
                      setHasCurrentLocation={setHasCurrentLocation}
                      hasCurrentLocation={hasCurrentLocation}
                    />
                  </>
                }
              </>) 
            : 
              <NoInternetConnection
                setConnectedToNet={setConnectedToNet}
              />
          }
        </>
      )}
      {/* This section has a logic of which if the render status is 0 it will render the users QR Code */}
      <QRCodeGenerator
        renderStatus={renderStatus}
        qrCodeID={qrCodeID}
        renderQR={renderQR}
        normalize={normalize}
      />
      <View style={{ width: '100%', paddingHorizontal: 35, position: 'absolute', bottom: 50 }}>
        <SwitchSelector
          options={options}
          textColor={Colors.primary} //'#7a44cf'
          selectedColor={'white'}
          buttonColor={Colors.accent}
          borderColor={Colors.primary}
          initial={Number(renderStatus)}
        onPress={value => setRenderStatus(value)}
      />
      </View>
    </View>
  );
};

export default QRCodeScreen;

import React, { useState, useEffect } from 'react';
// native components
import { Text, View, Dimensions, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import SvgQRCode from 'react-native-qrcode-svg';
import SwitchSelector from 'react-native-switch-selector';
// stylesheet
import { landingPagesOrientation } from '../../styles/styles-screens';
import { Colors } from '../../styles/styles-colors';
import CustomButton from '../../_utils/CustomButton';

const QRCodeScreen = () => {
  const [renderStatus, setRenderStatus] = useState('0');
  const [hasPermissions, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned');

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  };

  const options = [
    { label: 'Your QR Code', value: '0' },
    { label: 'Scan A Place', value: '1' },
  ];

  // request camera permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // what happens when we scan the bar code
  const handlerBarCodeScanned = ({ type, data }: any) => {
    setScanned(true);
    setText(data);
    console.log('Type: ' + type + '\nData: ' + data);
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
                  title="Scan Again"
                  color={Colors.primary}
                  textColor="white"
                  onPress={() => setScanned(false)}
                />
              </View>
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
          <SvgQRCode
            size={Dimensions.get('window').width - 70}
            value="Ano yan kaibigan :D"
            logo={require('../../assets/landing-page-2.png')}
          />
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
        onPress={(value: any) => setRenderStatus(value)}
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
});

export default QRCodeScreen;

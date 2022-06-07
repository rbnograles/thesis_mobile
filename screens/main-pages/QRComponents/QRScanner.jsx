import React from 'react';
import { Text, View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Colors } from '../../../styles/styles-colors';
import CustomButton from '../../../_utils/CustomButton';

const QRScanner = ({ 
    hasCurrentLocation, 
    handlerBarCodeScanned, 
    scanned,
    setScanned,
    normalize, 
    checkInternetConnection,
    setConnectedToNet 
}) => {
    return (
        <>
            {// Bar code scanner ui
            !hasCurrentLocation && (
                <View 
                style={{
                    flex: 1
                }}>
                    <BarCodeScanner
                    style={{
                        height: "100%",
                        width: "100%"
                    }}
                    onBarCodeScanned={scanned ? undefined : handlerBarCodeScanned}
                    >
                    <Text style={{ textAlign: "center", fontSize: normalize(17), fontWeight: '700', color: "white", marginTop: 20 }}>
                        Place the QR Code in front of the camera
                    </Text>
                    <View style={{  width: '100%', paddingHorizontal: 35, position: 'absolute', bottom: 150 }}>
                        <CustomButton
                        title={scanned ? 'Scan Again' : 'Scanning...'}
                        color={Colors.primary}
                        textColor="white"
                        onPress={() => {
                            setScanned(false);
                            checkInternetConnection().then(res => setConnectedToNet(res));
                        }}
                        />
                        </View>
                    </BarCodeScanner>
                </View>
            )}
        </>
    );
}

export default QRScanner;

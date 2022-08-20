import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
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
                    flex: 1,
                }}>
                    <Camera
                    ratio='16:9'
                    style={StyleSheet.absoluteFillObject}
                    onBarCodeScanned={scanned ? undefined : handlerBarCodeScanned}
                    >
                    <Text 
                        style={{ 
                            textAlign: "center", 
                            fontSize: 21, 
                            fontWeight: '700', 
                            color: "white", 
                            marginTop: 60 
                        }}
                    >
                        Place the QR Code in front of the Camera
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
                    </Camera>
                </View>
            )}
        </>
    );
}

export default QRScanner;

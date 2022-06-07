import React from 'react';
import SvgQRCode from 'react-native-qrcode-svg';
import { Text, View, Dimensions } from 'react-native';
import { Colors } from '../../../styles/styles-colors';

const QRCodeGenerator = ({ renderStatus, normalize, qrCodeID, renderQR }) => {
    return (
        <>
            {renderStatus === '0' && (
                <>
                    <View style={{ alignItems: 'center', marginBottom: 20, marginTop: 30 }}>
                        <Text style={{ fontSize: 30, fontWeight: '700', color: Colors.primary }}>Scan My QR Code</Text>
                    </View>
                    {
                        renderQR && 
                        (<View style={{ paddingHorizontal: 35, marginBottom: 20  }}>
                            <SvgQRCode
                                size={Dimensions.get('window').width - 70}
                                value={qrCodeID}
                            />
                        </View>)
                    }
                    <Text style={{ fontSize: normalize(17), fontWeight: '700', color: Colors.primary, textAlign: "center", marginHorizontal: 20  }}>
                        You may present this to the personnel in charge for them to scan and record your visitation.
                    </Text>
                </>
            )}
        </>
    );
};

export default QRCodeGenerator;

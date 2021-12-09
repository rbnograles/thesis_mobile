import React, { useState } from 'react';
// native components
import { Text, View, Dimensions } from 'react-native';
import SvgQRCode from 'react-native-qrcode-svg';
import SwitchSelector from 'react-native-switch-selector';
// stylesheet
import { landingPagesOrientation } from '../../styles/styles-screens';
import { Colors } from '../../styles/styles-colors';

const QRCodeScreen = ({ navigation }: any) => {
  const options = [
    { label: 'Scan A Place', value: '0' },
    { label: 'Your QR Code', value: '1' },
  ];

  return (
    <View style={landingPagesOrientation.container}>
      <View style={{ alignItems: 'center', marginBottom: 30 }}>
        <Text style={{ fontSize: 24, fontWeight: '700' }}>Scan the QR Code</Text>
      </View>
      <SvgQRCode
        size={Dimensions.get('window').width - 70}
        value="Just some string value"
        logo={require('../../assets/landing-page-2.png')}
      />
      <SwitchSelector
        options={options}
        style={{ width: '100%', position: 'absolute', bottom: 50, marginHorizontal: 40 }}
        textColor={Colors.primary} //'#7a44cf'
        selectedColor={'white'}
        buttonColor={Colors.accent}
        borderColor={Colors.primary}
        initial={0}
        onPress={value => console.log(`Call onPress with value: ${value}`)}
      />
    </View>
  );
};

export default QRCodeScreen;

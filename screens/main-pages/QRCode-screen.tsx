import React, { useState } from 'react';
// native components
import { Text, View } from 'react-native';
import SvgQRCode from 'react-native-qrcode-svg';
// stylesheet
import { landingPagesOrientation } from '../../styles/styles-screens';

const QRCodeScreen = ({ navigation }: any) => {
  return (
    <View style={landingPagesOrientation.container}>
      <Text>Hello</Text>
      <SvgQRCode size={200} value="Just some string value" logo={require('../../assets/landing-page-1.png')} />
    </View>
  );
};

export default QRCodeScreen;

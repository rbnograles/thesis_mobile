import React, { useState } from 'react';
// native components
import { Text, View, Dimensions } from 'react-native';
import SvgQRCode from 'react-native-qrcode-svg';
// stylesheet
import { landingPagesOrientation } from '../../styles/styles-screens';

const QRCodeScreen = ({ navigation }: any) => {
  return (
    <View style={landingPagesOrientation.container}>
      <SvgQRCode
        size={Dimensions.get('window').width - 70}
        value="Just some string value"
        logo={require('../../assets/landing-page-2.png')}
      />
    </View>
  );
};

export default QRCodeScreen;

import React from 'react';
// native components
import { Text, SafeAreaView, View, Image } from 'react-native';
import { Colors } from '../../styles/styles-colors';
// stylesheet
import { landingPagesOrientation, buttonOrientation, pageCenteredImage } from '../../styles/styles-screens';
// components
import CustomButton from '../../_utils/CustomButton';

const ScanQRScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={[landingPagesOrientation.container, landingPagesOrientation.darkPrimaryBackgroundColor]}>
      <View style={pageCenteredImage.container}>
        <Image
          source={require('../../assets/landing-page-3.png')}
          style={[pageCenteredImage.image, { marginTop: 60 }]}
        />
      </View>
      <View style={[landingPagesOrientation.textContainer, landingPagesOrientation.textContaineredCenter]}>
        <Text style={[landingPagesOrientation.header, { color: 'white' }]}>Scan QR Code</Text>
        <Text style={[landingPagesOrientation.subHeader, { color: 'white', textAlign: 'center' }]}>
          Scan QR Code upon arriving to your destination or let your QR Code be scanned by an authorized person of the
          university.
        </Text>
      </View>
      <View style={buttonOrientation.landingButtonOrientation}>
        <CustomButton
          title="Continue"
          color="white"
          textColor={Colors.primary}
          onPress={() => navigation.navigate('LocationHistoryScreen')}
        />
      </View>
    </SafeAreaView>
  );
};

export default ScanQRScreen;

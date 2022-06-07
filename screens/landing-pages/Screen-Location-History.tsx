import React from 'react';
// native components
import { StackActions } from '@react-navigation/native';
import { Text, SafeAreaView, View, Image } from 'react-native';
import { Colors } from '../../styles/styles-colors';
// stylesheet
import { landingPagesOrientation, buttonOrientation, pageCenteredImage } from '../../styles/styles-screens';
// components
import CustomButton from '../../_utils/CustomButton';

const LocationHistoryScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={[landingPagesOrientation.container, landingPagesOrientation.primaryBackgroundColor]}>
      <View style={pageCenteredImage.container}>
        <Image
          source={require('../../assets/landing-page-4.png')}
          style={[pageCenteredImage.image, { marginTop: 60 }]}
        />
      </View>
      <View style={[landingPagesOrientation.textContainer, landingPagesOrientation.textContaineredCenter]}>
        <Text style={[landingPagesOrientation.header, { color: 'white' }]}>Location History</Text>
        <Text style={[landingPagesOrientation.subHeader, { color: 'white', textAlign: 'center' }]}>
          Upon scanning, the visitation history log will be saved to your location history. Collected data will only be
          saved to your mobile device. Only the trace id will be stored for contact tracing purposes.
        </Text>
      </View>
      <View style={buttonOrientation.landingButtonOrientation}>
        <CustomButton
          title="Continue"
          color="white"
          textColor={Colors.primary}
          onPress={() => navigation.dispatch(StackActions.replace('SignInWithMobileScreen'))}
        />
      </View>
    </SafeAreaView>
  );
};

export default LocationHistoryScreen;

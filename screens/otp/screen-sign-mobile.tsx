import React from 'react';
// native components
import { Text, SafeAreaView, View, Image } from 'react-native';
import { Colors } from '../../styles/styles-colors';
// stylesheet
import { landingPagesOrientation, buttonOrientation, pageCenteredImage } from '../../styles/styles-screens';
// components
import CustomButton from '../../_utils/CustomButton';

const SignInWithMobileScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={[landingPagesOrientation.container]}>
      <View style={pageCenteredImage.container}>
        <Image source={require('../../assets/landing-page-4.png')} style={pageCenteredImage.image} />
      </View>
      <View style={[landingPagesOrientation.textContainer, landingPagesOrientation.textContaineredCenter]}>
        <Text>Continue with your mobile number</Text>
      </View>
      <View style={buttonOrientation.landingButtonOrientation}>
        <CustomButton
          title="Continue"
          color="white"
          textColor={Colors.primary}
          onPress={() => navigation.navigate('Next Page')}
        />
      </View>
    </SafeAreaView>
  );
};

export default SignInWithMobileScreen;

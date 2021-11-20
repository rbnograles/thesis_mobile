import React from 'react';
// native components
import { Text, SafeAreaView, View, Image } from 'react-native';
import { Colors } from '../../styles/styles-colors';
// stylesheet
import { landingPagesOrientation, buttonOrientation, pageCenteredImage } from '../../styles/styles-screens';
// components
import CustomButton from '../../_utils/CustomButton';

const SafetyScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={[landingPagesOrientation.container, landingPagesOrientation.primaryBackgroundColor]}>
      <View style={pageCenteredImage.container}>
        <Image
          source={require('../../assets/landing-page-2.png')}
          style={[pageCenteredImage.image, { marginTop: 60 }]}
        />
      </View>
      <View style={[landingPagesOrientation.textContainer, landingPagesOrientation.textContaineredCenter]}>
        <Text style={[landingPagesOrientation.header, { color: 'white' }]}>Safety</Text>
        <Text style={[landingPagesOrientation.subHeader, { color: 'white', textAlign: 'center' }]}>
          We want to assure you that your privacy is not sacrificed ti ensure your safety. To overcome this pandemic,
          let us cooperate and help the nation by providing the correct information.
        </Text>
      </View>
      <View style={buttonOrientation.landingButtonOrientation}>
        <CustomButton
          title="Continue"
          color="white"
          textColor={Colors.primary}
          onPress={() => navigation.navigate('QRScreen')}
        />
      </View>
    </SafeAreaView>
  );
};

export default SafetyScreen;

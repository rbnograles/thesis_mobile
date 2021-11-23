import React from 'react';
// native components
import { Text, SafeAreaView, View, Image } from 'react-native';
import { Colors } from '../../styles/styles-colors';
// stylesheet
import { landingPagesOrientation, buttonOrientation, pageCenteredImage } from '../../styles/styles-screens';
// components
import CustomButton from '../../_utils/CustomButton';
import { _setThisPageToCompleted } from '../../_storages/_state_process';

const SuccessPromptScreen = ({ navigation }: any) => {
  const setThisPageToComplete = () => {
    _setThisPageToCompleted('@successWelcomePage', 'true');
    navigation.navigate('ProfileSetUp');
  };

  return (
    <SafeAreaView style={[landingPagesOrientation.container]}>
      <View style={pageCenteredImage.container}>
        <Image
          source={require('../../assets/celebration-image.png')}
          style={[pageCenteredImage.image, { marginTop: 60 }]}
        />
      </View>
      <View style={[landingPagesOrientation.textContainer, landingPagesOrientation.textContaineredCenter]}>
        <Text style={[landingPagesOrientation.header]}>Welcome!</Text>
        <Text style={[landingPagesOrientation.subHeader, { textAlign: 'center' }]}>
          Thank you for installing <Text style={[{ color: Colors.primary, fontWeight: '700' }]}>JuanBreath</Text>. To
          use all the features of the app and fully setup your account, you can start by setting up your profile.
        </Text>
      </View>
      <View style={buttonOrientation.landingButtonOrientation}>
        <CustomButton
          title="Start Setup"
          color={Colors.primary}
          textColor="white"
          onPress={() => setThisPageToComplete()}
        />
      </View>
    </SafeAreaView>
  );
};

export default SuccessPromptScreen;

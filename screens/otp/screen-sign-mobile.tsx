import React from 'react';
// native components
import { Text, SafeAreaView, View, TextInput, StyleSheet } from 'react-native';
import { Colors } from '../../styles/styles-colors';
// stylesheet
import { landingPagesOrientation, buttonOrientation } from '../../styles/styles-screens';
// components
import CustomButton from '../../_utils/CustomButton';

const SignInWithMobileScreen = ({ navigation }: any) => {
  const [number, onChangeNumber] = React.useState('');

  return (
    <SafeAreaView style={[landingPagesOrientation.container]}>
      <View style={[landingPagesOrientation.textContainer, landingPagesOrientation.textContaineredCenter]}>
        <Text>Continue with your mobile number</Text>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="09 *** *** ***"
        keyboardType="numeric"
      />
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

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default SignInWithMobileScreen;

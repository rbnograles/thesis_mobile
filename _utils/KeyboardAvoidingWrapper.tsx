import React from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Colors } from '../modules/styles/Colors';

const { primary } = Colors;

/**
 *
 * @param children this will accepet any JSX Paramenets as children of the keyboard avoiding view
 * @returns
 */
const KeyboardAvoidingWrapper = ({ children }: any) => {
  // this will ensure that the keyboard ui will adjust to the view port of the user
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: primary }}>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>{children}</TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingWrapper;

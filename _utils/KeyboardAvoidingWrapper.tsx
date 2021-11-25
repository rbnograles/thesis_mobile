import React from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';

/**
 *
 * @param children this will accepet any JSX Paramenets as children of the keyboard avoiding view
 * @returns
 */
const KeyboardAvoidingWrapper = ({ children }: any) => {
  // this will ensure that the keyboard ui will adjust to the view port of the user
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>{children}</TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default KeyboardAvoidingWrapper;

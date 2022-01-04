import React from 'react';
// native components
import { View, TextInput } from 'react-native';
// stylesheet
import { inputs } from '../styles/styles-screens';
// custom components
import Label from './Label';

const CustomInputs = ({ labelTitle, onBlur, onChangeText, value, placeHolder, required }: any) => {
  return (
    <View style={{ marginTop: 5, marginBottom: 5 }}>
      <Label title={labelTitle} required={required} />
      <TextInput
        onChangeText={onChangeText}
        placeholder={placeHolder}
        style={inputs.style}
        onBlur={onBlur}
        value={value}
        keyboardType={labelTitle === 'Mobile Number' ? 'numeric' : 'default'}
        maxLength={labelTitle === 'Mobile Number' ? 11 : 100}
      />
    </View>
  );
};

export default CustomInputs;

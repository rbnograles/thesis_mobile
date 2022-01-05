import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const CustomButton = (props: any) => {
  const content = (
    <View style={[style.button, { backgroundColor: props.color }]}>
      <Text style={[style.text, { color: props.textColor }]}>{props.title}</Text>
    </View>
  );

  return <TouchableOpacity onPress={props.onPress}>{content}</TouchableOpacity>;
};

const style = StyleSheet.create({
  button: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
  },
});

export default CustomButton;

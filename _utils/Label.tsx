import React from 'react';
// native components
import { Text, View } from 'react-native';
import { Colors } from '../styles/styles-colors';

const Label = ({ title, required }: any) => {
  return (
    <View>
      <Text>
        {title} <Text style={{ color: Colors.red }}>{required && '*'}</Text>
      </Text>
    </View>
  );
};

export default Label;

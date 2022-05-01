import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Colors } from '../styles/styles-colors';

const Loader = () => (
  <View>
    <ActivityIndicator size="large" color={Colors.primary} />
  </View>
);

export default Loader;

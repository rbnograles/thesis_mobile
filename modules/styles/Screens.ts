import { StyleSheet, StatusBar } from 'react-native';
import { Colors } from './Colors';

export const landingPagesOrientation = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginTop: 120,
    marginHorizontal: 35,
  },
  header: {
    fontSize: 35,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'normal',
    marginTop: 25,
    color: Colors.textColor,
  },
});

export const agreementCheckBoxContainer = StyleSheet.create({
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: 0,
    marginTop: 60,
  },
  containerStyle: {
    borderColor: 'white',
    margin: 0,
    padding: 0,
    marginTop: 0,
  },
  label: {
    margin: 0,
    marginLeft: 0,
    fontSize: 14,
  },
});

export const buttonOrientation = StyleSheet.create({
  landingButtons: {
    backgroundColor: Colors.primary,
    marginTop: 250,
    height: 50,
  },
});

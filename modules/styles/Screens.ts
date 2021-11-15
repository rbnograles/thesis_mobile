import { StyleSheet, StatusBar } from 'react-native';
import { Colors } from './Colors';

export const landingPagesOrientation = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginTop: 120,
    marginHorizontal: 37,
  },
  header: {
    fontSize: 29,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'normal',
    marginTop: 25,
    color: Colors.textColor,
  },
});

export const agreementCheckBoxContainer = StyleSheet.create({
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 60,
  },
  containerStyle: {
    borderColor: 'white',
    margin: 0,
    padding: 0,
    marginTop: 5,
  },
  label: {
    margin: 0,
    marginLeft: 0,
  },
});

export const buttonOrientation = StyleSheet.create({
  landingButtons: {
    backgroundColor: Colors.primary,
    marginTop: 220,
    height: 50,
  },
});

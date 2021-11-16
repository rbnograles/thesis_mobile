import { StyleSheet, StatusBar } from 'react-native';
import { Colors } from './styles-colors';

export const landingPagesOrientation = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginTop: 120,
    marginHorizontal: 35,
    position: 'relative',
  },
  header: {
    fontSize: 35,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  subHeader: {
    fontSize: 22,
    fontWeight: 'normal',
    marginTop: 30,
    color: Colors.textColor,
  },
});

export const agreementCheckBoxContainer = StyleSheet.create({
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    margin: 0,
    position: 'absolute',
    bottom: 150,
  },
  containerStyle: {
    borderColor: 'white',
    margin: 0,
    padding: 0,
    marginTop: -2,
  },
  label: {
    margin: 0,
    marginLeft: 0,
    fontSize: 14,
  },
});

export const buttonOrientation = StyleSheet.create({
  landingButtonOrientation: {
    position: 'absolute',
    bottom: 60,
    right: 0,
    left: 0,
  },
  landingButtons: {
    backgroundColor: Colors.primary,
    height: 50,
  },
  featurebutton: {
    color: 'black',
    marginHorizontal: 35,
    height: 50,
  },
});

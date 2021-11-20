import { StyleSheet, StatusBar, Dimensions } from 'react-native';
import { Colors } from './styles-colors';

export const pageCenteredImage = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Dimensions.get('window').height > 720 ? 20 : 40,
    height: Dimensions.get('window').height > 720 ? 300 : 250,
    width: Dimensions.get('window').height > 720 ? 300 : 250,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export const landingPagesOrientation = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginTop: 10,
    paddingHorizontal: 35,
    position: 'relative',
  },
  textContainer: {
    marginTop: 15,
  },
  primaryBackgroundColor: {
    backgroundColor: Colors.primary,
    marginTop: 0,
  },
  darkPrimaryBackgroundColor: {
    backgroundColor: Colors.darkPrimary,
    marginTop: 0,
  },
  header: {
    fontSize: Dimensions.get('window').height > 720 ? 35 : 25,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'normal',
    marginTop: 30,
    color: Colors.textColor,
  },
  textContaineredCenter: {
    alignItems: 'center',
  },
});

export const agreementCheckBoxContainer = StyleSheet.create({
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 25,
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
    right: 35,
    left: 35,
  },
  landingButtons: {
    backgroundColor: Colors.primary,
    height: 50,
  },
  navigationButtons: {
    color: Colors.primary,
    height: 50,
  },
  featurebutton: {
    color: 'black',
    marginHorizontal: 35,
    height: 50,
  },
});

import { StyleSheet, StatusBar, Dimensions } from 'react-native';
import { Colors } from './styles-colors';

export const pageCenteredImage = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Dimensions.get('window').height > 720 ? 30 : 65,
    height: Dimensions.get('window').height > 720 ? 270 : 200,
    width: Dimensions.get('window').height > 720 ? 270 : 200,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export const pageSpecialCenteredImage = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Dimensions.get('window').height > 720 ? 30 : 65,
    height: Dimensions.get('window').height > 720 ? 170 : 100,
    width: Dimensions.get('window').height > 720 ? 170 : 100,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export const landingPagesOrientation = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 30,
    position: 'relative',
  },
  container2: {
    flex: 1,
    position: 'relative',
  },
  historyContainer: {
    flex: 1,
    marginTop: 20,
    position: 'relative',
  },
  innerAdjustementPadding: {
    marginLeft: 35,
    paddingTop: StatusBar.currentHeight,
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
    fontSize: Dimensions.get('window').height > 720 ? 27 : 22,
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
  otpContianer: {
    marginTop: 30,
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    height: 50,
    width: '100%',
    marginTop: 12,
    borderWidth: 1,
    fontSize: 20,
    borderColor: Colors.inputColor,
    backgroundColor: Colors.inputColor,
    borderRadius: 5,
    padding: 10,
  },
  otpInput: {
    fontWeight: '600',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    margin: 15,
    padding: 15,
    fontSize: 20,
    height: 55,
    width: '15%',
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.inputColor,
    backgroundColor: Colors.inputColor,
  },
  resendLink: {
    color: Colors.primary,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
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

// styles for the main pages

export const tabNavigation = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: Colors.primary,
    position: 'relative',
    elevation: 5
  },
});

export const formsContainer = StyleSheet.create({
  formsHeader: {
    fontSize: 25,
    fontWeight: '700',
    marginTop: 30,
    color: Colors.primary,
  },
  formsSubHeader: {
    fontSize: 15,
  },
  errorMessage: {
    color: Colors.red,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 5,
  },
});

export const inputs = StyleSheet.create({
  style: {
    height: 50,
    width: '100%',
    marginTop: 5,
    borderWidth: 1,
    fontSize: 18,
    borderColor: Colors.inputColor,
    backgroundColor: Colors.inputColor,
    borderRadius: 5,
    padding: 10,
  },
});

export const checkBox = StyleSheet.create({
  radioOptions: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginHorizontal: 0,
    width: '100%',
  },
});

export const displayFormContainer = StyleSheet.create({
  formCaptions: {
    fontSize: 20,
    fontWeight: '700',
  },
  formsHeader: {
    fontSize: 25,
    fontWeight: '700',
    color: Colors.primary,
  },
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    width: '100%',
    marginTop: 5,
    borderWidth: 1,
    fontSize: 18,
    borderColor: Colors.inputColor,
    backgroundColor: Colors.inputColor,
    borderRadius: 5,
    padding: 15,
    paddingLeft: 10,
  },
});

export const sectionContiner = StyleSheet.create({
  section: {
    marginBottom: 10,
    marginTop: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 5,
  },
  sectionDescription: {
    fontSize: 15,
    marginBottom: 7,
  },
});

export const notifContainer = StyleSheet.create({
  container: {
    borderRadius: 5,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginBottom: 15,
  },
  elevation: {
    elevation: 2,
  },
});

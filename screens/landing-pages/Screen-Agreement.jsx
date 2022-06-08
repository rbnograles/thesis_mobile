import React, { useState } from 'react';
// native components
import { Colors } from '../../styles/styles-colors';
import { StackActions } from '@react-navigation/native';
import { Text, SafeAreaView, View, Image, Modal, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { CheckBox, Button } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
// stylesheet
import {
  landingPagesOrientation,
  agreementCheckBoxContainer,
  buttonOrientation,
  pageCenteredImage,
} from '../../styles/styles-screens';

const AggreementScreen = ({ navigation }) => {
  const [isChecked, setChecked] = useState(false);
  const [modalConfirmVisible, setModalConfirmVisible] = useState(false);

  return (
    <SafeAreaView style={landingPagesOrientation.container}>
      <View style={pageCenteredImage.container}>
        <Image source={require('../../assets/landing-page-1.png')} style={pageCenteredImage.image} />
      </View>
      <View style={landingPagesOrientation.textContainer}>
        <Text style={landingPagesOrientation.header}>Welcome to JuanBreath contact tracing mobile application</Text>
        <Text style={landingPagesOrientation.subHeader}>
          This application aims to help reduce the number of cases of pandemic virus in the community / campus by indentifying
          close contact using contact tracing.
        </Text>
      </View>
      <View style={agreementCheckBoxContainer.checkboxContainer}>
        <CheckBox
          checked={isChecked}
          checkedColor={Colors.primary}
          onPress={() => setChecked(!isChecked)}
          containerStyle={agreementCheckBoxContainer.containerStyle}
        />
        <Text style={agreementCheckBoxContainer.label}>
          I have read and agreed to the{' '}
          <Text
            style={{ color: Colors.primary, textDecorationLine: 'underline' }}
            onPress={() => {
              setModalConfirmVisible(true);
            }}
          >
            Terms and Policies
          </Text>
        </Text>
      </View>
      <View style={buttonOrientation.landingButtonOrientation}>
        <Button
          title="Continue"
          buttonStyle={buttonOrientation.landingButtons}
          disabled={!isChecked}
          onPress={() => navigation.dispatch(StackActions.replace('SafetyScreen'))}
        />
      </View>

      {/* confirm modal for saving the data */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalConfirmVisible}
        onRequestClose={() => {
          setModalConfirmVisible(!modalConfirmVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView]}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.modalText}>Terms and Policies</Text>
              <Pressable onPress={() => setModalConfirmVisible(!modalConfirmVisible)}>
                <Text style={{ color: 'black' }}>
                  <FontAwesome name="times" color="black" size={22} />
                </Text>
              </Pressable>
            </View>
            <ScrollView style={{ height: 300 }}>
              <Text style={styles.break}>
                <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>JuanBreath</Text> is a contact tracing
                mobile application developed to help the nation [to] manage emerging infectious diseases. This
                application aims to elevate and utilize the contact tracing solution in the Philippines.
              </Text>
              <Text style={styles.break}>
                Before continuing to use the mobile application, users are required to agree to the terms and conditions
                of the application. Here are the <Text style={{ fontWeight: 'bold' }}>terms and conditions:</Text>
              </Text>
              <View style={[styles.break, styles.ulList]}>
                <Text style={styles.break}>
                  • Users must only provide true and authentic information. Any form of misinformation from the users
                  will not be tolerated and may have possible legal action.
                </Text>
                <Text style={styles.break}>
                  • Proper usage of the application and its process is required to fully utilize the benefits of contact
                  tracing.{' '}
                </Text>
                <Text style={styles.break}>• Abuse of the application’s features are prohibited.</Text>
                <Text style={styles.break}>
                  • When confirmed positive of the infectious disease monitored by the application, that user will be
                  required to upload their full information and location history on the system’s admin website. This
                  will help the administrators to trace possible close contacts within a certain number of days.
                </Text>
                <Text style={styles.break}>
                  • Any spread of information from the application through the user’s phone is excluded from the
                  developers’ responsibility for leaked information.
                </Text>
                <Text style={styles.break}>
                  • Resulting information from the use of this mobile and web application will be used in the thesis
                  paper and research journal of the developers. All user information from the system will not be
                  distributed to the public.
                </Text>
              </View>
              <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Privacy Policies</Text>
              <Text style={{ color: Colors.primary, fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>
                • Account Creation
              </Text>
              <Text style={styles.break}>
                Users of the application will be required to create an account to continue using the application.
                Personal Information such as their full name, address, mobile number, and affiliation to the location
                will be stored in the phone’s storage. User’s full name and address will not be collected and saved to
                the system’s database. This will ensure anonymity of the user’s identity and location.
              </Text>
              <Text style={styles.break}>
                Full information of the user will only be uploaded to the system’s database once they confirm that they
                are positive of the infectious disease being monitored by the application. User’s identity will not be
                publicized to other users.
              </Text>
              <Text style={{ color: Colors.primary, fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>
                • Account Deletion
              </Text>
              <Text style={styles.break}>
                Once a user chooses to delete their account, all information from the system will be deleted permanently
                only after 14 days. This is to make sure that you will be notified via SMS Text in case that you have
                been in close contact with a person who is positive of the virus.
              </Text>
              <Text style={{ color: Colors.primary, fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>
                • Location History
              </Text>
              <Text style={styles.break}>
                User’s location history will be recorded to the admin side but will not display the user’s identity.
                Visitation history from the user’s application will only be updated when the user has internet/data
                connection.
              </Text>
            </ScrollView>

            <TouchableOpacity
              style={{ width: '100%', marginTop: 20 }}
              onPress={() => {
                setModalConfirmVisible(!modalConfirmVisible);
                setChecked(true);
              }}
            >
              <View
                style={{
                  backgroundColor: Colors.primary,
                  height: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 3,
                }}
              >
                <Text style={{ fontSize: 16, fontWeight: '700', color: 'white' }}>I Accept the Terms and Policies</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#000000AA',
  },
  break: {
    marginBottom: 10,
  },
  ulList: {
    marginLeft: 10,
  },
  modalView: {
    backgroundColor: 'white',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 7,
    padding: 35,
    alignItems: 'center',
    shadowColor: Colors.primary,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
  },
  modalText: {
    fontSize: 25,
    marginBottom: 15,
    fontWeight: '700',
    width: '100%',
  },
});

export default AggreementScreen;

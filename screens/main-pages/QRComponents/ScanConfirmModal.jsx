import React from 'react';
// native components
import { FontAwesome } from '@expo/vector-icons';
import { Text, View, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { Colors } from '../../../styles/styles-colors';

const ScanConfirmModal = ({ 
    setModalConfirmVisible, 
    modalConfirmVisible,
    location,
    handleLeavingEventPlace,
    setHasCurrentLocation,
    hasCurrentLocation
}) => {
    return (
        <>
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
                        <View>
                            <Text style={[styles.modalText, { marginBottom: 20 }]}>Data has been recorded!</Text>
                        </View>
                        <FontAwesome name="check-circle" color={Colors.accent} size={100} />
                        <View>
                            <Text style={styles.modalText}>You have scanned the venue:</Text>
                        </View>
                        <Text style={styles.locationText}>{location}</Text>
                        <View style={{ paddingHorizontal: 10}}>
                            <Text style={styles.modalText}>Do you want to leave the venue now?</Text>
                        </View>
                        <View
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '100%',
                                marginTop: 15,
                            }}
                        >
                            {/* leave button */}
                            <TouchableOpacity
                                style={{ width: '50%' }}
                                onPress={() => {
                                    handleLeavingEventPlace();
                                    setModalConfirmVisible(!modalConfirmVisible);
                                    setHasCurrentLocation(false)
                                }}
                            >
                                <View
                                    style={{
                                        backgroundColor: Colors.accent,
                                        height: 50,
                                        marginLeft: 10,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 3,
                                    }}
                                >
                                    <Text style={{ fontSize: 16, fontWeight: '700', color: 'white' }}>Leave</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={{ width: '50%' }}
                                onPress={() => {
                                    setModalConfirmVisible(!modalConfirmVisible);
                                    setHasCurrentLocation(!hasCurrentLocation);
                                }}
                            >
                                <View
                                    style={{
                                        backgroundColor: Colors.lightGrey,
                                        height: 50,
                                        marginLeft: 10,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: 3,
                                    }}
                                >
                                    <Text style={{ fontSize: 16, fontWeight: '700', color: 'black' }}>Later</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#000000AA',
  },
  locationText: {
    color: Colors.primary,
    fontSize: 25,
    fontWeight: '700',
    marginBottom: 10,
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
    fontSize: 18,
    marginTop: 25,
    marginBottom: 10,
    fontWeight: '700',
    width: '100%',
  },
});

export default ScanConfirmModal;

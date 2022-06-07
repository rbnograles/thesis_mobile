import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../../../styles/styles-colors';

const LeaveRecord = ({  
    hasCurrentLocation, 
    handleLeavingEventPlace, 
    setHasCurrentLocation,
    location
}) => {
    return (
        <View style={{ alignItems: "center"}}>
        {
            hasCurrentLocation && (
            <View style={{ width: 300, alignItems: "center", marginTop: 50  }}>
                <View>
                    <Text style={{ marginBottom: 20, fontSize: 30, fontWeight: "bold", color: Colors.primary }}>Checkpoint!</Text>
                </View>
                <FontAwesome name="save" color={Colors.accent} size={100} />
                <View>
                    <Text style={styles.modalText}>You are currently in:</Text>
                </View>
                <Text style={styles.locationText}>{location}</Text>
                <View style={{ paddingHorizontal: 10}}>
                    <Text style={styles.modalText}>Do you want to leave this location now?</Text>
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
                    style={{ width: '100%' }}
                    onPress={() => {
                        handleLeavingEventPlace();
                        setHasCurrentLocation(false);
                    }}
                    >
                    <View
                        style={{
                        backgroundColor: Colors.red,
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 3,
                        }}
                    >
                        <Text style={{ fontSize: 16, fontWeight: '700', color: 'white' }}>Leave Now</Text>
                    </View>
                    </TouchableOpacity>
                </View>
            </View>
            )
        }
        </View>
    );
}

const styles = StyleSheet.create({
    locationText: {
        color: Colors.primary,
        fontSize: 25,
        fontWeight: '700',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 18,
        marginTop: 25,
        marginBottom: 10,
        fontWeight: '700',
        width: '100%',
    },
});

export default LeaveRecord;

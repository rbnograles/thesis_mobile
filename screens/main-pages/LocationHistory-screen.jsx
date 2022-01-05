import React, { useState } from 'react';
// native components
import { Text, View, ScrollView } from 'react-native';
import Moment from 'moment';
// stylesheet
import { displayFormContainer, landingPagesOrientation } from '../../styles/styles-screens';
import { Colors } from '../../styles/styles-colors';
import { FontAwesome5 } from '@expo/vector-icons';

Moment.locale('en');

const LocationHistoryScreen = ({ navigation }) => {
  const [historyData, setHistory] = useState([
    // {
    //   date: '2022-01-04',
    //   visitation: [
    //     { location: 'Location 1', time: '10:00 am', action: 'Scanned the QR Code' },
    //     { location: 'Location 1', time: '10:00 am', action: 'Scanned the QR Code' },
    //     { location: 'Location 1', time: '10:00 am', action: 'Scanned the QR Code' },
    //     { location: 'Location 1', time: '10:00 am', action: 'Scanned the QR Code' },
    //   ],
    // },
    // {
    //   date: '2021-12-27',
    //   visitation: [
    //     { location: 'Location 1', time: '10:00 am', action: 'Scanned the QR Code' },
    //     { location: 'Location 1', time: '10:00 am', action: 'Scanned the QR Code' },
    //     ,
    //     { location: 'Location 1', time: '10:00 am', action: 'Scanned the QR Code' },
    //     ,
    //     { location: 'Location 1', time: '10:00 am', action: 'Scanned the QR Code' },
    //     ,
    //     { location: 'Location 1', time: '10:00 am', action: 'Scanned the QR Code' },
    //     ,
    //     { location: 'Location 1', time: '10:00 am', action: 'Scanned the QR Code' },
    //     ,
    //     { location: 'Location 1', time: '10:00 am', action: 'Scanned the QR Code' },
    //     { location: 'Location 1', time: '10:00 am', action: 'Scanned the QR Code' },
    //     { location: 'Location 1', time: '10:00 am', action: 'Scanned the QR Code' },
    //     { location: 'Location 1', time: '10:00 am', action: 'Scanned the QR Code' },
    //     { location: 'Location 1', time: '10:00 am', action: 'Scanned the QR Code' },
    //     { location: 'Location 1', time: '10:00 am', action: 'Scanned the QR Code' },
    //   ],
    // },
  ]);

  return (
    <View style={landingPagesOrientation.historyContainer}>
      <ScrollView>
        <View style={landingPagesOrientation.innerAdjustementPadding}>
          {historyData.length > 0 && (
            <Text style={[displayFormContainer.formsHeader, { marginBottom: 15 }]}>14 Day Visitation History</Text>
          )}
          {historyData.length > 0 &&
            historyData.map((history, i) => {
              return (
                <View key={i}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                    {new Date(history.date).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)
                      ? 'Today'
                      : Moment(history.date).format('MMMM DD, YYYY')}
                  </Text>
                  <View style={{ marginBottom: 20, marginTop: 10 }}>
                    {history.visitation.map((visitation, i) => {
                      return (
                        <View key={i} style={{ display: 'flex', flexDirection: 'row', marginBottom: 10 }}>
                          <Text style={{ fontSize: 12, marginRight: 10, marginTop: 2, fontWeight: '700' }}>
                            {visitation.time}
                          </Text>
                          <View
                            style={{
                              height: 10,
                              width: 10,
                              backgroundColor: Colors.accent,
                              borderRadius: 50,
                              marginRight: 10,
                              marginTop: 4,
                            }}
                          ></View>
                          <View>
                            <Text style={{ fontSize: 18 }}>{visitation.location}</Text>
                            <Text style={{ color: 'grey' }}>{visitation.action}</Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                </View>
              );
            })}
        </View>
        {historyData.length === 0 && (
          <View style={{ marginTop: '50%', width: '100%' }}>
            <FontAwesome5
              name="search-location"
              size={50}
              color={Colors.primary}
              style={{ textAlign: 'center', marginBottom: 25 }}
            />
            <Text style={{ color: Colors.primary, fontSize: 15, textAlign: 'center' }}>
              You currently don't have any location history.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default LocationHistoryScreen;

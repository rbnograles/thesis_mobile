import React, { useState } from 'react';
// native components
import { Text, View, ScrollView } from 'react-native';
import Moment from 'moment';
// stylesheet
import { displayFormContainer, landingPagesOrientation } from '../../styles/styles-screens';
import { Colors } from '../../styles/styles-colors';
import { FontAwesome5 } from '@expo/vector-icons';

Moment.locale('en');

const AlarmScreen = ({ navigation }) => {
  const [alarmNotifications, setAlarmNotifications] = useState([
    // {
    //   date: '2021-12-29',
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
          {alarmNotifications.length > 0 &&
            alarmNotifications.map((history, i) => {
              return (
                <>
                  <Text style={[displayFormContainer.formsHeader, { marginBottom: 15 }]}>
                    14 Day Visitation History
                  </Text>
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
                </>
              );
            })}
          {alarmNotifications.length === 0 && (
            <View style={{ marginTop: '50%', marginHorizontal: '13%' }}>
              <FontAwesome5
                name="bell-slash"
                size={50}
                color={Colors.primary}
                style={{ marginHorizontal: '34%', marginBottom: 25 }}
              />
              <Text style={{ color: Colors.primary, fontSize: 15 }}>
                There are no alarm notification at the moment.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default AlarmScreen;

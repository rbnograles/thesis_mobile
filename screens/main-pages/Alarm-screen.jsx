import React, { useState } from 'react';
// native components
import { Text, View, ScrollView } from 'react-native';
import Moment from 'moment';
// stylesheet
import { displayFormContainer, landingPagesOrientation, notifContainer } from '../../styles/styles-screens';
import { Colors } from '../../styles/styles-colors';
import { FontAwesome5 } from '@expo/vector-icons';

Moment.locale('en');

const AlarmScreen = ({ navigation }) => {
  const [alarmNotifications, setAlarmNotifications] = useState([]);
  return (
    <View style={landingPagesOrientation.historyContainer}>
      <ScrollView>
        <View style={[landingPagesOrientation.innerAdjustementPadding, { marginRight: 35 }]}>
          {alarmNotifications.length > 0 && (
            <Text style={[displayFormContainer.formsHeader, { marginBottom: 15 }]}>Alarm Notifications</Text>
          )}
          {alarmNotifications.length > 0 &&
            alarmNotifications.map((alarm, i) => {
              return (
                <View
                  key={i}
                  style={[
                    notifContainer.container,
                    notifContainer.elevation,
                    { backgroundColor: alarm.new ? Colors.lightBlue : Colors.lightGrey },
                  ]}
                >
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      flexWrap: 'nowrap',
                      justifyContent: 'space-between',
                      marginTop: 10,
                    }}
                  >
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: alarm.new ? Colors.accent : 'grey' }}>
                      {alarm.title}
                    </Text>
                    <Text style={{ color: 'grey' }}>{alarm.time}</Text>
                  </View>
                  <Text style={{ marginBottom: 10, marginTop: 10 }}>{alarm.description}</Text>
                  <Text style={{ marginBottom: 10, color: 'grey' }}>
                    {new Date(alarm.date).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)
                      ? 'Today'
                      : Moment(alarm.date).format('MMM DD, YYYY')}
                  </Text>
                </View>
              );
            })}
        </View>
        {alarmNotifications.length === 0 && (
          <View
            style={{
              marginTop: '50%',
              width: '100%',
            }}
          >
            <FontAwesome5
              name="bell-slash"
              size={50}
              color={Colors.primary}
              style={{ marginBottom: 25, textAlign: 'center' }}
            />
            <Text style={{ color: Colors.primary, fontSize: 15, textAlign: 'center' }}>
              You currently don't have any alarm notification.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default AlarmScreen;

import React, { useState, useEffect, useCallback } from 'react';
// native components
import { Text, View, ScrollView, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Moment from 'moment';
// stylesheet
import { displayFormContainer, landingPagesOrientation, notifContainer } from '../../styles/styles-screens';
import { Colors } from '../../styles/styles-colors';
import { FontAwesome5 } from '@expo/vector-icons';
import { checkInternetConnection } from "../../_utils/CheckIfConnectedToInternet";
import { getAllNotification, updateNotificationCount } from "../../apis/notifications"

Moment.locale('en');

const AlarmScreen = ({ setCount }) => {

  const [alarmNotifications, setAlarmNotifications] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  
  const getUsersNotification = async (connectedToNet) => {
  const userId = await AsyncStorage.getItem('@userRandomeQRID');
   
    if(connectedToNet) {
      try {
        const data = await getAllNotification(userId);
        setAlarmNotifications(data.data.data)
      } catch (error) {
        setAlarmNotifications([]);
      }
    } else {
      setAlarmNotifications([]);
    }
  }
  
  const onRefresh = useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => {
      setRefreshing(false);
      checkInternetConnection().then(res => getUsersNotification(res));
    });
  }, [refreshing]);

  const wait = timeout => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  };

  const updateNotifCount = async () => {
    const userId = await AsyncStorage.getItem('@userRandomeQRID');
      try {
        await updateNotificationCount(userId);
        setCount(0);
      } catch (error) {
        console.log(error)
      }
  }
  
  useFocusEffect(
    React.useCallback(() => {
      updateNotifCount();
    }, []));
  
  useEffect(() => {
    checkInternetConnection().then(res => getUsersNotification(res));    
  }, []);
  
  return (
    <View style={landingPagesOrientation.historyContainer}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={[landingPagesOrientation.innerAdjustementPadding, { marginRight: 20 }]}>
          {alarmNotifications.length > 0 && (
            <Text style={[displayFormContainer.formsHeader, { marginBottom: 15 }]}>News Notifications</Text>
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

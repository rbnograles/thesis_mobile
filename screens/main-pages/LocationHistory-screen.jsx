import React, { useState, useEffect, useCallback } from 'react';
// native components
import { Text, View, ScrollView, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Moment from 'moment';
// stylesheet
import { displayFormContainer, landingPagesOrientation } from '../../styles/styles-screens';
import { Colors } from '../../styles/styles-colors';
import { FontAwesome5 } from '@expo/vector-icons';
import { getUsersVisitationHistroy } from "../../apis/qr-code-visitation";
import { checkInternetConnection } from "../../_utils/CheckIfConnectedToInternet";

Moment.locale('en');

const LocationHistoryScreen = () => {

  const [historyData, setVisitationHistroy] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdateDate, setLastUpdateDate] = useState("")

  const getUsersVisitationLogsPersonal = async (connectedToNet) => {
    const userId = await AsyncStorage.getItem('@userRandomeQRID');
    if(connectedToNet) {
      try {
        const data = await getUsersVisitationHistroy(userId);
        setVisitationHistroy(data.data.data)
        await AsyncStorage.setItem('@savedVisitationHistory', JSON.stringify(data.data.data))
        await AsyncStorage.setItem('@lastUpdateDateForVisitationHistroy', new Date().toISOString().split('T')[0]);
        setLastUpdateDate(new Date().toISOString().split('T')[0]);
      } catch (error) {
        setVisitationHistroy([]);
      }
    } else {
      const data = await AsyncStorage.getItem('@savedVisitationHistory');
      const parsedValue = JSON.parse(data)
      setVisitationHistroy(parsedValue !== null ? parsedValue: []);
    }
  }

  const wait = timeout => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => {
      setRefreshing(false);
      checkInternetConnection().then(res => getUsersVisitationLogsPersonal(res));
    });
  }, [refreshing]);

  const convertTo112HourFormat = time => {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join('');
  };

  useEffect(() => {
    checkInternetConnection().then(res => getUsersVisitationLogsPersonal(res));    
  }, []);

  return (
    <View style={landingPagesOrientation.historyContainer}>
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View style={landingPagesOrientation.innerAdjustementPadding}>
          {historyData.length > 0 && (
            <View style={{ marginBottom: 15 }}>
              <Text style={[displayFormContainer.formsHeader]}>14 Day Visitation History</Text>
              <Text>Last Update: {Moment(lastUpdateDate).format('MMMM DD, YYYY')}</Text>
            </View>
          )}
          {historyData.length > 0 &&
            historyData.reverse().map((history, i) => {
              return (
                <View key={i}>
                  <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                    {new Date(history.visitDate).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)
                      ? 'Today'
                      : Moment(history.visitDate).format('MMMM DD, YYYY')}
                  </Text>
                  <View style={{ marginBottom: 20, marginTop: 10 }}>
                    {history.visitation.map((visitation, i) => {
                      return (
                        <View key={i} style={{ display: 'flex', flexDirection: 'row', marginBottom: 10 }}>
                          <Text style={{ fontSize: 12, marginRight: 10, marginTop: 2, fontWeight: '700' }}>
                            {convertTo112HourFormat(visitation.time)}
                          </Text>
                          <View
                            style={{
                              height: 10,
                              width: 10,
                              backgroundColor: visitation.action === "Scanned the QR Code" ? Colors.accent : Colors.red,
                              borderRadius: 50,
                              marginRight: 10,
                              marginTop: 4,
                            }}
                          ></View>
                          <View style={{ width: "75%"}}>
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

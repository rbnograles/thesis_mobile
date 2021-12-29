import React, { useState } from 'react';
// native components
import { Text, View } from 'react-native';
import Timeline from 'react-native-timeline-flatlist';
import Moment from 'moment';
import { Feather } from '@expo/vector-icons';
// stylesheet
import { landingPagesOrientation } from '../../styles/styles-screens';
import { Colors } from '../../styles/styles-colors';

Moment.locale('en');

const LocationHistoryScreen = ({ navigation }) => {
  const [historyData, setHistory] = useState([
    {
      title: 'College of Engineering Building 1',
      time: 'Dec 27, 21 10:00 am',
      description: 'Scanned the facility qr code.',
    },
    { title: 'Location 2', time: 'Dec 27, 21 12:00 am', description: 'Exited the facility.' },
  ]);

  return (
    <View style={landingPagesOrientation.container}>
      <Text style={{ marginBottom: 15, fontSize: 24, fontWeight: '700' }}>
        <Feather name="calendar" size={24} color="black" />
        14 Day Timeline
      </Text>
      <Timeline
        circleSize={12}
        circleColor={Colors.accent}
        lineColor={Colors.accent}
        titleStyle={{ marginTop: -10 }}
        timeStyle={{ fontWeight: '700', fontSize: 14 }}
        descriptionStyle={{ color: 'gray', marginTop: 5 }}
        data={historyData}
      />
    </View>
  );
};

export default LocationHistoryScreen;

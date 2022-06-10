import React from 'react';
import CustomButton from '../../../_utils/CustomButton';
import { Text, View } from 'react-native'
import { sectionContiner } from '../../../styles/styles-screens';
import { Colors } from '../../../styles/styles-colors';
import Moment from "moment"
import { ListItem } from 'react-native-elements';

const RecovereyStatusUpdate = ({ 
    setRecoveredModalConfirmVisible, 
    dateAfter14Days,
    positiveReportDate,
    currentReport
}) => {

    let currentDate = new Date();
    dateAfter14Days = new Date(dateAfter14Days);

    return (
        <View>
            <Text style={sectionContiner.sectionDescription}>
                You are advised to follow the 14 day quarantine protocol mandated by the government from  
                <Text style={{ color: Colors.red, fontWeight: "bold"}}>
                    { " " + Moment(positiveReportDate).format('MMMM DD') + " - " + Moment(dateAfter14Days).format('MMMM DD, YYYY') }.
                </Text>
            </Text>
            <Text style={sectionContiner.sectionDescription}>
                You can <Text style={{ fontWeight: "bold", color: Colors.green}}> press the button below</Text>  after the 14 day quarantine protocol is over and
                the health officials gives you the signal that you have recovered from the virus. 
            </Text>
            <Text style={sectionContiner.sectionDescription}>
                <Text style={{ color: Colors.red, fontWeight: "bold"}}>Notice:</Text> Below are the list of your health status report.
            </Text>
            <View>
                {
                    currentReport.map((data, i) => {
                        return (
                            <ListItem key={i} bottomDivider>
                                <ListItem.Content>
                                    <Text>Disease: <Text style={{ fontWeight: "bold"}}>{data.disease}</Text></Text>
                                </ListItem.Content>
                                <ListItem.Content>
                                    <Text>Date: <Text style={{ fontWeight: "bold"}}>{Moment(data.date).format('MMMM DD, YYYY')}</Text></Text>
                                </ListItem.Content>
                            </ListItem>
                        )
                    })
                }
            </View>
            <View style={{ marginTop: 10}}>
                {
                    dateAfter14Days <= currentDate 
                    ? 
                        <CustomButton
                            title="Update Recovery Status"
                            color={Colors.green}
                            textColor="white"
                            onPress={() => setRecoveredModalConfirmVisible(true)}
                        />
                    :
                        <CustomButton
                            title="Update Recovery Status"
                            color={Colors.grey}
                            textColor="white"
                            onPress={() => {}}
                        />  
                } 
            </View>
        </View>
    );
}

export default RecovereyStatusUpdate;

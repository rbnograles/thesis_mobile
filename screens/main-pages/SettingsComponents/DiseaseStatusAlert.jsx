import React from 'react';
import CustomButton from '../../../_utils/CustomButton';
import { Text, ScrollView, StyleSheet, View } from 'react-native'
import { sectionContiner } from '../../../styles/styles-screens';
import { Colors } from '../../../styles/styles-colors';

const DiseaseStatusAlert = ({ setPositiveModalConfirmVisible, diseases}) => {
    return (
        <>
            <Text style={sectionContiner.sectionDescription}>
                If you are diagnosed with any of the following disease in the list below, please click the 
                <Text style={{ fontWeight: "bold", color: Colors.red}}> I am positive</Text> button. 
                This will upload your personal
                information provided to alert the community of a possible contact. 
            </Text>
            <Text>
                If not done immediately, an authorized
                person from the system will obligate you to upload your location history.
            </Text>
            <View 
                style={{ 
                    height: 130, 
                    width: '100%', 
                    marginBottom: 10, 
                    backgroundColor: "white",
                    marginTop: 5,
                    borderRadius: 5,
                }}>
                <Text style={{ fontWeight: "bold", padding: 10, fontSize: 16 }}>Below are the list of actively monitored diseases:</Text>
                <ScrollView style={{ padding: 10, marginBottom: 5 }} >
                    {
                        diseases.map((disease, i) => {
                            return (<Text key={i} style={styles.diseaseList}>
                                {(i + 1) + ". " + disease.name}
                        </Text>)
                        })
                    }
                </ScrollView>
            </View>
            <View style={{ width: "100%"}}>
                <CustomButton
                    title="I Am Positive"
                    color={Colors.red}
                    textColor="white"
                    onPress={() => setPositiveModalConfirmVisible(true)}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    diseaseList : {
        fontSize: 15,
        fontWeight: "bold", 
        color: "black", 
    }
});

export default DiseaseStatusAlert;

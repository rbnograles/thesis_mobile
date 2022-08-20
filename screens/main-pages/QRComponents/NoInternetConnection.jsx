import React from 'react';
import { Text, View } from 'react-native';
import { landingPagesOrientation } from '../../../styles/styles-screens';
import { Colors } from '../../../styles/styles-colors';
import { checkInternetConnection } from '../../../_utils/CheckIfConnectedToInternet';
import { Feather } from '@expo/vector-icons';
import CustomButton from '../../../_utils/CustomButton';

const NoInternetConnection = ({ setConnectedToNet }) => {
    return (
        <View style={{ paddingHorizontal: 25, marginTop: 60}}>
            <View
                style={[
                landingPagesOrientation.textContainer,
                landingPagesOrientation.textContaineredCenter,
                landingPagesOrientation.otpContianer,{
                    marginTop: "40%",
                    marginBottom: 20
                }
                ]}
            >
                <Feather name="wifi-off" size={90} color={Colors.primary} />
                <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 17, fontWeight: '700' }}>
                Please make sure that you are connected to a stable internet connection in order to continue.
                </Text>
            </View>
            <CustomButton
                title="Reload page"
                color={'grey'}
                textColor={Colors.lightGrey}
                onPress={() => checkInternetConnection().then(res => setConnectedToNet(res))}
            />
        </View>
    );
}

export default NoInternetConnection;

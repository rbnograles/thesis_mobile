import React from 'react';
import { Text, View } from 'react-native';
import CustomButton from '../../../_utils/CustomButton';
import { Colors } from '../../../styles/styles-colors';
import { sectionContiner } from '../../../styles/styles-screens';

const DeleteAccount = ({ setModalConfirmVisible }) => {
    return (
        <>
            <Text style={sectionContiner.sectionDescription}>
                If you chose to delete your account, all data from this account will be deleted from the database and your
                mobile device.
            </Text>
            <View style={{ width: "100%" }}>
                <CustomButton
                    title="Delete Account"
                    color={Colors.red}
                    textColor="white"
                    onPress={() => setModalConfirmVisible(true)}
                />
            </View>
        </>
    );
}

export default DeleteAccount;

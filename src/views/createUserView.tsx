import React from 'react';
import { StyleSheet, View } from 'react-native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../navigators/NavBar';

import { CreateUserComponent } from '../components/CreateUserComponent';

type Props = {
    navigation: NativeStackNavigationProp<StackParamList>;
}

export default function CreateUserView({ navigation } : Props) {
    return (
        <View style={styles.container}>
            <CreateUserComponent navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: '#55EBFF',

        alignItems: 'center',
        justifyContent: 'center',
    },
});
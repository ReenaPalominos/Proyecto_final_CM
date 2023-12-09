import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LoginComponent } from '../components/LoginComponent';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../navigators/NavBar';

type Props = {
    navigation: NativeStackNavigationProp<StackParamList>;
}

export default function Login ({ navigation }: Props){
    return (
        <View style={styles.container}>
            <LoginComponent navigation={navigation} />
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


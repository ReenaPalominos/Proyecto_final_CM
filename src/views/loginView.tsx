import React from 'react';
import { View } from 'react-native';
import { LoginComponent } from '../components/loginComponent';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../navigators/NavBar';
type Props = {
    navigation: NativeStackNavigationProp<StackParamList>;
}

export default function Login ({ navigation }: Props){
    return (
        <View>
            <LoginComponent navigation={navigation} />
        </View>
    );
}


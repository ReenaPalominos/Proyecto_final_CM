

import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, Alert } from 'react-native';

import appFirebase from '../services/firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(appFirebase);

export default function CreateUser({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerApp = async () => { 
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            Alert.alert('Registrando','Registrando usuario...');
            navigation.navigate('Login');
        } catch (error) {
            console.log(error);
            Alert.alert('Error','No se pudo registrar');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput placeholder="Email" onChangeText={(text) => setEmail(text)} />
            <TextInput placeholder="Password" onChangeText={(text) => setPassword(text)} secureTextEntry />
            <Button title="Sign Up" onPress={registerApp} />
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
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    }
});
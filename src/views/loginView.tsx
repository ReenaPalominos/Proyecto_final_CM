import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, Alert } from 'react-native';

import appFirebase from '../services/firebase';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(appFirebase);

export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginApp = async () => { 
        try {
            await signInWithEmailAndPassword(auth, email, password);
            Alert.alert('Iniciando Sesión','Accediendo...');
            navigation.navigate('Vistas');
        } catch (error) {
            console.log(error);
            Alert.alert('Error','Usuario o contraseña incorrectos');
        }
    };

    
    return (
        <View style={styles.container}>
            <TextInput placeholder="Email" onChangeText={(text) => setEmail(text)} />
            <TextInput placeholder="Password" onChangeText={(text) => setPassword(text)} secureTextEntry />
            <Button title="Sign In"  onPress={loginApp} />
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
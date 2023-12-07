

import React, { useState } from 'react';
import { StyleSheet, Image, View, Text, Button, TextInput, Alert, Pressable, SafeAreaView } from 'react-native';
import { BlurView } from "expo-blur";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../navigators/NavBar';

import appFirebase from '../services/firebaseConfig';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(appFirebase);

type Props = {
    navigation: NativeStackNavigationProp<StackParamList>;
}

export default function CreateUser({ navigation } : Props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isButtonPressed, setIsButtonPressed] = useState(false);

    const registerApp = async () => { 
        setIsButtonPressed(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            Alert.alert('Registrando','Registrando usuario...');
            navigation.navigate('Login');
        } catch (error) {
            console.log(error);
            Alert.alert('Error','No se pudo registrar');
        }
        setIsButtonPressed(false);
    };

    return (
        <SafeAreaView style={styles.container} >
            <BlurView intensity={70} tint="light" style={styles.blurContainer}>
                <Image 
                    style={styles.image}
                    source={require("../../assets/icons/adaptive-icon.png")}
                />
                <Text style={styles.title}>Crea tu Cuenta</Text>
                <TextInput style={styles.textInputContainer} placeholder="Ingresa tu email" onChangeText={(text) => setEmail(text)} />
                <TextInput style={styles.textInputContainer} placeholder="Crea una contraseña..." onChangeText={(text) => setPassword(text)} secureTextEntry />
                <Pressable style={isButtonPressed ? styles.pressedButton : styles.button} onPress={registerApp}>
                    <Text style={isButtonPressed ? styles.pressedText : styles.text}>Crear Usuario</Text>
                </Pressable>
            </BlurView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: '#55EBFF',

        alignItems: 'center',
        justifyContent: 'center',
    },
    blurContainer: {
        width: 400,
        height: 500,

        borderRadius: 20,

        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 100,
        height: 100,
        
        marginBottom: 40,
    },
    textInputContainer: {
        width: 300,
        height: 50,
        marginBottom: 20,
        padding: 10,

        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'white',

        color: '#000',
        backgroundColor: 'white',

        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 200,
        padding: 15,
        margin: 10,
        alignItems: 'center',
    
        borderRadius: 5,

        backgroundColor: '#00E0FF',
    },
    pressedButton: {
        width: 200,
        padding: 15,
        margin: 10,
        alignItems: 'center',
    
        borderRadius: 5,

        backgroundColor: '#E0FBFC',
    },
    title: {
        marginBottom: 30,
        fontSize: 26,
        color: 'grey',
        fontWeight: 'bold',
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    pressedText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
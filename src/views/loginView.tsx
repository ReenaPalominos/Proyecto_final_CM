import React, { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { Pressable, StyleSheet, View, Text } from 'react-native';

export default function Login({ navigation }) {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = () => {
        // Aquí puedes manejar la lógica de inicio de sesión
        if (username === 'mesh' && password === '1234') {
            navigation.navigate('Home');
        } else {
            alert('Usuario incorrecto');
        }
    };

    return (
        <View style={styles.loginView}>
            <View style={styles.cardView}>
                <TextInput
                style={styles.userView}
                label="Nombre de usuario"
                value={username}
                onChangeText={text => setUsername(text)}
                />
            
                <TextInput
                style={styles.passView}
                label="Contraseña"
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
                />
                <Pressable style={styles.buttonView} onPress={handleLogin}>
                    <Text>Iniciar sesión</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    loginView: {
        flex: 1,
        width: 'auto',
        backgroundColor: '#ebebd3',

        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardView: {
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: '#000',
        borderRadius: 10,
        flex: 1,
        width: 400,
        margin: 50,
    },
    userView: {
        width: 250,
        height: 50,
        margin: 10,
        borderRadius: 10,
    },
    passView: {
        width: 250,
        height: 50,
        margin: 10,
        borderRadius: 10,
    },
    buttonView: {
        width: 250,
        height: 50,
        margin: 10,
        borderRadius: 10,
        backgroundColor: '#ebebd3',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
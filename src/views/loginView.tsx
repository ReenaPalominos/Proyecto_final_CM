import React, { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { View } from 'react-native';

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
        <View>
            <TextInput
                label="Nombre de usuario"
                value={username}
                onChangeText={text => setUsername(text)}
            />
            <TextInput
                label="Contraseña"
                value={password}
                onChangeText={text => setPassword(text)}
                secureTextEntry
            />
            <Button onPress={handleLogin}>
                Iniciar sesión
            </Button>
        </View>
    );
}
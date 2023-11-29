import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Vistas from '../views/vistasView';
import Denuncias from '../views/denunciasView';
import Eventos from '../views/eventosView';
import Usuario from '../views/usuarioView';

const Stack = createNativeStackNavigator()

function MyTabs() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Vistas" component={Vistas}  options={{ headerShown: false }}/>
                <Stack.Screen name="Denuncias" component={Denuncias} />
                <Stack.Screen name="Eventos" component={Eventos} />
                <Stack.Screen name="Usuario" component={Usuario} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MyTabs;
import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Vistas from '../views/vistasView';
import Denuncias from '../views/denunciasView';
import Eventos from '../views/eventosView';
import Usuario from '../views/usuarioView';
import Login from '../views/loginView';
import CreateUser from '../views/createView';

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function LoginUser() {
    return (
        <Tab.Navigator>
            <Tab.Screen 
            name="Login"
            component={Login}
            options={{ headerShown: false }}
            />
            <Tab.Screen 
            name="Create"
            component={CreateUser}
            options={{ headerShown: false }}
            />
        </Tab.Navigator> 
        );
    }

function MyTabs() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Inicio">
                <Stack.Screen 
                    name="Inicio"
                    component={LoginUser}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="Vistas" component={Vistas}  options={{ headerShown: false }}/>
                <Stack.Screen name="Denuncias" component={Denuncias} />
                <Stack.Screen name="Eventos" component={Eventos} />
                <Stack.Screen name="Usuario" component={Usuario} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MyTabs;
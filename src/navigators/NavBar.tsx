import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { DatosDenuncia } from "../interfaces/denuncias.interface";
import { DatosEvento } from "../interfaces/eventos.interface";

import Vistas from '../views/vistasView';
import Denuncias from '../views/denuncias/denunciasView';
import Eventos from '../views/eventos/eventosView';
import Usuario from '../views/usuarioView';
import Login from '../views/loginView';
import CreateUser from '../views/createUserView';

import Mapa from '../views/MapView';

import DetallesDenuncia from '../views/denuncias/detallesDenunciasView';
import AddDenuncia from '../views/denuncias/addDenunciaView';

import DetallesEventos from '../views/eventos/detallesEventoView';
import AddEvento from '../views/eventos/addEventoView';

import AboutUs from '../views/aboutUsView';

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

export type StackParamList = {
    Login: undefined;
    Create: undefined;
    Vistas: undefined;
    Denuncias: undefined;
    Eventos: undefined;
    Usuario: undefined;
    DetallesDenuncia: DatosDenuncia;
    AddDenuncia: undefined;
    DetallesEventos: DatosEvento;
    AddEvento: undefined;
    Mapa: undefined;
    AboutUs: undefined;

};

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
                <Stack.Screen name="DetallesDenuncia" component={DetallesDenuncia} />
                <Stack.Screen name="DetallesEventos" component={DetallesEventos} />
                <Stack.Screen name="Mapa" component={Mapa} />
                <Stack.Screen name="AddDenuncia" component={AddDenuncia} />
                <Stack.Screen name="AddEvento" component={AddEvento} />
                <Stack.Screen name="AboutUs" component={AboutUs} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MyTabs;

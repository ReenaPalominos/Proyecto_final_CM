import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Vistas from '../views/vistasView';
import Publicaciones from '../views/publicacionesView';
import Detalle from '../views/detalleView';
import AddView from '../views/addView';
import Mapa from '../views/MapView';
import Usuario from '../views/usuarioView';
import AboutUs from '../views/aboutUsView';

import Login from '../views/loginView';
import CreateUser from '../views/createUserView';

import { Datos } from '../interfaces/datos.interface';

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

type Param = {
    Id: string;
};

export type StackParamList = {
    /* Vista Inicial */
    Login: undefined;
    Create: undefined;
    /* Home Screen */
    Vistas: undefined;
    Mapa: undefined;
    Usuario: undefined;
    AboutUs: undefined;
    /* Add Screen */
    Publicaciones: Param;
    Detalle: Datos;
    AddView: Param;
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
                <Stack.Screen name="Usuario" component={Usuario} />
                <Stack.Screen name="Mapa" component={Mapa} />
                <Stack.Screen name="Publicaciones" component={Publicaciones} initialParams={{ Id: "" }} />
                <Stack.Screen name="Detalle" component={Detalle} />
                <Stack.Screen name="AddView" component={AddView} initialParams={{ Id: "" }} />
                <Stack.Screen name="AboutUs" component={AboutUs} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MyTabs;

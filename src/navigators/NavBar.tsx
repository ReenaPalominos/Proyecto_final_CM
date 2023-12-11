import React from 'react';
import {AntDesign} from "@expo/vector-icons";

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../views/homeView';
import Vistas from '../views/vistasView';
import Publicaciones from '../views/publicacionesView';
import Detalle from '../views/detalleView';
import AddView from '../views/addView';
import Mapa from '../views/MapView';
import Cam from '../views/camView';
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
    Inicio: undefined;
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
    /*Extra Screen*/
    Cam: undefined;
};

function LoginUser() {
    return (
        <Tab.Navigator>
            <Tab.Screen 
            name="Login"
            component={Login}
            options={{ 
                headerShown: false,
                tabBarIcon:({color,size})=>(
                    <AntDesign name='login' color={color} size={size}/>
                )
            }}
            />
            <Tab.Screen 
            name="Create"
            component={CreateUser}
            options={{ 
                headerShown: false,
                tabBarIcon:({color,size})=>(
                    <AntDesign name='addusergroup' color={color} size={size}/>
                )
            }}
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
                <Stack.Screen name="Cam" component={Cam} />
                <Stack.Screen name="Publicaciones" component={Publicaciones} initialParams={{ Id: "" }} />
                <Stack.Screen name="Detalle" component={Detalle} />
                <Stack.Screen name="AddView" component={AddView} initialParams={{ Id: "" }} options={{ headerShown: false }} />
                <Stack.Screen name="AboutUs" component={AboutUs} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MyTabs;

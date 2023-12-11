import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { MapComponent } from '../components/MapComponent';
import { useRoute } from '@react-navigation/native';

import { Datos } from '../interfaces/datos.interface';
import { DeleteComponent } from '../components/DeleteComponent';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../navigators/NavBar';

import { auth } from "../services/firebaseConfig";

type Props = {
    navigation: NativeStackNavigationProp<StackParamList>;
}

export default function Detalle({ navigation }: Props) {
    const route = useRoute();

    const params = route.params as Datos;
    // Acceder a los parámetros
    const { tipo, token, title, description, timestamp, file, userId, latitud, longitud } = params;
    
    const dateObject = new Date(timestamp);

    const formattedDate = dateObject.toLocaleDateString("es-ES");
    const formattedTime = dateObject.toLocaleTimeString("es-ES");

    const user = auth.currentUser;
    const correo = user?.email;

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.titleText}>
                    {title}
                </Text>
            </View>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: file }}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <Text style={styles.descriptionText}>
                {description}
            </Text>
            <MapComponent latitud={Number(latitud)} longitud={Number(longitud)} />
            <Text style={styles.footerText}>
                Fecha: {formattedDate} {formattedTime} | Autor: {userId}
            </Text>
            {correo == userId ? <DeleteComponent navigation={navigation} tipo={tipo} token={token} /> : null}
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F6FF',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
        position: 'relative',
    },
    imageContainer: {
        height: '30%',
        width: '100%',
        marginBottom: 10,
    },
    image: {
        flex: 1,
        width: '100%',
        borderRadius: 10,
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#333333',
    },
    descriptionText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#333333',
    },
    footerText: {
        fontSize: 12,
        color: '#666666',
        marginTop: 20,
    },
});
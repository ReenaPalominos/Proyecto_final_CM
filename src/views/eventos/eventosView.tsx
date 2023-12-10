import React, { useCallback, useEffect, useState } from 'react';
import { View, ScrollView, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';


import { getDatabase, ref, onValue, off } from "firebase/database";

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../navigators/NavBar';

import EventoItem from '../../components/eventos/EventoItem';
import { DatosEvento } from '../../interfaces/eventos.interface';

type Props = {
    navigation: NativeStackNavigationProp<StackParamList>;
}

export default function Eventos({ navigation }: Props) {
    // crear constante para las denuncias
    const [_eventos, setEventos] = useState<DatosEvento[]>([]);

    useFocusEffect(
        useCallback(() => {
            const db = getDatabase();
            const dbRef = ref(db, "Eventos/");
            
            // Limpiar el estado de denuncias antes de cargar los nuevos datos
            setEventos([]);
    
            onValue(dbRef, (snapshot) => {
                const data = snapshot.val();
    
                // Accediendo a los datos
                for (let key in data) {
                    const { token, timestamp, title, description, file, userId } = data[key];
                    const newEvento = { token, title, timestamp, description, file, userId };
                    setEventos((prevState) => [...prevState, newEvento]);
                    console.log('Datos: ', token, timestamp, title, description, file, userId);
                }
            });
    
            // No olvides detener la escucha de cambios cuando ya no sea necesario
            return () => off(dbRef);
        }, [])
    );

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {_eventos.map((eventos) => (
                    <EventoItem
                        key={eventos.token.toString()}
                        onPress={() => navigation.navigate('DetallesEventos')}
                        text={eventos.title}
                        description={eventos.description}
                        date={eventos.timestamp}
                        imageSource={eventos.file}
                    />
                ))}
            </ScrollView>
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddEvento')}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
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
    scrollView: {
        width: '100%',
        height: '100%',
    },
    eventoContainer: {
        height: 150,
        width: '95%',
        marginVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    image: {
        width: 150,
        height: 140,
        marginRight: 10,
        borderRadius: 5,
    },
    dateText: {
        fontSize: 12,
        color: '#333333',
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: 24,
        color: 'white',
    },
});
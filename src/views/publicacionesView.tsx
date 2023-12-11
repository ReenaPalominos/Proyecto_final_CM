import React, { useCallback, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';


import { getDatabase, ref, onValue, off, DatabaseReference } from "firebase/database";

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParamList } from '../navigators/NavBar';

import ItemComponent from '../components/ItemComponent';
import { Datos } from '../interfaces/datos.interface';

import Loading from "../components/Loading";

type PublicacionesProps = NativeStackScreenProps<StackParamList, 'Publicaciones'>;


export default function Publicaciones({ route, navigation }: PublicacionesProps) {
    const [posteos, setPosteos] = useState<Datos[]>([]);
    const [loading, setLoading] = useState(false);
    const { Id } = route.params;

    console.log(`Estamos en ${Id}`);

    useFocusEffect(
        useCallback(() => {
            setLoading(true);
            const db = getDatabase();

            let dbRef: DatabaseReference;
            if (Id == "Eventos") {
                dbRef = ref(db, "Eventos/");
            } else {
                dbRef = ref(db, "Denuncias/");
            }
            
            // Limpiar el estado de denuncias antes de cargar los nuevos datos
            setPosteos([]);
    
            onValue(dbRef, (snapshot) => {
                const data = snapshot.val();
                const newPosts = [];
    
                // Accediendo a los datos
                for (let key in data) {
                    const { token, timestamp, title, description, file, userId, latitud, longitud} = data[key];
                    const newPost = { token, title, timestamp, description, file, userId, latitud, longitud};
                    newPosts.push(newPost);
                    console.log(`Datos ${Id}: `, token, timestamp, title, description, file, userId);
                }

                setPosteos(newPosts);
                setLoading(false);
            });
    
            return () => off(dbRef);
        }, [])
    );

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {posteos.map((posteos) => (
                    <ItemComponent
                        key={posteos.token.toString()}
                        onPress={() => navigation.navigate('Detalle', {
                                token: posteos.token,
                                title: posteos.title,
                                description: posteos.description,
                                timestamp: posteos.timestamp,
                                file: posteos.file,
                                userId: posteos.userId,
                                latitud: posteos.latitud,
                                longitud: posteos.longitud,
                            })
                        }
                        text={posteos.title}
                        description={posteos.description}
                        date={posteos.timestamp}
                        imageSource={posteos.file}
                    />
                ))}
            </ScrollView>
            { Id == "Eventos" ? (
                <TouchableOpacity 
                    style={styles.addButton}
                    onPress={() => navigation.navigate('AddView', {
                        Id: "Eventos",
                    })}
                >
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity 
                    style={styles.addButton}
                    onPress={() => navigation.navigate('AddView', {
                        Id: "Denuncias",
                    })}
                >
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            )}
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
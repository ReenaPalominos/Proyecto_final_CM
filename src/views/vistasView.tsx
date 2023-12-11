import React, { useCallback, useEffect, useState } from "react";
import { View, Image, Text, Pressable, StyleSheet, Dimensions, Alert } from 'react-native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MyTabs, { StackParamList } from '../navigators/NavBar';
import { Ionicons } from '@expo/vector-icons'; // Importa los íconos desde @expo/vector-icons

import { appFirebase } from '../services/firebaseConfig';
import { getAuth } from 'firebase/auth';

import { getDatabase, ref as databaseRef, onValue, off, set } from "firebase/database";
import { ref as storageRef, getStorage, getDownloadURL } from 'firebase/storage';

import Home from "./homeView";
import Loading from "../components/Loading";
import Error from "../components/Error";

const auth = getAuth(appFirebase);

const { width, height } = Dimensions.get('window');

type Props = {
    navigation: NativeStackNavigationProp<StackParamList>;
};

export default function Vistas({ navigation }: Props) {
    const [datos, setDatos] = useState({ user_uid: '', email: '', username: '' });
    const [user, setUser] = useState<string | null>(); 
    const [file, setFile] = useState<string>("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const userID = auth.currentUser;

    const navigateToAboutUs = () => {
        navigation.navigate('AboutUs');
    };
    

    const logOut = async () => {
        Alert.alert('En Mantención ❌', 'Lo sentimos, esta función se encuentra en mantención');
        console.log('Imposible Cerrar Sesión...');
        
        return;
        try {
            await auth.signOut();
            console.log('Usuario Deslogueado');
            Alert.alert('Cerrando Sesión ✅');
            navigation.navigate('Login');
        } catch (error) {
            console.log(error);
        }
    };

    const ButtonWithIcon = ({ onPress, text, iconName }: { onPress: () => void; text: string; iconName: string }) => (
        <Pressable style={styles.button} onPress={onPress}>
            <Ionicons name={iconName} size={40} color="#023e8a" />
            <Text style={styles.buttonText}>{text}</Text>
        </Pressable>
    );

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            
            const db = getDatabase();
            const dbRef = databaseRef(db, "Profile/" + userID?.uid);

            onValue(dbRef, (snapshot) => {
                const data = snapshot.val();

                const { user_uid, email, username } = data;
                const newDatos = { user_uid, email, username };
                
                setDatos(newDatos);
                setUser(newDatos.username);
            });
            setLoading(false);
        };

        const fetchImage = async () => {
            setLoading(true); 
            const storage = getStorage();
                getDownloadURL(storageRef(storage, 'Profile/' + userID?.uid))
                    .then((url) => {
                        setFile(url);
                    })
                    .catch((error) => {
                        console.log(error);
                        setError(true);
                    });
            setLoading(false);
        };
    
        fetchUser();
        fetchImage();

        return () => {
            setUser(null);
        };
    }, []);

    return (

        <View style={styles.container}>
            {loading ? (
                <Loading />
                ) : error ? (
                    <Error />
                ) : (
                    <View style={styles.container}>
                        <View style={styles.profileContainer}>

                            {file != "" ? (
                                <Image source={{ uri: file }} style={styles.userImage} />

                            ) : (
                                <Image source={require('../../assets/icons/adaptive-icon.png')} style={styles.userImage} />
                            )}
                        </View>
                        <Text style={styles.text}>{user}</Text>
                        <View style={styles.subContainer}>
                            <View style={styles.buttonRow}>
                                <ButtonWithIcon onPress={() => navigation.navigate('Publicaciones', {
                                    Id: "Denuncias",
                                })} text="Denuncias" iconName="ios-alert-circle-outline" />
                                <ButtonWithIcon onPress={() => navigation.navigate('Publicaciones', {
                                    Id: "Eventos",
                                })} text="Eventos" iconName="ios-calendar-outline" />
                            </View>
                            <View style={styles.buttonRow}>
                                <ButtonWithIcon onPress={() => navigation.navigate('Mapa')} text="Mapa" iconName="ios-map-outline" />
                                <ButtonWithIcon onPress={() => navigation.navigate('Usuario')} text="Usuario" iconName="ios-person-outline" />
                            </View>
                        </View>

                        <Pressable style={styles.circularButton} onPress={navigateToAboutUs}>
                            <Text style={styles.text}>?</Text>
                        </Pressable>
                        <Pressable style={styles.exitButton} onPress={logOut}>
                            <Ionicons name={"log-out-outline"} size={40} color="#023e8a" />
                            <Text style={styles.buttonText}>Salir</Text>
                        </Pressable>
                    </View>
                )
            }
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        height: height,
        backgroundColor: '#90e0ef',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileContainer: {
        width: width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#90e0ef',
        borderRadius: 10,
        height: '10%',
        marginTop: 40,
    },
    userImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginRight: 10,
    },
    subContainer: {
        width: width,
        height: '70%',
        borderRadius: 10,
        backgroundColor: '#90e0ef',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 150,
        height: 150,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#48cae4',
    },
    buttonText: {
        color: '#023e8a',
        fontSize: 16,
        marginTop: 5,
        fontWeight: 'bold',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 20,
    },
    text: {
        color: '#023e8a',
        fontSize: 20,
        fontWeight: 'bold',
    },
    circularButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 30,
        height: 30,
        borderRadius: 25,
        backgroundColor: '#44E8FF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    exitButton: {
        position: 'absolute',
        top: 70,
        left: 40,
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: '#44E8FF',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
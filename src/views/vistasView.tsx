import React from 'react';
import { View, Image, Text, Pressable, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../navigators/NavBar';

import appFirebase from '../services/firebase';
import { getAuth } from 'firebase/auth';

const auth = getAuth(appFirebase);

type Props = {
    navigation: NativeStackNavigationProp<StackParamList>;
}

export default function Vistas({ navigation } : Props) {

    const userID = auth.currentUser;

    const navigateToAboutUs = () => {
        navigation.navigate('AboutUs');
    };

    return (
        <View style={styles.container}>
            <View style={styles.userContainer}>
                <Image
                    source={require('../../assets/profilepic.png')}
                    style={styles.userImage}
                />
                <Text style={styles.text}>
                    {userID ? userID.email : "No hay ningún usuario autenticado"}
                </Text>
            </View>
            <View style={styles.subContainer}>
                <Pressable
                style={styles.button}
                onPress={() => navigation.navigate('Denuncias')} >
                    <Text 
                        style={styles.text} >
                        Denuncias
                    </Text>
                </Pressable>
        
                <Pressable 
                style={styles.button} 
                onPress={() => navigation.navigate('Eventos')} >
                    <Text 
                        style={styles.text} >
                        Eventos
                    </Text>
                </Pressable>
                <Pressable 
                style={styles.button} 
                onPress={() => navigation.navigate('Mapa')} >
                    <Text 
                        style={styles.text} >
                        Mapa
                    </Text>
                </Pressable>
                <Pressable 
                style={styles.button} 
                onPress={() => navigation.navigate('Usuario')} >
                    <Text 
                        style={styles.text} >
                        Usuario
                    </Text>
                </Pressable>
            </View>
            <Pressable
                style={styles.circularButton}
                onPress={navigateToAboutUs}
            >
                <Text style={styles.text}>?</Text>
            </Pressable>
        </View>
        );
    }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#55EBFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    userImage:{
        width: 100,
        height: 100,
        borderRadius: 100,
    },
    userContainer: {
        width: 400,
        height: 200,
        marginBottom: 20,

        borderRadius: 10,
        backgroundColor: '#00E0FF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    subContainer: {
        width: 400,
        height: 600,

        borderRadius: 10,

        backgroundColor: '#00E0FF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 200,
        padding: 15,
        margin: 10,
        alignItems: 'center',
    
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'white',
    },
    text: {
        color: 'white',
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
});
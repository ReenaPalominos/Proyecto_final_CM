import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import appFirebase from '../services/firebase';
import { getAuth } from 'firebase/auth';

const auth = getAuth(appFirebase);

export default function Vistas({ navigation }) {

    const userID = auth.currentUser;

    return (
        <View style={styles.container}>
            <View style={styles.userContainer}>
                <Text style={styles.text}>
                    {userID.email}
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
                onPress={() => navigation.navigate('Usuario')} >
                    <Text 
                        style={styles.text} >
                        Usuario
                    </Text>
                </Pressable>
            </View>
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
    }
});
import React from "react";
import { View,TextInput,Button,Text,StyleSheet, TouchableOpacity } from "react-native";
import { useState} from "react";

export default function AboutUs(){


    return(
        <View style={styles.container}>
            <Text>ABOUT US</Text>
            <Text style={styles.texto}>Esta aplicación fue desarrollada como trabajo final de la asignatura computación móvil
            de la Universidad Tecnológica Metropolitana de Santiago de Chile.</Text>
            <Text style={styles.texto}>
                Los estudiantes a cargo del desarrollo de esta aplicación son los siguientes:
            </Text>
            <Text style={styles.texto}>
                ° Martin Sobarzo 
            </Text>
            <Text style={styles.texto}>
                https://github.com/Meshdako
            </Text>
            <Text style={styles.texto}>
                ° Renato Palominos
            </Text>
            <Text style={styles.texto}>
                https://github.com/ReenaPalominos
            </Text>
            <Text style={styles.texto}>
                ° Rodrigo Ubilla
            </Text>
            <Text style={styles.texto}>
                https://github.com/RodrigoUbillaC
            </Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 16,
        padding: 10,
        margin: 10,
    },
    texto:{
        color: '#023e8a',
        fontSize: 16,
        marginTop: 5,
        fontWeight: 'bold',

    },
    integrante:{
        
    }
});


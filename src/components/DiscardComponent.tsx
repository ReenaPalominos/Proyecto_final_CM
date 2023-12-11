import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Alert, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

/* Para la subida de imágenes. */
import * as ImagePicker from "expo-image-picker";
import { getDatabase, ref as refDatabase, set } from 'firebase/database';
import { getStorage, ref as refStorage, deleteObject } from "firebase/storage";

interface DiscardComponentProps {
    navigation: any;
    tipo: string;
    token: string | number[];
}

export const DiscardComponent = ({ navigation, tipo, token }: DiscardComponentProps) => {
    const deletePost = async () => {
        const storage = getStorage();

        let storageRef;
        if ( tipo == "Evento") {
            storageRef = refStorage(storage, "Evento/" + token);
        } else {
            storageRef = refStorage(storage, "Denuncias/" + token);
        }

        deleteObject(storageRef)
        .then(() => {
            console.log("Elemento de la Storage eliminado correctamente");
        })
        .catch((error) => {
            console.error("Error al eliminar de la Storage: ", error);
        });
        
        Alert.alert(`${tipo} descartada correctamente`);
        navigation.navigate("Publicaciones");
    };

    return (
        <TouchableOpacity style={styles.discardPicker} onPress={deletePost}>
            <Ionicons name="trash" size={24} color="white" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    discardPicker: {
        position: "absolute",
        bottom: 65,
        left: '44%',
        width: 70,
        height: 70,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
    },
});
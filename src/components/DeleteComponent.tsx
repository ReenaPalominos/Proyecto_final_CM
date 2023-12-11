import React from 'react';
import { StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

/* Para la subida de imágenes. */
import * as ImagePicker from "expo-image-picker";
import { getDatabase, ref, set } from 'firebase/database';

interface DeleteComponentProps {
    navigation: any;
    tipo: string;
    token: string | number[];
}

export const DeleteComponent = ({ navigation, tipo, token }: DeleteComponentProps) => {
    const deletePost = async () => {
        const db = getDatabase();

        let newFormRef;
        if (tipo == "Eventos") {
            newFormRef = ref(db, "Eventos/" + token);
        } else {
            newFormRef = ref(db, "Denuncias/" + token);
        }

        set(newFormRef, null)
            .then(() => {
                console.log("Eliminado correctamente");
            }
            ).catch((error) => {
                console.error("Error al eliminar: ", error);
            });
        
        Alert.alert(`${tipo} eliminado correctamente`);
        navigation.navigate("Publicaciones");
    };

    return (
        <TouchableOpacity style={styles.imagePicker} onPress={deletePost}>
            <Ionicons name="trash" size={24} color="white" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    imagePicker: {
        position: "absolute",
        bottom: 90,
        right: 30,
        width: 45,
        height: 45,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
    },
});
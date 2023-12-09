import React from 'react';
import { StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

/* Para la subida de imágenes. */
import * as ImagePicker from "expo-image-picker";

interface IGaleryComponentProps {
    onImageSelected: (image: string) => void;
}

export const GaleryComponent = ({ onImageSelected }: IGaleryComponentProps) => {
    const selectImage = async () => {
        const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!granted) {
            alert("No se ha permitido el acceso a la galería.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: false,
            allowsEditing: true,
            aspect: [5, 4],
            quality: 1,
        });

        if (!result.canceled) {
            onImageSelected(result.assets[0].uri);
        }
    };

    return (
        <TouchableOpacity style={styles.imagePicker} onPress={selectImage}>
            <Ionicons name="image" size={24} color="white" />
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
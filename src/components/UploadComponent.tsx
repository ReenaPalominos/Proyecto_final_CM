import React, { useEffect, useState } from 'react';
import { Alert, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { storage } from "../services/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import uuid from 'react-native-uuid';

interface IUploadComponentProps {
    image: string;
    imageToken: string | number[];
    uploading: boolean;
    transferred: number;
    fileUpload: boolean;
}

export const UploadComponent = ({ image, imageToken, uploading, transferred, fileUpload }: IUploadComponentProps) => {
    const uploadImage = async() => {
        const response = await fetch(image);
        const blob = await response.blob();

        const _token = uuid.v4();
        const storageRef = ref(storage, "Denuncias/" + _token);
        const uploadTask = uploadBytesResumable(storageRef, blob);

        uploading = true;
        transferred = 0;

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Progreso: " + progress + "% cumplido.");
                transferred = progress;
            },
            (error) => {
                console.log("Error al subir la imagen: " + error.toString());
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("Archivo disponible en: " + downloadURL);
                    Alert.alert('Foto subida con éxito!');
                    image = "";
                    fileUpload = true;
                });
            },
        );
        
        imageToken = _token;
        uploading = false;
    }

    return (
        <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
            <Text style={styles.buttonText}>Subir Imagen</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    uploadButton: {
        borderRadius: 5,
        width: 150,
        height: 50,
        backgroundColor: '#ffb6b9',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    },
});
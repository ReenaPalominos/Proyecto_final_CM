import React, { useEffect, useState } from 'react';
import { Alert, TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';
import { storage } from "../../services/firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import * as Progress from 'react-native-progress';
import uuid from 'react-native-uuid';

interface IUploadComponentProps {
    onUploadUpdate: (image: string, token: string | number[], fileUpload: boolean, file: unknown) => void;

    image: string;
}

export const UploadEventComponent = ({ image, onUploadUpdate }: IUploadComponentProps) => {   
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [token, setToken] = useState<string | number[]>("");
    const [pressed, setPressed] = useState(false);

    const imageSelected = image;
    const _token = uuid.v4();

    const uploadImage = async() => {
        const response = await fetch(image);
        const blob = await response.blob();

        return new Promise((resolve, reject) => {
            

            const storageRef = ref(storage, "Eventos/" + _token);
            const uploadTask = uploadBytesResumable(storageRef, blob);

            setTransferred(0);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Progreso: " + progress + "%");
                    setTransferred(progress);
                },
                (error) => {
                    console.log("Error al subir la imagen: " + error.toString());
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log("Archivo disponible en: " + downloadURL);
                        resolve(downloadURL);
                    });
                },
            );
        });
    };

    return (
        <View style={styles.imageContainer}>
            {imageSelected !== "" ? (
                <Image source={{ uri: imageSelected }} style={styles.imageBox} />
            ) : ""}
            
            {uploading ? (
                <View style={styles.progressBarContainer}>
                    <Progress.Bar progress={transferred} width={300} />
                </View>
            ) : (
            <TouchableOpacity 
                style={ imageSelected != "" ?
                    (pressed ? styles.pressButton : styles.pressableButton) 
                        : (styles.uploadButton)
                } 
                onPress={ async () => {
                    setPressed(true);
                    setUploading(true);
                    try {
                        const response = await uploadImage();
                        Alert.alert('Foto subida con éxito!');
                        onUploadUpdate("", _token, true, response);
                    } catch (error) {
                        console.log("Error al subir la imagen: " + error);
                    }
                    setUploading(false);
                    setPressed(false);
                }}
            >
                <Text style={styles.buttonText}>Subir Imagen</Text>
            </TouchableOpacity> )} 
        </View>
    );
};

const styles = StyleSheet.create({
    progressBarContainer: {
        marginTop: 20
    },
    pressableButton: {
        borderRadius: 5,
        width: 150,
        height: 50,
        backgroundColor: '#f53b42',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    pressButton: {
        borderRadius: 5,
        width: 150,
        height: 50,
        backgroundColor: '#ffb6b9',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
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
    imageContainer: {
        marginTop: 30,
        marginBottom: 50,
        alignItems: 'center'
    },
    imageBox: {
        width: 450,
        height: 300,

        marginTop: 20,
    },
});
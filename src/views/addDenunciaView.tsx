import React, { useEffect, useState } from 'react';
import {
    Button,
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TouchableOpacity,
    Platform,
    Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

/* FireBase */
import { db, storage } from "../services/firebase";
import { ref, uploadBytesResumable, getStorage, getDownloadURL } from 'firebase/storage';

/* Para la subida de imágenes. */
import * as ImagePicker from "expo-image-picker";;
import * as Progress from 'react-native-progress';
import uuid from 'react-native-uuid';


export default function AddDenuncia() {
    const [image, setImage] = useState<string>("");
    const [imageToken, setImageToken] = useState<string | number[]>("");

    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [fileUpload, setFileUpload] = useState(false);

    const [file, setFile] = useState<string>("");

    /* Subir imagen a FireBase. */
    const uploadImage = async () => {
        const response = await fetch(image);
        const blob = await response.blob();

        const _token = uuid.v4();
        const storageRef = ref(storage, "Denuncias/" + _token);
        const uploadTask = uploadBytesResumable(storageRef, blob);

        setUploading(true);
        setTransferred(0);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Progreso: " + progress + "% cumplido.");
                setTransferred(progress);
            },
            (error) => {
                console.log("Error al subir la imagen: " + error.toString());
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("Archivo disponible en: " + downloadURL);
                    Alert.alert('Foto subida con éxito!');
                    setImage("");
                    
                    setFileUpload(true);
                });
            },
        );
        
        setImageToken(_token);
        setUploading(false);
    };

    /* Selector de imágenes. */
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
            setImage(result.assets[0].uri);
        }
    };

    useEffect(() => {
        if (fileUpload) {
            const storage = getStorage();

            getDownloadURL(ref(storage, 'Denuncias/' + imageToken))
                .then((url) => {
                    console.log(url);
                    setFile(url);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [fileUpload, imageToken]);

    return (
        <SafeAreaView style={styles.container}>
            {fileUpload ? (
                <View>
                    <Text style={styles.textContainer}>Imagen Subida</Text>
                    {file !== "" ? (
                        <Image source={{ uri: file }} style={styles.imageBox} />
                    ) : ""}
                </View>
            ) : (
                <>
                    <TouchableOpacity style={styles.imagePicker} onPress={selectImage}>
                        <Ionicons name="image" size={24} color="white" />
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.cameraPicker} /* onPress={selectImage} */>
                        <Ionicons name="camera" size={24} color="white" />
                    </TouchableOpacity>
                    
                    <Text style={styles.titleContainer}>Subir imagen</Text>
                    <Text style={styles.textContainer}>Vamos a seleccionar la imagen o puedes capturar una.</Text>
                    
                    <View style={styles.imageContainer}>
                        {image !== "" ? (
                            <Image source={{ uri: image }} style={styles.imageBox} />
                        ) : ""}
                        
                        {uploading ? (
                            <View style={styles.progressBarContainer}>
                                <Progress.Bar progress={transferred} width={300} />
                            </View>
                        ) : (
                            <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
                                <Text style={styles.buttonText}>Subir Imagen</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </>
            )}
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 16,
        padding: 10,
        margin: 10,
    },
    titleContainer: {
        fontSize: 36,
        marginTop: 20,
        marginBottom: 20, 
        textAlign: 'center'
    },
    textContainer: {
        fontSize: 14,
        marginTop: 20,
        textAlign: 'center'
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
    progressBarContainer: {
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
    cameraPicker: {
        position: "absolute",
        bottom: 30,
        right: 30,
        width: 45,
        height: 45,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 25,
    },
});
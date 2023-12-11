import React, { useState, useEffect } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Alert, TextInput } from "react-native";

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../navigators/NavBar';
import { useNavigation } from '@react-navigation/native';

import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getDatabase, ref as databaseRef, set } from "firebase/database";
import { storage } from "../services/firebaseConfig";
import { auth } from "../services/firebaseConfig";

import { GaleryComponent } from '../components/GaleryComponent';
import Loading from "../components/Loading";
import Error from "../components/Error";

export default function Usuario() {
    const [isPressed, setIsPressed] = useState(false);

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [image, setImage] = useState<string>("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const userID = auth.currentUser;

    const navigation = useNavigation();

    useEffect(() => {
        setEmail(userID?.email || 'No hay ningún usuario autenticado');
    }, []);

    const handleImage = (imageUrl: string) => {
        setImage(imageUrl);
    };

    const UploadProfile = async (response: unknown) => {
        setLoading(true);
        const user_uid = userID?.uid;
    
        const formData = {
            user_uid,
            email,
            username,
        };
    
        const db = getDatabase();
    
        const newFormRef = databaseRef(db, "Profile/" + user_uid);
    
        try {
            await set(newFormRef, formData);
    
            console.log("Perfil actualizado con éxito");
            Alert.alert("Perfil actualizado con éxito");
    
            setUsername("");
            setImage("");
            setEmail("");
            setLoading(false);
    
            navigation.navigate('Vistas');
    
            // Devuelve la URL de la imagen (puedes personalizar esto según tus necesidades)
            return response;
        } catch (error) {
            console.log("Error al actualizar el perfil: " + error);
            setError(true);
            setLoading(false);
            return null; // Retorna null en caso de error
        }
    };    

    const uploadImage = async () => {
        const response = await fetch(image);
        const blob = await response.blob();

        return new Promise((resolve, reject) => {

            const user_uid = userID?.uid;
            const _storageRef = storageRef(storage, "Profile/" + user_uid);
            const uploadTask = uploadBytesResumable(_storageRef, blob);


            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log("Progreso: " + progress + "%");
                },
                (error) => {
                    console.log("Error al subir la imagen: " + error.toString());
                    reject(error);
                    setError(true);
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
        <SafeAreaView style={styles.container}>
            {loading ? (
                <Loading />
            ) : error ? (
                <Error />
            ) : (
                <View style={styles.formContainer}>
                    <Text style={styles.titleContainer}>
                        Formulario de Perfil
                    </Text>

                    <TextInput
                        style={styles.input}
                        value={email}
                        editable={false}
                    />
                    <TextInput
                        style={styles.input}
                        onChangeText={setUsername}
                        value={username}
                        placeholder="Nombre de usuario"
                    />

                    <GaleryComponent
                        onImageSelected={handleImage}
                    />

                    
                    {image !== "" ? (
                        <Image source={{ uri: image }} style={styles.imageBox} />
                    ) : (
                        <View>
                            <Text style={styles.titleContainer}>Subir imagen</Text>
                            <Text style={styles.textContainer}>Selecciona una imagen de tu galería.</Text>
                        </View>
                    )}

                    <TouchableOpacity
                        style={isPressed ? styles.buttonPressed : styles.button}
                        onPressIn={() => setIsPressed(true)}
                        onPressOut={() => setIsPressed(false)}
                        onPress={async () => {
                            const response = await uploadImage();
                            
                            UploadProfile(response);
                        }}
                    >
                        <Text style={styles.buttonText}>Enviar!</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    formContainer: {
        flex: 1,
        
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 16,
        padding: 20,
        margin: 10,
    },
    titleContainer: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 20,
        marginBottom: 45,
    },
    textContainer: {
        fontSize: 14,
        marginTop: 20,
        textAlign: 'center'
    },
    input: {
        width: '100%',
        height: 40,

        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
    },
    imageBox: {
        width: 300,
        height: 300,

        alignSelf: 'center',

        marginTop: 20,
        marginBottom: 20,

        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 200,
    },
    button: {
        width: '50%',
        top: '5%',
        left: '25%',
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonPressed: {
        width: '50%',
        top: '5%',
        left: '25%',
        backgroundColor: '#0056b3',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
    },
});

import React, { useState } from 'react';
import { StyleSheet, Image, View, Text, Button, TextInput, Alert, Pressable, SafeAreaView } from 'react-native';
import { BlurView } from "expo-blur";

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../navigators/NavBar';

import { signIn } from '../services/auth';
import {auth} from '../services/firebaseConfig';

import { getDatabase, ref as databaseRef, set } from "firebase/database";
import { GaleryComponent } from '../components/GaleryComponent';
import { storage } from "../services/firebaseConfig";
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

interface IUploadComponentProps {
    onUploadUpdate: (image: string, token: string | number[], fileUpload: boolean, file: unknown) => void;

    image: string;
}

type Props = {
    navigation: NativeStackNavigationProp<StackParamList>;
}

export const CreateUserComponent = ({ navigation } : Props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isButtonPressed, setIsButtonPressed] = useState(false);

    const [image, setImage] = useState<string>("https://noticias.imer.mx/wp-content/uploads/2023/04/PORTADA-1.png");




    const [transferred, setTransferred] = useState(0);


    const imageSelected = image;

    const registerApp = async () => { 
        setIsButtonPressed(true);

        const success = await signIn(email, password);
        if (success) {
            Alert.alert('Usuario Creado','Redirigiendo al inicio de sesión...');
            const userID = auth.currentUser;
            console.log("uid creado: "+userID?.uid);
            createProfile(userID?.uid);
            navigation.navigate('Login');
        } else {
            Alert.alert('Error','Usuario o contraseña incorrectos');
        }
        
        setIsButtonPressed(false);
    };

    
    const createProfile = async (user_uid: string | undefined) => {
        // console.log(userID);
        // const uid = userID?.uid;
        // console.log("UID: " + uid)
        const username = email;

        const formData = {
            user_uid,
            email,
            username,
        };

        const db = getDatabase();

        // console.log("Token: " + token);

        const newFormRef = databaseRef(db, "Profile/" + user_uid);

        set(newFormRef, formData)
            .then(() => {
                console.log("Formulario enviado con éxito");
                // Alert.alert("Formulario enviado con éxito");
            })
            .catch((error) => {
                console.log("Error al enviar el formulario: " + error);
            });

            const response = await fetch(image);
            const blob = await response.blob();
    
        
                const _storageRef = storageRef(storage, "Profile/" + user_uid);
                const uploadTask = uploadBytesResumable(_storageRef, blob);
    
                setTransferred(0);
    
                uploadTask.on(
                    "state_changed",
                    (snapshot) => {
                        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log("Progreso: " + progress + "%");
                        // setTransferred(progress);
                    },
                    (error) => {
                        console.log("Error al subir la imagen: " + error.toString());
                    }
                );
            };


    return (
        <SafeAreaView style={styles.container} >
            <BlurView intensity={70} tint="light" style={styles.blurContainer}>
                <Image 
                    style={styles.image}
                    source={require("../../assets/icons/adaptive-icon.png")}
                />
                <Text style={styles.title}>Crea tu Cuenta</Text>
                <TextInput style={styles.textInputContainer} placeholder="Ingresa tu email" onChangeText={(text) => setEmail(text)} />
                <TextInput style={styles.textInputContainer} placeholder="Crea una contraseña..." onChangeText={(text) => setPassword(text)} secureTextEntry />
                <Pressable style={isButtonPressed ? styles.pressedButton : styles.button} onPress={registerApp}>
                    <Text style={isButtonPressed ? styles.pressedText : styles.text}>Crear Usuario</Text>
                </Pressable>
            </BlurView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: '#55EBFF',

        alignItems: 'center',
        justifyContent: 'center',
    },
    blurContainer: {
        width: 400,
        height: 500,

        borderRadius: 20,

        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 100,
        height: 100,
        
        marginBottom: 40,
    },
    textInputContainer: {
        width: 300,
        height: 50,
        marginBottom: 20,
        padding: 10,

        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'white',

        color: '#000',
        backgroundColor: 'white',

        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        width: 200,
        padding: 15,
        margin: 10,
        alignItems: 'center',
    
        borderRadius: 5,

        backgroundColor: '#00E0FF',
    },
    pressedButton: {
        width: 200,
        padding: 15,
        margin: 10,
        alignItems: 'center',
    
        borderRadius: 5,

        backgroundColor: '#E0FBFC',
    },
    title: {
        marginBottom: 30,
        fontSize: 26,
        color: 'grey',
        fontWeight: 'bold',
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    pressedText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
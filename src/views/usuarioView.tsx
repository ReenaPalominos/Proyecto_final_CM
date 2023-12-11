import React, { useState, useEffect } from 'react';
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
    Alert,
    TextInput
} from "react-native";

import { auth } from "../services/firebaseConfig";

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../navigators/NavBar';
import { useNavigation } from '@react-navigation/native';

import { getDatabase, ref as databaseRef, set } from "firebase/database";
import { GaleryComponent } from '../components/GaleryComponent';
import { storage } from "../services/firebaseConfig";
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import * as Progress from 'react-native-progress';
import uuid from 'react-native-uuid';

interface IUploadComponentProps {
    onUploadUpdate: (image: string, token: string | number[], fileUpload: boolean, file: unknown) => void;

    image: string;
}

type Props = {
    navigation: NativeStackNavigationProp<StackParamList>;
}

export default function Usuario() {
    const [email, setEmail] = useState(''); // Correo electrónico
    const [username, setUsername] = useState(''); // Nombre de usuario
    const [isPressed, setIsPressed] = useState(false);
    
    
    
    const [file, setFile] = useState<unknown>(""); // Foto de perfil
    const [image, setImage] = useState<string>("");
    const [imageToken, setImageToken] = useState<string | number[]>("");
    const [fileUpload, setFileUpload] = useState(false);


    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [token, setToken] = useState<string | number[]>("");
    const [pressed, setPressed] = useState(false);

    const imageSelected = image;
    const _token = uuid.v4();

    const handleImage = (imageUrl: string) => {
        setImage(imageUrl);
    };

    const handleUpload = (image: string, imageToken: string | number[], fileUpload: boolean, file: unknown) => {
        console.log(" ImageToken: " + imageToken + " FileUpload: " + fileUpload + " File: " + file);
        
        setImage(image);
        setImageToken(imageToken);
        setFileUpload(fileUpload);
        setFile(file);
    };

    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

    const userID = auth.currentUser;
    useEffect(() => {
        setEmail(userID?.email || 'No hay ningún usuario autenticado');
    }, []);

    const handleSubmit = ({ navigation }: Props) => {

        console.log(userID);
        const user_uid = userID?.uid;
        console.log("UID: " + user_uid)

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
                Alert.alert("Formulario enviado con éxito");
            })
            .catch((error) => {
                console.log("Error al enviar el formulario: " + error);
            });

        setUsername("");

        navigation.navigate('Usuario');
    };

    const uploadImage = async() => {
        const response = await fetch(image);
        const blob = await response.blob();

        return new Promise((resolve, reject) => {
            
            const user_uid = userID?.uid;
            const _storageRef = storageRef(storage, "Profile/" + user_uid);
            const uploadTask = uploadBytesResumable(_storageRef, blob);

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
        <SafeAreaView style={styles.container}>
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
            <View>
                <GaleryComponent
                        onImageSelected={handleImage}
                    />
                <Text style={styles.titleContainer}>Subir imagen</Text>
                <Text style={styles.textContainer}>Selecciona una imagen de tu galería.</Text>
                {imageSelected !== "" ? (
                <Image source={{ uri: imageSelected }} style={styles.imageBox} />
                ) : ""}
                
            </View>

            <TouchableOpacity
                style={isPressed ? styles.buttonPressed : styles.button}
                onPressIn={() => setIsPressed(true)}
                onPressOut={() => setIsPressed(false)}
                onPress={ async () => {
                    setPressed(true);
                    setUploading(true);
                    try {
                        const response = await uploadImage();
                        Alert.alert('Foto subida con éxito!');
                        handleUpload("", _token, true, response);
                    } catch (error) {
                        console.log("Error al subir la imagen: " + error);
                    }
                    setUploading(false);
                    setPressed(false);
                    handleSubmit({ navigation })
                }}
            >
                <Text style={styles.buttonText}>Enviar!</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    inputDescription: {
        width: '100%',
        height: 100,

        textAlign: "left",

        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
    },
    inputLatitud: {
        width: '45%',
        height: 40,

        textAlign: "center",
        borderColor: 'gray',
        borderWidth: 1,

        padding: 10,
    },
    inputLongitud: {
        width: '45%',
        height: 40,

        textAlign: "center",
        borderColor: 'gray',
        borderWidth: 1,

        marginLeft: 10,
        padding: 10,
    },
    imageBox: {
        width: '100%',
        height: 150,

        marginTop: 20,
        marginBottom: 20,
    },
    button: {
        width: '100%',
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonPressed: {
        width: '100%',
        backgroundColor: '#0056b3',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontSize: 16,
    },
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
   
    imageContainer: {
        marginTop: 30,
        marginBottom: 50,
        alignItems: 'center'
    },
});
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
    Alert,
    TextInput
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { auth } from "../services/firebaseConfig";
import { getDatabase, ref, set } from "firebase/database";

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../navigators/NavBar';
import { useNavigation } from '@react-navigation/native';

type Props = {
    navigation: NativeStackNavigationProp<StackParamList>;
}

interface IGaleryComponentProps {
    token: string | number[];
    file: string | unknown;
}

export const FormComponent = ({ token, file }: IGaleryComponentProps) => {
    const [userId, setUserId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isPressed, setIsPressed] = useState(false);

    const userID = auth.currentUser;
    
    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

    useEffect(() => {
        setUserId(userID?.email || 'No hay ningún usuario autenticado');
    }, []);

    const handleSubmit = ({ navigation }: Props) => {

        const date = new Date();
        const timestamp = date.getTime();

        const formData = {
            token,
            timestamp,
            title,
            description,
            file,
            userId,
        };

        const db = getDatabase();

        console.log("Token: " + token);
        
        const newFormRef = ref(db, "Denuncias/" + token);
        
        set(newFormRef, formData)
            .then(() => {
                console.log("Formulario enviado con éxito");
                Alert.alert("Formulario enviado con éxito");
            })
            .catch((error) => {
                console.log("Error al enviar el formulario: " + error);
            });

        setUserId("");
        setDescription("");

        navigation.navigate('Denuncias');
    };


    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titleContainer}>
                Formulario de denuncia
            </Text>
            <TextInput
                style={styles.input}
                onChangeText={setUserId}
                value={userId}
                editable={false}
            />
            <TextInput
                style={styles.input}
                onChangeText={setTitle}
                value={title}
                placeholder="Título de la denuncia..."
            />
            <TextInput
                style={styles.inputDescription}
                onChangeText={setDescription}
                value={description}
                placeholder="Descripción de la denuncia..."
                multiline
                numberOfLines={4}
            />

            {file !== "" ? (
                <Image source={{ uri: file as string }} style={styles.imageBox} />
            ) : ""}

            <TouchableOpacity
                style={isPressed ? styles.buttonPressed : styles.button}
                onPressIn={() => setIsPressed(true)}
                onPressOut={() => setIsPressed(false)}
                onPress={() => handleSubmit({ navigation })}
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
    input: {
        width: 450,
        height: 40,

        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
    },
    inputDescription: {
        width: 450,
        height: 100,
        
        textAlign: "left",

        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 10,
    },
    imageBox: {
        width: 450,
        height: 300,

        marginTop: 20,
        marginBottom: 20,
    },
    button: {
        width: 450,
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonPressed: {
        width: 450,
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
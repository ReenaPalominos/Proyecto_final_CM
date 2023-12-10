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

import { auth } from "../../services/firebaseConfig";
import { getDatabase, ref, set } from "firebase/database";

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../../navigators/NavBar';
import { useNavigation } from '@react-navigation/native';
import { setLogLevel } from 'firebase/app';
import { getLocation } from '../../services/location';

type Props = {
    navigation: NativeStackNavigationProp<StackParamList>;
}

interface IGaleryComponentProps {
    token: string | number[];
    file: string | unknown;
}

export const FormEventComponent = ({ token, file }: IGaleryComponentProps) => {
    const [userId, setUserId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [latitud, setLatitud] = useState('');
    const [longitud, setLongitud] = useState('');
    const [isPressed, setIsPressed] = useState(false);

    const userID = auth.currentUser;
    
    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>();

    useEffect(() => {
        setUserId(userID?.email || 'No hay ningún usuario autenticado');
        setubication()
    }, []);
    
    const setubication=async() => {
        let ubicacion= await getLocation();
        if(ubicacion!==undefined){
            let [lat,lon]=ubicacion;
            setLatitud(lat);
            setLongitud(lon);
        }
    }

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
            latitud,
            longitud,
        };

        const db = getDatabase();

        console.log("Token: " + token);
        
        const newFormRef = ref(db, "Eventos/" + token);
        
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

        navigation.navigate('Eventos');
    };


    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.titleContainer}>
                Formulario de Eventos
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
                placeholder="Título del evento..."
            />
            <TextInput
                style={styles.inputDescription}
                onChangeText={setDescription}
                value={description}
                placeholder="Descripción del evento..."
                multiline
                numberOfLines={4}
            />
            <View style={{
                    width: '100%',
                    height: 90,
                    borderColor: 'gray',
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Text>Ubicación</Text>
                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    height: 60,
                    alignItems: 'center',
                    justifyContent: 'center',
                    }}
                >
                    <TextInput
                        style={styles.inputLatitud}
                        value={latitud}
                        editable={false}
                    />
                    <TextInput
                        style={styles.inputLongitud}
                        value={longitud}
                        editable={false}
                    />
                </View>
                
            </View>

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
});
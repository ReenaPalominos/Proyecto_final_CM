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

/* FireBase */
import { db, storage } from "../../services/firebaseConfig";
import { ref, uploadBytesResumable, getStorage, getDownloadURL } from 'firebase/storage';

/* Para la subida de imágenes. */
import * as ImagePicker from "expo-image-picker";;
import * as Progress from 'react-native-progress';
import uuid from 'react-native-uuid';

/* Components */
import { AddDenunciaComponent } from "../../components/denuncias/AddDenunciaComponent";


export default function AddDenuncia() {
    const [image, setImage] = useState<string>("");
    const [imageToken, setImageToken] = useState<string | number[]>("");

    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [fileUpload, setFileUpload] = useState(false);

    const [file, setFile] = useState<string>("");

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
            <AddDenunciaComponent />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 16,
        padding: 10,
        margin: 10,
    },
});
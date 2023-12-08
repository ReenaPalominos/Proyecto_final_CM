import React, { useEffect, useState } from "react";
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
import { db, storage } from "../services/firebaseConfig";
import { ref, uploadBytesResumable, getStorage, getDownloadURL } from 'firebase/storage';

/* Para la subida de imágenes. */
import * as ImagePicker from "expo-image-picker";;
import * as Progress from 'react-native-progress';
import uuid from 'react-native-uuid';

/* Components */
import { GaleryComponent } from "./GaleryComponent";
import { UploadComponent } from "./UploadComponent";



export const denunciaComponent = () => {
    const [image, setImage] = useState<string>("");
    const [imageToken, setImageToken] = useState<string | number[]>("");

    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [fileUpload, setFileUpload] = useState(false);

    const [file, setFile] = useState<string>("");



    return (
        <SafeAreaView style={styles.container}>
            {fileUpload ? (
                <View>
                    <Text style={styles.titleContainer}>Nueva Denuncia</Text>
                    
                    {file !== "" ? (
                        <Image source={{ uri: file }} style={styles.imageBox} />
                    ) : ""}
                    <Text style={styles.textContainer}>Descripción</Text>
                    <TextInput style={styles.textContainer} placeholder="Ingresa una descripción..." />
                </View>
            ) : (
                <>
                    <GaleryComponent
                        image={image}
                    />
                    
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
                            <UploadComponent
                                image={image}
                                imageToken={imageToken}
                                uploading={uploading}
                                transferred={transferred}
                                fileUpload={fileUpload}
                            />
                        )}
                    </View>
                </>
            )}
            
        </SafeAreaView>
    );
};

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
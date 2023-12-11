import { Camera, CameraType, FlashMode } from "expo-camera"
import * as MediaLibrary from 'expo-media-library';
import React from "react";
import { useEffect, useRef, useState } from "react"
import { View, StyleSheet, Button, TouchableOpacity, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

type ZoomTypes = 'add' | 'sub';

export const CamComponent = () => {

    const faceOptions = {
        detectLandmarks: 'none',
        mode: 'accurate',
        tracking: true,
    };

    const cameraRef = useRef<any>(null)

    const [Type, setType] = useState(CameraType.back);
    const [Photo, setPhoto] = useState<any>(undefined);
    const [HasCameraPermission, setHasCameraPermission] = useState(false);
    const [HasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(false);
    const [Zoom, setZoom] = useState(0);
    const [Flash, setFlash] = useState(FlashMode.off);

    const takePicture = async () => {
        const options = {
            quality: 1,
            base64: true,
            exif: false,
        }
        const NewPhoto = await cameraRef.current.takePictureAsync(options);
        setPhoto(NewPhoto);
    }

    const ToggleCameraType = () => {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const ToggleFlash = () => {
        setFlash(current => (current === FlashMode.off ? FlashMode.torch : FlashMode.off))
    }

    const getPermissions = async () => {
        const CameraPermission = await Camera.requestCameraPermissionsAsync();
        const MediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
        setHasCameraPermission(CameraPermission.status === 'granted');
        setHasMediaLibraryPermission(MediaLibraryPermission.status === 'granted');
    }

    const DiscardPhoto = () => {
        setPhoto(undefined);
    }

    const UpLoadPhoto = () => {
        MediaLibrary.saveToLibraryAsync(Photo.uri).then(() => {
            setPhoto(undefined);
        })
    }

    const handlerZoom = (type: ZoomTypes) => {
        if (type === 'add') {
            if (Zoom <= 0.998) {
                setZoom(Zoom + 0.01)
            }
        }
        if (type === 'sub') {
            if (Zoom >= 0.002) {
                setZoom(Zoom - 0.01)
            }
        }
    }

    useEffect(() => {
        getPermissions();
    }, [])

    if (HasCameraPermission === undefined || HasMediaLibraryPermission === undefined) {
        return <View></View>;
    }

    if (!HasCameraPermission || !HasMediaLibraryPermission) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Es necesario que nos otorgue el permiso de usar su cámara y guardar fotografías en su galería</Text>
                <Button onPress={getPermissions} title="Dar permiso de uso de cámara y galería" />
            </View>
        );
    }
    if (Photo) {
        return (
            <View style={styles.container}>
                <Image source={{ uri: "data:image/jpg;base64," + Photo.base64 }} style={styles.preview} />
                <View style={styles.buttonContainerImage}>
                    <TouchableOpacity style={styles.button} onPress={DiscardPhoto}>
                        <Ionicons name="trash" size={24} color="white" />
                        <Text style={styles.text}>Borrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={UpLoadPhoto}>
                        <Ionicons name="save" size={24} color="white" />
                        <Text style={styles.text}>Guardar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={Type} flashMode={Flash} ref={cameraRef} zoom={Zoom} faceDetectorSettings={faceOptions}  >
                <View style={styles.buttonContainer}>

                    <TouchableOpacity style={styles.button} onPress={takePicture}>
                        <Ionicons name="camera" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={ToggleCameraType}>
                        <Ionicons name="repeat-sharp" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={ToggleFlash}>
                        <Ionicons name="flash" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => handlerZoom('add')}>
                        <AntDesign name="pluscircleo" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => handlerZoom('sub')}>
                        <AntDesign name="minuscircleo" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    buttonContainerImage: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#000',
        margin: 0,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    preview: {
        alignSelf: 'stretch',
        height: '90%'
    },
    textHelper: {
        color: '#fff',
        backgroundColor: '#000'
    }
});

import { Camera, CameraType } from "expo-camera"
import React from "react";
import { useEffect, useRef, useState } from "react"
import { View,StyleSheet, Button, TouchableOpacity, Text, Image} from "react-native";

type ZoomTypes = 'add'| 'sub';

export const CamComponent= ()=>{

    const faceOptions = {
        detectLandmarks: 'none',
        mode: 'accurate',
        tracking: true,
    };
    
    const cameraRef= useRef<any>(null)

    const [Type, setType] = useState(CameraType.back);
    const [Photo, setPhoto]=useState<any>(undefined);
    const [HasCameraPermission, setHasCameraPermission]= useState(false);
    const [Zoom, setZoom]= useState(0);
    
    const takePicture = async ()=>{
        const options = {
            quality: 1,
            base64: true,
            exif: false,
        }
        const NewPhoto = await cameraRef.current.takePictureAsync(options);
        setPhoto(NewPhoto);
    }

    const ToggleCameraType=()=>{
        setType(current=>(current===CameraType.back ? CameraType.front : CameraType.back));
    }
    
    const getPermission = async()=>{
        const CameraPermission = await Camera.requestCameraPermissionsAsync();

        setHasCameraPermission(CameraPermission.status=== 'granted');
    }

    const DiscardPhoto=() =>{
        setPhoto(undefined);
    }

    const handlerZoom = (type:ZoomTypes) =>{
        if(type ==='add'){
            if(Zoom <= 0.998){
                setZoom(Zoom + 0.002)
            }
        }
        if(type ==='sub'){
            if(Zoom >= 0.998){
                setZoom(Zoom - 0.002)
            }
        }
    }

    useEffect(()=>{
        getPermission();
    },[])

    if (HasCameraPermission === undefined ){
        return <View></View>;
    }

    if (!HasCameraPermission){
        return(
            <View style={styles.container}>
                <Text style={styles.text}>We need your permission to show the camera</Text>
                <Button onPress={getPermission} title="grant permission" />
            </View>
        );
    }
    if (Photo) {
        return (
            <View style={styles.container}>
                <Image source={{ uri: "data:image/jpg;base64," + Photo.base64 }} style={styles.preview} />
                <View style={styles.buttonContainerImage}>
                    <TouchableOpacity style={styles.button} onPress={DiscardPhoto}>
                        <Text style={styles.text}>Discard Photo</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={Type} ref={cameraRef} zoom={Zoom} faceDetectorSettings={faceOptions} >
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={ToggleCameraType}>
                        <Text style={styles.text}>Flip Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={takePicture}>
                        <Text style={styles.text}>Take Picture</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => handlerZoom('add')}>
                        <Text style={styles.text}>+</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => handlerZoom('sub')}>
                        <Text style={styles.text}>-</Text>
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
        margin: 64,
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
        height: '75%'
    }, 
    textHelper:{
        color: '#fff',
        backgroundColor: '#000'
    }
});

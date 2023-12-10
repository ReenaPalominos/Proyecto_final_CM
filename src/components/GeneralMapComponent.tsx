import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { getLocation } from "../services/location";


export const GMapComponent= () => {
    
    const [latitud,setLatitud]=useState(0);
    const [longitud,setLongitud]=useState(0);
    const getIntLocation=async() => {
        let ubicacion= await getLocation();
        if(ubicacion!==undefined){
            let [lat,lon]=ubicacion;
            setLatitud(Number(lat));
            setLongitud(Number(lon));
        }
    }
   
   useEffect(() => {
    getIntLocation();
    }, []);

    const [markers, setMarkers] = useState([{ latitude: latitud, longitude: longitud }])

    return (
        <View style={styles.container}>
            <MapView style={styles.map} provider={'google'} showsUserLocation showsMyLocationButton initialRegion={{latitude: latitud, longitude: longitud, latitudeDelta: 0.01, longitudeDelta: 0.01}}>
                {markers.map((marker, index) => (
                    <Marker key={index} coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}></Marker>
                ))}
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%'
    },
    map: {
        width: '100%',
        height: '100%',
    },
});
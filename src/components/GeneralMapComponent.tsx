import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";


interface MapComponentProps {
    latitud: number;
    longitud: number;
}

export const MapComponent: React.FC<MapComponentProps> = ({ latitud, longitud }) => {
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
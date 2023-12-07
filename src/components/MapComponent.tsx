import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";

export const MapComponent = () => {

    const [markers, setMarkers] = useState([{ latitude: -33.466008, longitude: -70.598194 }])

    return (
        <View style={styles.container}>
            <MapView style={styles.map} provider={'google'} showsUserLocation showsMyLocationButton initialRegion={{latitude: -33.466008, longitude: -70.598194, latitudeDelta: 0.01, longitudeDelta: 0.01}}>
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
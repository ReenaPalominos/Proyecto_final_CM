import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { getLocation } from "../services/location";

import { Datos} from "../interfaces/datos.interface";
import Loading from "./Loading";

interface IProps {
    location_array: Datos[];
}

export const GMapComponent : React.FC<IProps> = ( {location_array} ) => {
    const [markers, setMarkers] = useState([{ latitude: 0, longitude: 0 }]);
    const [index, setIndex] = useState(0);
    const [latitud, setLatitud] = useState(0);
    const [longitud, setLongitud] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const newMarkers = location_array.map(location => ({
            latitude: Number(location.latitud),
            longitude: Number(location.longitud),
        }));
        
        console.log(index, newMarkers);
        setMarkers(newMarkers);
        setIndex(index + 1);
        setLoading(false);
    }, [location_array]);

    const setubication = async () => {
        setLoading(true);
        let ubicacion = await getLocation().then(()=>{
            if (ubicacion !== undefined) {
                const parsedLat = Number(ubicacion[0]);
                const parsedLon = Number(ubicacion[1]);
                setLatitud(parsedLat);
                setLongitud(parsedLon);
                console.log("Latitud: " + parsedLat + " Longitud: " + parsedLon);
                console.log("ubicacion: " + ubicacion);
              }
              setLoading(false); // Al terminar la carga de ubicación, cambiar a false
        })
      };
    
      useEffect(() => {
        setLoading(true);
        setubication();
        setLoading(false);
      }, []);

    return (
        <View style={styles.container}>
            {loading ? (
                <Loading /> ) : (
            <MapView style={styles.map} provider={'google'} showsUserLocation showsMyLocationButton initialRegion={{latitude: latitud, longitude: longitud, latitudeDelta: 0.01, longitudeDelta: 0.01}}>
                {markers.map((marker, index) => (
                    <Marker key={index} coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}></Marker>
                ))}
            </MapView>
                )}
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
import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { getLocation } from "../services/location";

import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../navigators/NavBar";

import { Datos } from "../interfaces/datos.interface";
import Loading from "./Loading";


type Props = {
    navigation: NativeStackNavigationProp<StackParamList>;

}

type MapProps = {
    location_array: Datos[];
}

export const GMapComponent: React.FC<MapProps & Props> = ({ location_array }) => {
    const [selectedMarker, setSelectedMarker] = useState<Datos>();
    const [markers, setMarkers] = useState([{ tipo: "", title: "", latitude: 0, longitude: 0 }]);
    const [latitud, setLatitud] = useState(-33.466073260671145);
    const [longitud, setLongitud] = useState(-70.59803679749545);
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();

    useEffect(() => {
        setLoading(true);
        const newMarkers = location_array.map(location => ({
            latitude: Number(location.latitud),
            longitude: Number(location.longitud),
            title: location.title,
            tipo: location.tipo,
        }));

        console.log(newMarkers);
        setMarkers(newMarkers);
        setLoading(false);
    }, [location_array]);

    const setubication = async () => {
        setLoading(true);
        let ubicacion = await getLocation().then(() => {
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

    const handleMarkerPress = (location: Datos) => {
        console.log("Marker pressed");
        if (selectedMarker === location) {
            navigation.navigate('Detalle', {
                tipo: location.tipo,
                token: location.token,
                title: location.title,
                description: location.description,
                timestamp: location.timestamp,
                file: location.file,
                userId: location.userId,
                latitud: location.latitud,
                longitud: location.longitud,
            });
        } else {
            setSelectedMarker(location);
        }
    };

    useEffect(() => {
        setLoading(true);
        setubication();
        setLoading(false);
    }, []);

    return (
        <View style={styles.container}>
            {loading ? (
                <Loading />) : (
                <MapView style={styles.map} provider={'google'} showsUserLocation showsMyLocationButton initialRegion={{ latitude: latitud, longitude: longitud, latitudeDelta: 0.01, longitudeDelta: 0.01 }}>
                    {location_array.map((marker, index) => (
                        <Marker
                            key={index}
                            coordinate={{ latitude: Number(marker.latitud), longitude: Number(marker.longitud) }}
                            title={marker.tipo}
                            description={marker.title}
                            onPress={() => handleMarkerPress(marker)}
                            pinColor={(marker.tipo === "Evento") ? "blue" : "red"}
                        />
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
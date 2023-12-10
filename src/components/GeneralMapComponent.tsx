import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { getLocation } from "../services/location";

import { Locations} from "../interfaces/location.interface";

interface IProps {
    location_array: Locations[];
}

export const GMapComponent : React.FC<IProps> = ( {location_array} ) => {
    
//     const [latitud,setLatitud]=useState(0);
//     const [longitud,setLongitud]=useState(0);
//     const getIntLocation=async() => {
//         let ubicacion= await getLocation();
//         if(ubicacion!==undefined){
//             let [lat,lon]=ubicacion;
//             setLatitud(Number(lat));
//             setLongitud(Number(lon));
//         }
//     }
   
//    useEffect(() => {
//     getIntLocation();
//     }, []);


    

    const [markers, setMarkers] = useState([{ latitude: 0, longitude: 0 }])
    useEffect(() => {
        location_array.map((marker, index) => (
            console.log("_-------------------_"),
            console.log(index),
            console.log(marker.latitud),
            console.log(marker.longitud)
            )
        )
    }, [location_array])

    return (
        <View style={styles.container}>
            <MapView style={styles.map} provider={'google'} showsUserLocation showsMyLocationButton initialRegion={{latitude: 0, longitude: 0, latitudeDelta: 0.01, longitudeDelta: 0.01}}>
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
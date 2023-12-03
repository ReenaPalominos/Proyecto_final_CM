import React, { useState } from "react";
import MapView, {Marker} from "react-native-maps";
import { StyleSheet,View } from "react-native";

export const MapComponent=() => {

    const[marker,SetMarker]=useState([{latitude:-33.463441050432436, longitude: -70.59906676881651}])

    return(
        <View style={styles.container}>
            <MapView style={styles.map} provider={'google'} showsUserLocation showsMyLocationButton>
                {marker.map((marker,index)=>(
                    <Marker key={index} coordinate={{latitude:marker.latitude, longitude:marker.longitude}}></Marker>
                ))}
            
            </MapView>
        </View>
    )
}

const styles= StyleSheet.create({
    container: {
        flex: 1,
    },
    map:{
        width: '100%',
        height: '100%',
    },
});
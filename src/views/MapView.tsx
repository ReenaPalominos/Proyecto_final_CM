import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { MapComponent } from "../components/MapComponent";

export default function MapView(){
    return(
        
            
        <View style={style.container}>
            <MapComponent/>
        </View>
        
    )
}

const style = StyleSheet.create({
    container:{
        flex:1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
});
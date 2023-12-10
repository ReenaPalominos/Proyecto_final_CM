import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { GMapComponent } from "../components/GeneralMapComponent";

export default function MapView(){
    return(
        
            
        <View style={style.container}>
            <GMapComponent/>
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
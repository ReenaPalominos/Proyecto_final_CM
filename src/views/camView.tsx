import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { CamComponent } from "../components/CamComponent";

export default function CamView(){
    return(
        
            
        <View style={style.container}>
            <CamComponent/>
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
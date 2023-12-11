import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { CamComponent } from "../components/CamComponent";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../navigators/NavBar";

type Props = {
    navigation: NativeStackNavigationProp<StackParamList>;
};

export default function Cam(){
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
import { GMapComponent } from "../components/GeneralMapComponent";
import React, { useCallback, useEffect, useState } from "react";
import {
    View,
    ScrollView,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { getDatabase, ref, onValue, off } from "firebase/database";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../navigators/NavBar";

import { Locations } from "../interfaces/location.interface";

type Props = {
    navigation: NativeStackNavigationProp<StackParamList>;
};



export default function MapView({ navigation }: Props) {
    // crear constante para las denuncias
    const [_locations, setLocations] = useState<Locations[]>([]);

    useFocusEffect(
        useCallback(() => {
            const db = getDatabase();
            const dbRef = ref(db, "Denuncias/");

            // Limpiar el estado de denuncias antes de cargar los nuevos datos
            setLocations([]);

            onValue(dbRef, (snapshot) => {
                const data = snapshot.val();

                // Accediendo a los datos
                for (let key in data) {
                    const {
                        token,
                        timestamp,
                        title,
                        description,
                        file,
                        userId,
                        latitud,
                        longitud,
                    } = data[key];
                    const newLocation = {
                        token,
                        title,
                        timestamp,
                        description,
                        file,
                        userId,
                        latitud,
                        longitud,
                    };
                    setLocations((prevState) => [...prevState, newLocation]);
                    console.log(
                        "Datos: ",
                        token,
                        timestamp,
                        title,
                        description,
                        file,
                        userId,
                        latitud,
                        longitud
                    );
                }
            });

            // No olvides detener la escucha de cambios cuando ya no sea necesario
            return () => off(dbRef);
        }, [])
    );
    return (


        <View style={style.container}>
            <GMapComponent 
                location_array={_locations}
            />
        </View>

    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
});
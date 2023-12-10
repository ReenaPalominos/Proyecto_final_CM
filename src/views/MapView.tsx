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
import Loading from "../components/Loading";

import { getDatabase, ref, onValue, off, set } from "firebase/database";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../navigators/NavBar";

import { Locations } from "../interfaces/location.interface";

type Props = {
    navigation: NativeStackNavigationProp<StackParamList>;
};



export default function MapView({ navigation }: Props) {
    // crear constante para las denuncias
    const [_locations, setLocations] = useState<Locations[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        const db = getDatabase();
        const dbRef = ref(db, "Denuncias/");
        /* const dbRef2 = ref(db, "Eventos/"); */

        setLocations([]);
    
        const unsubscribe = onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
    
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
            setLoading(false);
        });       
        return () => {
            unsubscribe();
        }
    }, []);

    useEffect(() => {
        setLoading(true);

        const db = getDatabase();
        const dbRef = ref(db, "Eventos/");
    
        const unsubscribe = onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
    
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
            setLoading(false);
        });       
        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <View style={style.container}>
            {loading ? (
                <Loading /> ) : (
                    <View style={style.container}>
                        <GMapComponent 
                            location_array={_locations}
                        />
                    </View>
                )
            }
        </View>
        
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        width: '100%',

        alignItems: 'center',
        justifyContent: 'center',
    },
});
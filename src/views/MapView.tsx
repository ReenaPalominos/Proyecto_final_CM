import { GMapComponent } from "../components/GeneralMapComponent";
import React, { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
} from "react-native";
import Loading from "../components/Loading";

import { getDatabase, ref, onValue } from "firebase/database";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../navigators/NavBar";

import { Datos } from "../interfaces/datos.interface";

type Props = {
    navigation: NativeStackNavigationProp<StackParamList>;
};



export default function MapView({ navigation }: Props) {
    // crear constante para las denuncias
    const [_locations, setLocations] = useState<Datos[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        const db = getDatabase();
        const dbRef = ref(db, "Denuncias/");

        let newLocations: Datos[] = [];

        const unsubscribe = onValue(dbRef, (snapshot) => {
            const data = snapshot.val();

            for (let key in data) {
                const {
                    tipo = "Denuncia",
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
                    tipo,
                    token,
                    title,
                    timestamp,
                    description,
                    file,
                    userId,
                    latitud,
                    longitud,
                };
                newLocations.push(newLocation);
            }

            newLocations.forEach(newLocation => {
                setLocations(prevLocations => [...prevLocations, newLocation]);
            });
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

        let newLocations: Datos[] = [];

        const unsubscribe = onValue(dbRef, (snapshot) => {
            const data = snapshot.val();

            for (let key in data) {
                const {
                    tipo = "Evento",
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
                    tipo,
                    token,
                    title,
                    timestamp,
                    description,
                    file,
                    userId,
                    latitud,
                    longitud,
                };
                newLocations.push(newLocation);
            }

            newLocations.forEach(newLocation => {
                setLocations(prevLocations => [...prevLocations, newLocation]);
            });
            setLoading(false);
        });
        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <View style={style.container}>
            {loading ? (
                <Loading />) : (
                <View style={style.container}>
                    <GMapComponent
                        navigation={navigation}
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
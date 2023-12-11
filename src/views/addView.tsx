import React from 'react';
import { SafeAreaView, StyleSheet } from "react-native";

/* Components */
import { AddComponent } from "../components/AddComponent";

export default function AddView({ route, navigation }) {
    const { Id } = route.params;

    return (
        <SafeAreaView style={Id == "Eventos" ? styles.containerEventos : styles.containerDenuncias}>
            <AddComponent
                tipo={Id} 
                navigation={navigation}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    containerDenuncias: {
        flex: 1,
        height: 'auto',
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 16,
        padding: 10,
        marginTop: 50,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
    },
    containerEventos: {
        flex: 1,
        height: 'auto',
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 16,
        padding: 10,
        marginTop: 50,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
    },
});
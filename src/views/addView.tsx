import React from 'react';
import { SafeAreaView, StyleSheet } from "react-native";

/* Components */
import { AddComponent } from "../components/AddComponent";

export default function AddView({ route, navigation }) {
    const { Id } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <AddComponent
                tipo={Id} 
                navigation={navigation}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 16,
        padding: 10,
        margin: 10,
    },
});
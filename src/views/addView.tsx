import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from "react-native";

import { Ionicons } from "@expo/vector-icons";

/* Components */
import { AddComponent } from "../components/AddComponent";

export default function AddView({ route }) {
    const { Id } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <AddComponent
                tipo={Id}
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
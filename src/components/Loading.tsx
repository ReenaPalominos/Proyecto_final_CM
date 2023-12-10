import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Loading = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Loading...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: { 
        fontSize: 36,
        fontWeight: 'bold',
    },
});

export default Loading;

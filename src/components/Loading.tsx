import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Loading = () => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/Logo UTEM.gif')} // Asegúrate de proporcionar la ruta correcta
                style={styles.gif}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gif: {
        width: 100, // Ajusta el ancho y alto según sea necesario
        height: 100,
    },
});

export default Loading;
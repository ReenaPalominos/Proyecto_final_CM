import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

type ItemProps = {
    onPress: () => void;
    text: string;
    description: string;
    date: number;
    imageSource: any; // Tipo para la fuente de la imagen
};

const truncateDescription = (description: string, maxLength: number) => {
    if (description.length > maxLength) {
        return `${description.substring(0, maxLength - 3)}...`;
    }
    return description;
};

const ItemComponent = ({ onPress, text, description, date, imageSource }: ItemProps) => {
    const truncatedDescription = truncateDescription(description, 25);

    const dateObject = new Date(date);

    const formattedDate = dateObject.toLocaleDateString("es-ES");
    const formattedTime = dateObject.toLocaleTimeString("es-ES");


    return (
        <TouchableOpacity style={styles.denunciaContainer} onPress={onPress}>
            <Image source={{ uri: imageSource }} style={styles.image} resizeMode="cover" />
            <View style={styles.textContainer}>
                <Text style={styles.titleText}>{text}</Text>
                <Text style={styles.descriptionText}>{truncatedDescription}</Text>
            </View>
            <Text style={styles.dateText}>{formattedDate} {formattedTime}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    denunciaContainer: {
        width: '95%',
        height: 120,
        marginVertical: 5,
        backgroundColor: '#0096c7',
        borderRadius: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 120,
        height: 100,
        borderRadius: 10,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    descriptionText: {
        fontSize: 14,
        color: '#fff',
    },
    dateText: {
        position: 'absolute',
        bottom: 5,
        right: 10,
        fontSize: 12,
        color: '#fff',
    },
});

export default ItemComponent;

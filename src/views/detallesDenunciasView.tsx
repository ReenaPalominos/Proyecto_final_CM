import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MapComponent } from '../components/MapComponent';

export default function Denuncias() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/calle.jpg')}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.descriptionText}>
        Descripción de la denuncia aquí...
      </Text>
      <MapComponent/>
      <Text style={styles.footerText}>
        Fecha: 01/12/2023 | Autor: Usuario123
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F6FF',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    position: 'relative',
  },
  imageContainer: {
    height: '30%',
    width: '100%',
    marginBottom: 10,
  },
  image: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
  },
  descriptionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333333',
  },
  footerText: {
    fontSize: 12,
    color: '#666666',
    marginTop: 20,
  },
});
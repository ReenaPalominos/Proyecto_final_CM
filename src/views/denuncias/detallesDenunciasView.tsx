import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MapComponent } from '../../components/MapComponent';
import { useRoute } from '@react-navigation/native';

import { DatosDenuncia } from '../../interfaces/denuncias.interface';

export default function DetallesDenuncia() {
  const route = useRoute();

  const params = route.params as DatosDenuncia;
  // Acceder a los parámetros
  const { token, title, description, timestamp, file, userId, latitud, longitud } = params;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: file }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <Text style={styles.descriptionText}>
        {description}
      </Text>
      <MapComponent latitud={Number(latitud)} longitud={Number(longitud)}/>
      <Text style={styles.footerText}>
        Fecha: {new Date(timestamp).toLocaleDateString()} | Autor: {userId}
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
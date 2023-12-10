import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MapComponent } from '../../components/MapComponent';
import { useRoute } from '@react-navigation/native';

import { DatosEvento } from '../../interfaces/eventos.interface';


export default function DetallesEventos() {
  const route = useRoute();

  const params = route.params as DatosEvento;
  // Acceder a los parámetros
  const { token, title, description, timestamp, file, userId, latitud, longitud } = params;

  console.log(timestamp);
  
  const dateObject = new Date(timestamp);
  
  const formattedDate = dateObject.toLocaleDateString("es-ES");
  const formattedTime = dateObject.toLocaleTimeString("es-ES");

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.descriptionText}>
          {title}
        </Text>
      </View>
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
        Fecha: {formattedDate} {formattedTime} | Autor: {userId}
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
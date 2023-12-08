import React from 'react';
import { View, ScrollView, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../navigators/NavBar'; 

import EventoItem from '../components/EventoItem';

type Props = {
  navigation: NativeStackNavigationProp<StackParamList>;
}

export default function Eventos({ navigation } : Props) {

      const eventos = Array.from({ length: 10 }, (_, index) => ({
        id: index,
        text: `Evento ${index + 1}`,
        description: `Descripción del evento ${index + 1}`,
        date: '01/01/2023',
        imageSource: require('../../assets/eventos.png'),
      }));

    return (
      <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {eventos.map((evento) => (
          <EventoItem
            key={evento.id}
            onPress={() => navigation.navigate('DetallesEventos')}
            text={evento.text}
            description={evento.description}
            date={evento.date}
            imageSource={evento.imageSource}
          />
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddEvento')}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
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
  scrollView: {
    width: '100%',
    height: '100%',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: 'white',
  },
});

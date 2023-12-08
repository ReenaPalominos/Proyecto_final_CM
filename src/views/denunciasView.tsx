import React from 'react';
import { View, ScrollView, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../navigators/NavBar'; 

import DenunciaItem from '../components/DenunciaItem';

type Props = {
  navigation: NativeStackNavigationProp<StackParamList>;
}

export default function Denuncias({ navigation }: Props) {
  const denuncias = Array.from({ length: 10 }, (_, index) => ({
    id: index,
    text: `Denuncia ${index + 1}`,
    description: `Descripción de la denuncia ${index + 1}`,
    date: '01/01/2023',
    imageSource: require('../../assets/calle.jpg'), // Fuente de la imagen para cada denuncia
  }));

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {denuncias.map((denuncia) => (
          <DenunciaItem
            key={denuncia.id}
            onPress={() => navigation.navigate('DetallesDenuncia')}
            text={denuncia.text}
            description={denuncia.description}
            date={denuncia.date}
            imageSource={denuncia.imageSource}
          />
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddDenuncia')}>
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
import React from 'react';
import { View, ScrollView, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../navigators/NavBar'; 


type Props = {
  navigation: NativeStackNavigationProp<StackParamList>;
}

export default function Denuncias({ navigation } : Props) {
  const denuncias = Array.from({ length: 10 }, (_, index) => index); // Crear 10 denuncias

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {denuncias.map((item, index) => (
          <TouchableOpacity key={index} style={styles.denunciaContainer} onPress={() => navigation.navigate('DetallesDenuncia')}>
            <Image
              source={require('../../assets/calle.jpg')}
              style={styles.image}
              resizeMode="cover"
            />
            <Text style={styles.dateText}>Fecha: 01/12/2023</Text>
          </TouchableOpacity>
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
  denunciaContainer: {
    height: 150,
    width: '95%',
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  image: {
    width: 150,
    height: 140,
    marginRight: 10,
    borderRadius: 5,
  },
  dateText: {
    fontSize: 12,
    color: '#333333',
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

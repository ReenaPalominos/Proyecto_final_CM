import React from 'react';
import { View, Image, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from '../navigators/NavBar';
import { Ionicons } from '@expo/vector-icons'; // Importa los íconos desde @expo/vector-icons

import { appFirebase } from '../services/firebaseConfig';
import { getAuth } from 'firebase/auth';

const auth = getAuth(appFirebase);
const { width, height } = Dimensions.get('window');

type Props = {
  navigation: NativeStackNavigationProp<StackParamList>;
};

export default function Vistas({ navigation }: Props) {
  const userID = auth.currentUser;

  const navigateToAboutUs = () => {
    navigation.navigate('AboutUs');
  };

  const ButtonWithIcon = ({ onPress, text, iconName }: { onPress: () => void; text: string; iconName: string }) => (
    <Pressable style={styles.button} onPress={onPress}>
      <Ionicons name={iconName} size={40} color="#023e8a" />
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={require('../../assets/profilepic.png')} style={styles.userImage} />
        <Text style={styles.text}>
          {userID ? userID.email : 'No hay ningún usuario autenticado'}
        </Text>
      </View>
      <View style={styles.subContainer}>
        <View style={styles.buttonRow}>
          <ButtonWithIcon onPress={() => navigation.navigate('Denuncias')} text="Denuncias" iconName="ios-alert-circle-outline" />
          <ButtonWithIcon onPress={() => navigation.navigate('Eventos')} text="Eventos" iconName="ios-calendar-outline" />
        </View>
        <View style={styles.buttonRow}>
          <ButtonWithIcon onPress={() => navigation.navigate('Mapa')} text="Mapa" iconName="ios-map-outline" />
          <ButtonWithIcon onPress={() => navigation.navigate('Usuario')} text="Usuario" iconName="ios-person-outline" />
        </View>
      </View>
      <Pressable style={styles.circularButton} onPress={navigateToAboutUs}>
        <Text style={styles.text}>?</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    backgroundColor: '#90e0ef',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#90e0ef',
    borderRadius: 10,
    height: '10%',
    marginTop: 40,
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 10,
  },
  subContainer: {
    width: width,
    height: '70%',
    borderRadius: 10,
    backgroundColor: '#90e0ef',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 150,
    height: 150,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#48cae4',
  },
  buttonText: {
    color: '#023e8a',
    fontSize: 16,
    marginTop: 5,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  text: {
    color: '#023e8a',
    fontSize: 20,
    fontWeight: 'bold',
  },
  circularButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 30,
    height: 30,
    borderRadius: 25,
    backgroundColor: '#44E8FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
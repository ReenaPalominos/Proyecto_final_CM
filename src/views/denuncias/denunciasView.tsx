import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { getDatabase, ref, onValue, off } from "firebase/database";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamList } from "../../navigators/NavBar";


import DenunciaItem from "../../components/denuncias/DenunciaItem";
import { Datos } from "../../interfaces/datos.interface";

type Props = {
  navigation: NativeStackNavigationProp<StackParamList>;
};

export default function Denuncias({ navigation }: Props) {
  // crear constante para las denuncias
  const [_denuncias, setDenuncias] = useState<Datos[]>([]);
  
  useFocusEffect(
    useCallback(() => {
      const db = getDatabase();
      const dbRef = ref(db, "Denuncias/");

      // Limpiar el estado de denuncias antes de cargar los nuevos datos
      setDenuncias([]);

      onValue(dbRef, (snapshot) => {
        const data = snapshot.val();

        // Accediendo a los datos
        for (let key in data) {
          const {
            token,
            timestamp,
            title,
            description,
            file,
            userId,
            latitud,
            longitud,
          } = data[key];
          const newDenuncia = {
            token,
            title,
            timestamp,
            description,
            file,
            userId,
            latitud,
            longitud,
          };
          setDenuncias((prevState) => [...prevState, newDenuncia]);
          console.log(
            "Datos: ",
            token,
            timestamp,
            title,
            description,
            file,
            userId,
            latitud,
            longitud
          );
        }
      });

      // No olvides detener la escucha de cambios cuando ya no sea necesario
      return () => off(dbRef);
    }, [])
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {_denuncias.map((denuncia) => (
          <DenunciaItem
            key={denuncia.token.toString()}
            onPress={() =>
              navigation.navigate("DetallesDenuncia",{
                token: denuncia.token,
                title: denuncia.title,
                description: denuncia.description,
                timestamp: denuncia.timestamp,
                file: denuncia.file,
                userId: denuncia.userId,
                latitud: denuncia.latitud,
                longitud: denuncia.longitud,
              })
            }
            text={denuncia.title}
            description={denuncia.description}
            date={denuncia.timestamp}
            imageSource={denuncia.file}
          />
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddDenuncia")}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F6FF",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    position: "relative",
  },
  scrollView: {
    width: "100%",
    height: "100%",
  },
  denunciaContainer: {
    height: 150,
    width: "95%",
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
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
    color: "#333333",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 24,
    color: "white",
  },
});

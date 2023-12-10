import *as location from "expo-location";


const getLocation= async()=>{
    let datos=[''];
    let {status} = await location.requestForegroundPermissionsAsync();
    if(status!== 'granted'){
      console.error();
      return undefined;
    }
    let ubicacion = await location.getCurrentPositionAsync()
    if(ubicacion!== null){
    let latitud=ubicacion.coords.latitude;
    let longitud=ubicacion.coords.longitude;
    datos[0]=String(latitud);
    datos[1]=String(longitud);
    return datos;
    }
};

export{getLocation};
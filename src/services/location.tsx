import *as location from "expo-location";


const getData= async()=>{
    let datos=[];
    let {status} = await location.requestBackgroundPermissionsAsync();
    if(status!== 'granted'){
      console.error();
      return undefined;
    }
    let x = await location.getCurrentPositionAsync({});
    return datos=[x.coords.altitude,x.coords.longitude]
};

export{getData};
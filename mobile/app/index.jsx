import React from 'react';
import { View, Text, TouchableOpacity,StyleSheet} from 'react-native';
import { useRouter } from 'expo-router';
import SplashScreen from '../components/SplashScreen';
import { useEffect } from 'react';
import { useState } from 'react';

export default function Index() {
  const router = useRouter();
  const [splash,setSplash] = useState(true);
  useEffect(()=>{
    setTimeout(() => {
      setSplash(false);
    }, 3000);
  },[]);
  if(splash===true){
    return(
      <SplashScreen/>
    );
  }
  return(
    <View style={styles.container}>
      <TouchableOpacity
      onPress={()=>router.push("/Login")}
      activeOpacity={0.7}
      style = {styles.button}
      >
      <Text style={styles.textStyle}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
      onPress={()=>router.push("/Register")}
      activeOpacity={0.7}
      style = {styles.button}
      >
      <Text style={styles.textStyle}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#519ae3ff"
  },
  button:{
    backgroundColor:"#234567",
    width:"80%",
    height:50,
    marginBottom:20,
    borderRadius:20
  },
  textStyle:{
    textAlign:"center",
    fontWeight:"200",
    color:"#fff",
    fontSize:30
  }
})
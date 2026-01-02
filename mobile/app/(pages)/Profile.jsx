import React from "react";
import {ScrollView, View,Image,Text,TouchableOpacity,StyleSheet} from "react-native";
import {useRouter } from "expo-router";

export default function Profile(){
    const router = useRouter();
    let data;
    const fetching = async () => {
        const token = await localStorage.getItem("token");
        let response = await fetch("http://localhost:3000/api/Profile",{headers:{"Content-Type": "application/json",Authorization: `Bearer ${token}`}});
        let data = await response.json();//content type işine bakmak lazım
        return data;
    }
    try {
        data = fetching();
    } catch (error) {
        console.log(error);
    }
    const defaultImg = "../assets/profilepics/defaultImage.jpg"; 
    return(
        <View >
            <View>
                <Image source={defaultImg}
                ></Image>
            </View>
            <View>
                <Text>İsim: {data.name}</Text>
                <TouchableOpacity
                onPress={router.push("../Forms/NameChange")}
                activeOpacity={0.7}
                >İsmini değiştir</TouchableOpacity>
            </View>
            <View>
                <Text>E-mail: {data.email}</Text>
                <TouchableOpacity
                onPress={router.push("../Forms/MailChange")}
                activeOpacity={0.7}
                >Mailini değiştir</TouchableOpacity>
            </View>
            <View>
                <Text>Adres: {data.address || ""}</Text>
                <TouchableOpacity
                onPress={router.push("../Forms/AdressChange")}
                activeOpacity={0.7}
                >Adresini değiştir</TouchableOpacity>
            </View>
        </View>
    );
}//adress kısmı bakılacak

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:"column",
        backgroundColor:"#234567",
        alignItems:"center",
        gap:30
    }  
})
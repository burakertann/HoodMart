import React from "react";
import {ScrollView, View,Image,Text,TouchableOpacity,StyleSheet} from "react-native";
import {useRouter } from "expo-router";

export default function Profile(){
    const router = useRouter();
    let [data,setData] = React.useState(null);
    const fetching = async () => {
        const token = await localStorage.getItem("token");
        let response = await fetch("http://localhost:3000/api/Profile",{headers:{"Content-Type": "application/json",Authorization: `Bearer ${token}`}});
        let data = await response.json();//content type işine bakmak lazım
        setData(data);  
    }

    React.useEffect(()=>{
        fetching(); 
    },[]);  


    const defaultImg = "../assets/profilepics/defaultImage.jpg"; 
    return(
        <View >
            <View>
                <Image source={defaultImg || data.profilePic}
                ></Image>
            </View>
            <View>
                <Text>İsim: {data.name}</Text>
                <TouchableOpacity
                onPress={()=>router.push("../Forms/NameChange")}
                activeOpacity={0.7}
                >İsmini değiştir</TouchableOpacity>
            </View>
            <View>
                <Text>E-mail: {data.email}</Text>
                <TouchableOpacity
                onPress={()=>router.push("../Forms/MailChange")}
                activeOpacity={0.7}
                >Mailini değiştir</TouchableOpacity>
            </View>
            <View>  
                <Text>Adres Bilgileri</Text>    
                <Text>Ülke: {data.country}</Text>
                <Text>Şehir: {data.city}</Text>
                <Text>Mahalle: {data.neighborhood}</Text>
                <Text>Sokak: {data.street}</Text>
                <Text>No: {data.no}</Text>
                <TouchableOpacity   
                onPress={()=>router.push("../Forms/AddressForm")}   
                activeOpacity={0.7} 
                >Adres ekle / düzenle</TouchableOpacity>    
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
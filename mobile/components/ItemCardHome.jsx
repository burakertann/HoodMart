import { HeaderHeightContext } from "@react-navigation/elements";
import React from "react";
import { View,Text,Image,StyleSheet, Touchable, TouchableOpacity} from "react-native";

export default function ItemCardHome(props){
    handleAddToFavorite = async () => {
        const response = await fetch("http://localhost:3000/api/Favorites/add-favorite",{
            method: 'POST', 
            headers: {  
                'Content-Type': 'application/json'  
            },  
            body: JSON.stringify({  
                itemId: props.itemId,   
                userId: props.userId    
            })  
        })
        const data = await response.json(); 
        console.log(data);  
    } 

    handleRequest = async () => {
        const response = await fetch("http://localhost:3000/api/Requests/add-request",{
            method: 'POST', 
            headers: {  
                'Content-Type': 'application/json'  
            },  
            body: JSON.stringify({
                itemId: props.itemId,
                userId: props.userId
            })
        }
        
        );
        const data = await response.json();    
        console.log(data);  
    }


    return(
        <View style ={styles.container}>
            <View style = {styles.header}>
                <Image source ={{uri:props.profilePic}} style = {styles.profilePic}></Image>
                <Text>{props.userName}</Text>
            </View>
            <Image source={{uri:props.imageName}} style = {styles.itemPic}></Image>
            <Text>{props.name}</Text>
            <Text>{props.country}</Text>
            <Text>{props.city}</Text>
            <Text>{props.neighborhood}</Text>
            <Text>{props.street}</Text>
            <Text>{props.no}</Text>

            <Text>{props.price}</Text>

            <TouchableOpacity onPress={handleAddToFavorite}>Add To Favorites</TouchableOpacity>
            <TouchableOpacity onPress={handleRequest}>Request this item</TouchableOpacity>

        </View>


    );//adress kısmına bakacaksın
}

const styles = StyleSheet.create({
    container:{
        height:100,
        width:"80%",
        textAlign:"center",
        marginBottom:20,
        flexDirection:"column",
        shadowOffset:"2,2",
        shadowColor:"#000",
        borderRadius:10
    },
    header:{
        position:"absolute",
        height:10,
        width:"100%",
        flexDirection:"row",
        justifyContent:"flex-start",
        gap:5,
    },
    profilePic:{
        height:3,
        width:3,
        borderRadius:"50%"
    },
    itemPic:{
        height:50,
        width:"100%"
    }
})

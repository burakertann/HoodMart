import { HeaderHeightContext } from "@react-navigation/elements";
import React from "react";
import { View,Text,Image,StyleSheet, Touchable, TouchableOpacity} from "react-native";

export default function ItemCardFavorites(props){
    
    handleRemoveFromFavorite = async () => {    
        const response = await fetch(`http://localhost:3000/api/Favorites/remove-favorite?${props.itemID}`); 
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
            <Text>{props.price}</Text>
        
            <TouchableOpacity onPress={handleRemoveFromFavorite}>Remove From Favorites</TouchableOpacity>
        </View>


    );
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
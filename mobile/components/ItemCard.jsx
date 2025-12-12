import { HeaderHeightContext } from "@react-navigation/elements";
import React from "react";
import { View,Text,Image,StyleSheet} from "react-native";

export default function ItemCard(props){
    return(
        <View>
            <Image source={{uri:props.imageName}}></Image>
            <Text>{props.name}</Text>
            <Text>{props.price}</Text>
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
    image:{
        
    }
)

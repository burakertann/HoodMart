import React from "react";
import { View,Text,Image,StyleSheet, Touchable, TouchableOpacity} from "react-native";  
import {useRouter} from "expo-router";
import { useEffect } from "react";
export default function SeeRequests(props){
    const router = useRouter();
    let [data,setData] = React.useState([]);

    const fetchRequests = async () => {
        const response = await fetch("http://localhost:3000/api/Requests/get-requests",{
            method: 'GET',
        });
        const data = await response.json();
        setData(data);
        console.log(data);
    }

    const handleGiving = async (request) => {
        const response = await fetch(`http://localhost:3000/api/Requests/give-item?userID=${request.userID}&itemID=${itemID}`,{
            method: 'PATCH',});       
        const result = await response.json();
        console.log(result);
    }


    useEffect(() => {
        fetchRequests();
    }, []);

    return(
        <>
        <View style ={styles.container}>
            <Text style={styles.title}>Received Requests</Text>
            {data.map((request)=>(
                <View key={request.id} style={styles.requestCard}>
                    <Text>name: {data.name}</Text>
                    <Text>contact: {data.email}</Text>
                    <TouchableOpacity onPress ={()=>handleGiving(request)}>Give to that person</TouchableOpacity>        
                </View>
            ))}
        </View>
        <TouchableOpacity onPress={()=>{router.push("/Profile")}}>  Go to Profile Page</TouchableOpacity>    
        </>
    );

}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        padding:20,
    },
    title:{
        fontSize:24,
        fontWeight:"bold",
        marginBottom:20,
    },
    requestCard:{
        width:"100%",
        padding:15,
        marginBottom:10,
        backgroundColor:"#f0f0f0",
        borderRadius:8,
    }
});
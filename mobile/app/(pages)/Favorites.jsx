import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native";  
import ItemCardFavorites from "../../components/ItemCardFavorites";


export default function Favorites() {
    let [data,setData] = useState([]);
    useEffect( async () => {
      try {
        const response = await fetch("http://localhost:3000/api/Favorites", );
        const json = await response.json();
        setData(json);
        console.log(json);  
      } catch (error) {
        console.log(error);
      }
    },[]);  

    return(
      <>
      <Text>My Favorites</Text>
      <ScrollView style = {styles.container}>
        {data.map((element, index) => (
          <>
          <ItemCardFavorites 
            key={index}
            name={element.name}
            imageName={element.ImageName}
            price={element.price}
          />
          </>
        ))}
      </ScrollView>

      </>
    )
    
}   

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center", 
    justifyContent: "center",   
  }  
})
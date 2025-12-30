import { ScrollView, View ,Text} from "react-native";
import React from "react";

export default function Rental(){

    const fetching = async ()=>{
        const response = await fetch("api");
        const data = await response.json();
        return data;
    }
    
    const data = fetching();
    //if ile kontrol yapılıp ona göre view'ler yazılmalı
    <ScrollView>
        <View id="myRenteds">
            {data.map((element, index) => {
            return (
                <ItemCard 
                     key={index} 
                     name={element.name} 
                     imageName={element.ImageName}
                     price={element.price}
                />
            );
        })}
        </View>
        <View id="onesIRented">
            {data.map((element, index) => {
            return (
                <ItemCard 
                     key={index} 
                     name={element.name} 
                     imageName={element.ImageName}
                     price={element.price}
                />
            );
        })}
        </View>
    </ScrollView>
}
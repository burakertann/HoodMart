import React, { useState } from "react";
import { View,TextInput,Text,TouchableOpacity } from "react-native";
import { router } from "expo-router";



export default function StringForm(props){
    let [text,setChange] = useState();

    const fetching = async (text) =>{
        await fetch(`api` /*burada api için props kullanılacak*/, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({text}),
      })
    }


    return(
        <View>
            <Text>{props.valueName} gir ve submitle</Text>
            <TextInput
            onChangeText={setChange}
            value={text}
            ></TextInput>
            <TouchableOpacity onPress={()=>fetching(text)} activeOpacity={0.7}>
                SUBMIT
            </TouchableOpacity>
        </View>
    )
}
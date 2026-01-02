import React from "react";
import { View } from "react-native";
import { router } from "expo-router";
import addItemForm from "../../components/addItemForm"

export default function AddItem(){
    return(
        <View>
            <addItemForm></addItemForm>
        </View>
    )
}
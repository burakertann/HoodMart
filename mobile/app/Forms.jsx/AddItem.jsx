import React from "react";
import { View } from "react-native";
import { router } from "expo-router";
import AddItemForm from "../../components/AddItemForm"

export default function AddItem(){
    return(
        <View>
            <AddItemForm></AddItemForm>
        </View>
    )
}
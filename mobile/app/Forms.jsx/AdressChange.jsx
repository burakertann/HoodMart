import React from "react";
import AddAddressCard from "../../components/AddAdressCard";
import { ScrollView } from "react-native";

export default function AddressChange(){
    return(
        <ScrollView style={{ padding: 20 }}>
            <AddAddressCard />
         </ScrollView>
    )
}
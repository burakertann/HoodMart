import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

export default function AddAddressCard() {
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [neighborhood, setNeighborhood] = useState("");

  const handleSubmit = async () => {
    const body = {
      street,
      number,
      city,
      country,
      neighborhood,
    };

    try {
      const token = localStorage.getItem("token"); // WEB için

      const response = await fetch("http://localhost:3000/api/address", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      console.log("Address saved:", data);
      alert("Adres başarıyla kaydedildi");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View
      style={{
        padding: 16,
        borderRadius: 12,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
        Adres Bilgileri
      </Text>

      <TextInput placeholder="Street" value={street} onChangeText={setStreet}/>
      <TextInput placeholder="No" value={number} onChangeText={setNumber} />
      <TextInput placeholder="Neighborhood" value={neighborhood} onChangeText={setNeighborhood} />
      <TextInput placeholder="City" value={city} onChangeText={setCity} />
      <TextInput placeholder="Country" value={country} onChangeText={setCountry} />

      <Button title="Adresi Kaydet" onPress={handleSubmit} />
    </View>
  );
}

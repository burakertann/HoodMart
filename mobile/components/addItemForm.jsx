import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

export default function AddItemForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [imageName, setImageName] = useState("");

  // WEB DOSYA SEÇME
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // DOSYA ADI
    setImageName(file.name);
  };

  const handleSubmit = async () => {
    const body = {
      name,
      price,
      description: desc,
      imageName,
    };

    console.log(body);

    await fetch("http://localhost:3000/api/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Ürün Adı</Text>
      <TextInput value={name} onChangeText={setName} />

      <Text>Fiyat</Text>
      <TextInput value={price} onChangeText={setPrice} />

      <Text>Açıklama</Text>
      <TextInput value={desc} onChangeText={setDesc} />

      <Text>Resim Seç</Text>

      {/* SADECE WEB’DE ÇALIŞIR */}
      <input type="file" onChange={handleFileChange} />

      <Text>Seçilen Resim: {imageName}</Text>
      
      <Button title="Gönder" onPress={handleSubmit} />
    </View>
  );
}


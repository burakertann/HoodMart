import React, { useState } from "react";
import { View, Alert } from "react-native";

export default function MailChange() {
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/Profile/NameChange",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            name:name
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Hata", data.message);
        return;
      }

      Alert.alert("Başarılı", "Mail güncellendi");
      setMail("");

    } catch (error) {
      Alert.alert("Hata", "Sunucuya bağlanılamadı");
    }
  };

  return (
    <View>
    <Text>İsim gir ve submit et</Text>

    <TextInput
      onChangeText={setName}
      value={name}
      placeholder="Yeni isim"
    />

    <TouchableOpacity
      onPress={handleSubmit}
      activeOpacity={0.7}
    >
      <Text>SUBMIT</Text>
    </TouchableOpacity>
  </View>
  );
}
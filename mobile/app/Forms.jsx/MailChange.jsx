import React, { useState } from "react";
import { View, Alert } from "react-native";

export default function MailChange() {
  const [mail, setMail] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/Profile/MailChange",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            email: mail
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
    <Text>Mail gir ve submit et</Text>

    <TextInput
      onChangeText={setMail}
      value={mail}
      placeholder="Yeni mail"
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

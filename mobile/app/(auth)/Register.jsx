import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { AuthContext } from '../../context/AuthContext'; // Context'in yeri önemli

export default function Register() {
  const router = useRouter();
  
  // Form verileri için state'ler
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Context'ten 'register' fonksiyonunu çekiyoruz (Daha önce server.js'te hazırlamıştık)
  const { register, isLoading } = useContext(AuthContext);

  // Kayıt ol butonuna basılınca çalışacak fonksiyon
  const handleRegister = async () => {
    if(!name || !email || !password) {
      Alert.alert("Hata", "Lütfen tüm alanları doldurun.");
      return;
    }

    // Context içindeki register fonksiyonunu çağırıyoruz
    // Not: AuthContext içine 'register' fonksiyonunu eklemiş miydik? 
    // Eğer eklemediysek aşağıda Context için güncellemeyi de hatırlatacağım.
    await register(name, email, password);
    
    // Kayıt başarılı olursa genellikle Login'e atarız veya otomatik giriş yaptırırız.
    // Şimdilik manuel Login'e gitsin diye yönlendiriyoruz.
    router.replace('/Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kayıt Ol</Text>

      <TextInput
        style={styles.input}
        placeholder="Ad Soyad"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none" // İlk harfi otomatik büyütme (email için)
        keyboardType="email-address"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry // Şifreyi gizle
      />

      <Button 
        title={isLoading ? "Kaydediliyor..." : "Kayıt Ol"} 
        onPress={handleRegister} 
        disabled={isLoading} // Yüklenirken butona tekrar basılmasın
      />

      <View style={{ marginTop: 15 }}>
        <Text style={{textAlign: 'center', marginBottom: 5}}>Zaten hesabın var mı?</Text>
        <Button 
          title="Giriş Yap Sayfasına Git" 
          onPress={() => router.back()} // Stack olduğu için "Geri" gelmek yeterli
          color="gray"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 }
});
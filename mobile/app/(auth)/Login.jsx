import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { AuthContext } from '../../context/AuthContext';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Context'ten login fonksiyonunu alıyoruz
  const { login } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giriş Yap</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Butona basınca context'teki login çalışır */}
      <Button title="Giriş" onPress={() => login(email, password)} />

      <View style={{ marginTop: 15 }}>
        {/* router.push ile stack'in üstüne yeni sayfa ekliyoruz */}
        <Button 
          title="Kayıt Ol" 
          onPress={() => router.push('/Register')} 
          color="gray"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 }
});
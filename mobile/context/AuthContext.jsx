import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


// Context: Verileri tüm uygulamaya dağıtan boru hattı.
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // --- STATE'LER (ANLIK DURUMLAR) ---
  const [isLoading, setIsLoading] = useState(false); // Uygulama meşgul mü?
  const [token, setToken] = useState(null);  // Giriş bileti (Token) var mı?
  //const [userInfo, setUserInfo] = useState(null);    // Kullanıcı bilgileri

  const BASE_URL = 'http://localhost:3000/api'; 

  // --- LOGIN FONKSİYONU ---
  const login = async (email, password) => {
    setIsLoading(true); // Tekerleği döndür
    try {
      // Backend'e POST isteği atıyoruz
      const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json(); // Cevabı JSON'a çevir

      if (response.ok) {
        // BAŞARILI: Backend token verdi.
        setToken(json.token);
        //setUserInfo(json.user);

        // TELEFONA KAYDET (Uygulama kapansa bile gitmez) telefona değil bilgisayara kaydedeiyoruz
        await localStorage.setItem('token',json.token);
        //await AsyncStorage.setItem('userInfo', JSON.stringify(json.user));
      } else {
        alert("Hata: " + json.message);
      }
    } catch (e) {
      console.log("Login hatası:", e);
    }
    setIsLoading(false); // İşlem bitti
  };


  const register = async (name, email, password) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      
      const json = await response.json();
      
      if (response.ok) {
        // Kayıt başarılıysa kullanıcıya bilgi veriyoruz
        alert("Kayıt Başarılı! Şimdi giriş yapabilirsiniz.");
        // İsteğe bağlı: Burada direkt login fonksiyonunu da çağırabilirsin.
      } else {
        alert("Kayıt Hatası: " + json.message);
      }
    } catch (e) {
      console.log("Register hatası:", e);
      alert("Bağlantı hatası oluştu");
    }
    setIsLoading(false);
  };



  // --- LOGOUT FONKSİYONU ---
  const logout = async () => {
    setIsLoading(true);
    setToken(null); // State'i temizle
    await AsyncStorage.removeItem('token'); // Hafızayı temizle
    //await AsyncStorage.removeItem('userInfo');
    setIsLoading(false);
  };

  // --- UYGULAMA AÇILINCA KONTROL ---
  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      // Hafızada daha önceden kalma token var mı?
      let token = await localStorage.getItem('token');
      //let user = await AsyncStorage.getItem('userInfo');

      if (token) {
        setToken(token); // Varsa state'e geri yükle
        //setUserInfo(JSON.parse(user));
      }
      setIsLoading(false);
    } catch (e) {
      console.log("Kontrol hatası:", e);
    }
  };

  // useEffect: Bu dosya ilk yüklendiğinde bir kere çalışır.
  useEffect(() => {
    isLoggedIn();
  }, []);

  return (
    <AuthContext.Provider value={{ login, logout, isLoading, token, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
};
import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

export default function SplashScreen() {
  // 1. ANİMASYON DEĞERLERİ (useRef ile hafızada tutuyoruz)
  // slideAnim: Y ekseninde (dikey) hareket için. 50 birim aşağıdan başlasın.
  const slideAnim = useRef(new Animated.Value(50)).current; 
  // fadeAnim: Görünürlük için. 0 (görünmez) başlasın.
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 2. ANİMASYONU BAŞLATMA
    // Animated.parallel: İki hareketi aynı anda yap demek.
    Animated.parallel([
      // Hareket Animasyonu (Aşağıdan Yukarı)
      Animated.timing(slideAnim, {
        toValue: 0, // 0 noktasına (orijinal yerine) gel
        duration: 1000, // 1 saniye sürsün (1000ms)
        useNativeDriver: true, // Performans için zorunlu
      }),
      // Belirme Animasyonu (Soluktan Net'e)
      Animated.timing(fadeAnim, {
        toValue: 1, // Tam görünür ol
        duration: 1000,
        useNativeDriver: true,
      })
    ]).start(); // Animasyonu ateşle
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.little}>Welcome To</Text>
      
      {/* 3. ANIMATED VIEW KULLANIMI */}
      {/* Normal View yerine Animated.View kullanmak zorundayız */}
      <Animated.View 
        style={{
          transform: [{ translateY: slideAnim }], // Y ekseninde kaydır
          opacity: fadeAnim, // Görünürlüğü değiştir
        }}
      >
        <Text style={styles.big}>ToolShare</Text>
      </Animated.View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1e75cb", // Renk kodunu düzelttim (6 haneli)
  },
  little: {
    fontSize: 16,
    color: "white",
    marginBottom: 10, // Yazılar birbirine girmesin
  },
  big: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "monospace",
    color: "white",
  }
});
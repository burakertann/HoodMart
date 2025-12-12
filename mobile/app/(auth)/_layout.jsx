import { Stack } from 'expo-router';
import React from 'react';

export default function AuthLayout() {
  return (
    <Stack>
      {/* Login Sayfası: Başlık çubuğunu gizliyoruz */}
      <Stack.Screen 
        name="Login" 
        options={{ headerShown: false }} 
      />
      
      {/* Register Sayfası: Başlık çubuğunu gizliyoruz */}
      <Stack.Screen 
        name="Register" 
        options={{ headerShown: false }} 
      />
    </Stack>
  );
}
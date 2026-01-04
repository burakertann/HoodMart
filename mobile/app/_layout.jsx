import { Stack, useRouter, useSegments, useRootNavigationState } from 'expo-router';
import { useEffect, useContext } from 'react';
import { AuthProvider, AuthContext } from '../context/AuthContext'; // Yoluna dikkat et
import { View, ActivityIndicator } from 'react-native';

const InitialLayout = () => {
  const { token, isLoading } = useContext(AuthContext);
  const router = useRouter();
  const segments = useSegments();
  
  // EKLENEN KISIM: Navigasyon ağacının durumunu kontrol eden hook
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    // 1. KURAL: Navigasyon hazır değilse HİÇBİR ŞEY YAPMA.
    if (!rootNavigationState?.key) return;

    // 2. KURAL: Veri yükleniyorsa bekle.
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)'; // Klasör ismin '(auth)' ise burayı düzelt
    const inPublicGroup = segments[0] === undefined || segments[0] === 'index';

    if (!token && !inAuthGroup && !inPublicGroup) {
      // Token yoksa ve auth grubunda değilse -> Login'e git
      router.replace('/login');
    } else if (token && inAuthGroup) {
      // Token varsa ve hala login sayfasındaysa -> Home'a git
      router.replace('/home');
    }
  }, [token, segments, isLoading, rootNavigationState]); // Dependency array'e rootNavigationState eklendi

  // Yüklenme ekranı
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(pages)" options={{ headerShown: false }} />
      <Stack.Screen name="Forms" options={{ headerShown: false }} />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
}
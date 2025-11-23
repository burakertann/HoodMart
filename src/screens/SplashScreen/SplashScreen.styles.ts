// src/screens/SplashScreen/SplashScreen.styles.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#03A9B4', // splash arka plan rengi
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Logo + shimmer'ı birlikte saran kutu
  logoWrapper: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden', // shimmer taşmasın
  },

  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  // ⚡ Shimmer çizgisi
  shimmer: {
    position: 'absolute',
    width: '40%',             // çizginin genişliği
    height: '150%',           // yüksekliği, biraz uzun olsun ki tamamen kessin
    backgroundColor: 'rgba(255,255,255,0.22)', // parlama aydınlığı
    borderRadius: 20,
  },
});

export default styles;

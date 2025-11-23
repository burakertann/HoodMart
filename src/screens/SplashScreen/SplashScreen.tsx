// src/screens/SplashScreen/SplashScreen.tsx
import React, { useEffect, useRef } from 'react';
import {
  View,
  Animated,
  Easing,
} from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../navigations/RootNavigator';
import styles from './SplashScreen.styles';

type SplashScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Splash'
>;

type Props = {
  navigation: SplashScreenNavigationProp;
};

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(30)).current;
  const scale = useRef(new Animated.Value(0.9)).current;

  const shimmerX = useRef(new Animated.Value(-500)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 1500,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.05,
          duration: 900,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    Animated.timing(shimmerX, {
      toValue: 600,          
      duration: 500,       
      delay: 1400,            
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();

    const timeout = setTimeout(() => {
      navigation.replace('Login');
    }, 4000);

    return () => clearTimeout(timeout);
  }, [navigation, opacity, translateY, scale, shimmerX]);

  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <Animated.Image
          source={require('../../../assets/SplashScreen.png')}
          style={[
            styles.image,
            {
              opacity,
              transform: [{ translateY }, { scale }],
            },
          ]}
        />

        {/* ⚡ Üstünden geçen parlama çizgisi */}
        <Animated.View
          style={[
            styles.shimmer,
            {
              transform: [
                { translateX: shimmerX },
                { rotate: '25deg' }, // diyagonal açı
              ],
            },
          ]}
        />
      </View>
    </View>
  );
};

export default SplashScreen;

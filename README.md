# HoodMart Mobile App

HoodMart, kullanıcıların mahalle içi **Rent • Buy • Swap** işlemlerini kolayca yapabilmesi için tasarlanmış bir mobil uygulamadır.  
React Native + Expo + TypeScript ile geliştirilmektedir.

## 📦 Kurulum
Projeyi kendi bilgisayarınızda çalıştırmak için:

### 1. Node.js Yükleyin

Expo ve React Native projeleri için önerilen Node sürümü **16 veya üstü**dür.

Node’u buradan yükleyebilirsiniz:  
https://nodejs.org/

Kurulum sonrası doğrulama:

```bash
node -v
npm -v
```

### 2. Expo CLI Kurulumu

Expo CLI’yi global olarak kurmak zorunlu değildir, ama önerilir:

```bash
npm install -g expo-cli
```

**Alternatif:**  
Global kurmak istemiyorsanız, her komutta `npx expo` kullanabilirsiniz.

### 3. Repoyu klonlayın
```bash
git clone https://github.com/<username>/HoodMart.git
cd HoodMart
```
### 4. Bağımlılıkları yükleyin
```bash
npm install
```

### 5. Uygulamayı başlatın
```bash
npm start
```

## 📱 Uygulamayı Çalıştırma

Expo projelerini üç farklı şekilde çalıştırabilirsiniz:  
Gerçek telefon, iOS simülatörü veya Android emülatör.

---

### 📱 A) Gerçek Telefonda Çalıştırma

1. Telefonunuza **Expo Go** uygulamasını yükleyin:
   - iOS → App Store’da “Expo Go”
   - Android → Google Play’de “Expo Go”

2. Bilgisayarınız ve telefonunuz **aynı Wi-Fi ağına** bağlı olsun.

3. `npm start` ile Expo Developer Tools açıldığında bir **QR kod** görürsünüz:
   - iPhone → Kamera uygulamasıyla QR kodu okutun → “Expo Go ile aç”
   - Android → Expo Go içinde “Scan QR Code”

4. Uygulama otomatik olarak yüklenir ve çalışmaya başlar.

Kodda yaptığınız değişiklikler anında telefona yansır (**Fast Refresh**).

---

### 🍏 B) iOS Simülatöründe Çalıştırma (sadece macOS + Xcode)

1. Xcode yüklü olmalı.  
2. `npm start` çalışırken terminalde:
   ```bash
   i
   ```
   tuşuna basın.
3. Simülatör otomatik açılır ve uygulama yüklenir.

---

### 🤖 C) Android Emülatörde Çalıştırma

1. Android Studio’yu kurun.  
2. “AVD Manager” kısmından bir sanal cihaz oluşturun.  
3. `npm start` çalışırken terminalde:
   ```bash
   a
   ```
   tuşuna basın.

Expo, emülatörü otomatik başlatır ve uygulamayı yükler.

---

## 🧠 Projenin Çalışma Mantığı ve Mimari Yapısı

### 📌 1. Ekranlar (Screens)

Her ekran iki dosyadan oluşur:

1. **`EkranAdı.tsx`** → UI, JSX yapısı, state ve logic burada yazılır.  
2. **`EkranAdı.styles.ts`** → O ekrana özel tüm stil kodları burada bulunur.

Örneğin:

```
src/
  screens/
    LoginScreen/
      LoginScreen.tsx
      LoginScreen.styles.ts
    SplashScreen/
      SplashScreen.tsx
      SplashScreen.styles.ts
```

### 📌 2. Navigasyon Yapısı

Tüm sayfa yönlendirme işlemleri `src/navigations/` klasöründe tutulur.

```
src/
  navigations/
    RootNavigator.tsx
```

Navigation mantığı:

- `RootNavigator.tsx` projedeki tüm ekranlara yönlendirmeyi sağlar  
- `Stack.Navigator` üzerinden Splash → Login → diğer sayfalara akış yönetilir  
- Navigation ekran isimleri `RootStackParamList` ile TypeScript tarafından kontrol edilir

---

### 📌 3. Görseller ve Asset Yönetimi

Tüm görseller `assets/` klasöründe tutulur:

```
assets/
  icon.png
  Logo.png
  SplashScreen.png
```

Bu klasör Expo tarafından otomatik olarak tanınır.

Kullanım:

```tsx
<Image source={require('../../assets/Logo.png')} />
```

> Not: `assets/source/` gibi klasörler **pushlanmayan ham görsel dosyaları** içindir (örn. PSD, AI, büyük boyutlu grafikler).

---

### 📌 4. Stil Sistemi (StyleSheet)

Her ekran kendi stil dosyasına sahiptir:

```ts
// EkranAdı.styles.ts
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
```

Kullanım:

```tsx
import styles from './EkranAdı.styles';

<View style={styles.container} />
```

---

### 📌 5. Ana Uygulama Akışı

```
index.ts → App.tsx → RootNavigator → SplashScreen → LoginScreen → ...
```

- `index.ts` yalnızca App’i root component olarak kaydeder  
- `App.tsx` navigation sistemini başlatır  
- `SplashScreen` açılış animasyonlarını oynatır  
- Animasyon bittiğinde `navigation.replace('Login')` ile Login ekranına geçilir  

---
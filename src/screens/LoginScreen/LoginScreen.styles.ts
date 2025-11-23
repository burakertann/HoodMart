// src/screens/LoginScreen.styles.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1cafb6',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    padding: 24,
    borderRadius: 16,
    backgroundColor: '#1cafb6',
    borderColor : '#ffffffff',
    borderWidth : 4,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#ffffffff',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ffffffff',
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#ffffffff',
    marginBottom: 14,
  },
  button: {
    backgroundColor: '#ffffffff',
    borderRadius: 999,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#1cafb6',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomTextContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  bottomText: {
    color: '#ffffffff',
    fontSize: 13,
  },
  bottomLink: {
    color: '#000000ff',
    fontWeight: '600',
  },
});

export default styles;

import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

export default function SplashScreenComponent({ onReady }) {
  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
      // Simulate font/data loading or do it outside this component
      setTimeout(async () => {
        await SplashScreen.hideAsync();
        onReady();
      }, 1500);
    }
    prepare();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('./assets/splash.png')} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c2185b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
});

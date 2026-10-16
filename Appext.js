import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function AppText({ children, style, bold = false }) {
  return (
    <Text style={[styles.text, bold && styles.bold, style]}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'poppins',
  },
  bold: {
    fontFamily: 'poppins-bold',
  },
});

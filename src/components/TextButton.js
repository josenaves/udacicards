import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { purple } from '../colors';

const styles = StyleSheet.create({
  reset: {
    textAlign: 'center',
    color: purple,
  },
});

export default function TextButton({children, onPress, style = {}, disabled=false}) {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <Text style={[styles.reset, style]}>{children}</Text>
    </TouchableOpacity>
  );
}

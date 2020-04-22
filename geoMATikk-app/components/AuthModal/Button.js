import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

function Button({ text, loading, disabled, onPress }) {
  return (
    <TouchableOpacity style={styles.submitButton} onPress={onPress} disabled={disabled}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text style={{ fontSize: 20, textAlign: 'center' }}>{text}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  submitButton: {
    alignSelf: 'center',
    padding: 15,
    backgroundColor: 'lightgreen',
    borderRadius: 20,
    width: 180,
  },
});

export default Button;

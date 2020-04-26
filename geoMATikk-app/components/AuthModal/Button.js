import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { primary } from '../../assets/colors';

function Button({ text, loading, disabled, onPress }) {
  return (
    <TouchableOpacity style={styles.submitButton} onPress={onPress} disabled={disabled}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text style={{ fontSize: 20, textAlign: 'center', color: 'white' }}>{text}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  submitButton: {
    alignSelf: 'center',
    padding: 15,
    backgroundColor: primary,
    borderRadius: 8,
    width: 180,
    marginTop: 30,
  },
});

export default Button;

import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function PasswordInput(props) {
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder={props.check ? 'Gjenta passord' : 'Passord'}
        placeholderTextColor="rgba(0,0,0,0.5)"
        secureTextEntry={hidePassword}
        style={styles.regUser}
        onChangeText={text => props.onChangeText(text)}
      />
      <TouchableOpacity
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        onPressIn={() => setHidePassword(false)}
        onPressOut={() => setHidePassword(true)}
      >
        <Ionicons name="md-eye" size={32} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  regUser: {
    color: 'black',
    marginTop: '10%',
    flex: 1,
  },
});

export default PasswordInput;

import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
import { useAuth } from '../../hooks/useAuth';
import PasswordInput from './PasswordInput';
import Button from './Button';
import { primary, dark, medium, light } from '../../assets/colors';

export default function LoginComponent(props) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const auth = useAuth();

  const handleLogin = () => {
    if (username) {
      auth.signin(username.toLowerCase(), password);
    }
  };

  return (
    <>
      <Text style={styles.header}>Logg inn</Text>
      <TouchableOpacity
        style={{ paddingVertical: 10 }}
        onPress={() => {
          props.setMode('register');
        }}
      >
        <Text style={styles.link}>Registrer bruker</Text>
      </TouchableOpacity>
      <View>
        <TextInput
          placeholder="Brukernavn"
          placeholderTextColor="rgba(0,0,0,0.5)"
          marginBottom="5%"
          style={styles.regUser}
          onChangeText={text => setUsername(text)}
        />
        <PasswordInput onChangeText={text => setPassword(text)} />
        <Text style={styles.errorText}>{auth.error}</Text>
        <Button text="Logg inn" onPress={handleLogin} disabled={!username} loding={auth.loading}/>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  loginbox: {
    padding: 30,
    margin: 0,
    marginLeft: 20,
    marginRight: 8,
    display: 'flex',
    flexDirection: 'column',
    marginTop: 110,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  link: {
    color: medium,
  },
  closelogin: {
    display: 'flex',
    flexDirection: 'row',
    width: '8%',
    justifyContent: 'space-around',
  },
  regUser: {
    color: 'black',
    marginTop: '10%',
  },
  submitButton: {
    alignSelf: 'center',
    padding: 15,
    backgroundColor: primary,
  },
  errorText: {
    color: 'red',
  },
});

import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
import PasswordInput from './PasswordInput';
import { useAuth } from '../../hooks/useAuth';

export default function RegisterComponent(props) {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [error, setError] = useState();
  const auth = useAuth();

  useEffect(() => {
    if (auth.user) {
      props.setMode('logout');
    }
  }, [auth.user]);

  const handleSignup = () => {
    if (username.length < 4) {
      setError('Username must be at least 4 characters long');
    } else if (password.length < 6) {
      setError('Password must be at least 6 characters long');
    } else if (password !== passwordCheck) {
      setError('Passwords must be identical');
    } else {
      setError(null);
      auth.signup(username.toLowerCase(), password);
    }
  };

  return (
    <>
      <Text style={styles.header}>Registrer Bruker</Text>
      <TouchableOpacity
        style={{ paddingVertical: 10 }}
        onPress={() => {
          props.setMode('login');
        }}
      >
        <Text style={styles.link}>Har allerede bruker</Text>
      </TouchableOpacity>
      <TextInput
        placeholder="Brukernavn"
        placeholderTextColor="rgba(0,0,0,0.5)"
        style={styles.regUser}
        onChangeText={text => setUsername(text)}
      />
      <PasswordInput onChangeText={text => setPassword(text)} />
      <PasswordInput onChangeText={text => setPasswordCheck(text)} check />
      <Text style={styles.errorText}>{error || auth.error}</Text>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSignup}
        disabled={!username || !password}
      >
        <Text style={{ fontSize: 20 }}>Registrer bruker</Text>
      </TouchableOpacity>
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
    color: 'blue',
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
    backgroundColor: 'lightgreen',
    borderRadius: 20,
  },
  errorText: {
    color: 'red',
  },
});

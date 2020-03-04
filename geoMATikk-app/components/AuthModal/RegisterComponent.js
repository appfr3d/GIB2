import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterComponent(props) {
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
        placeholder="Fornavn"
        placeholderTextColor="rgba(0,0,0,0.5)"
        style={styles.regUser}
      />
      <TextInput
        placeholder="Etternavn"
        placeholderTextColor="rgba(0,0,0,0.5)"
        style={styles.regUser}
      />
      <TextInput
        placeholder="E-post"
        placeholderTextColor="rgba(0,0,0,0.5)"
        style={styles.regUser}
      />
      <TextInput
        placeholder="Brukernavn"
        placeholderTextColor="rgba(0,0,0,0.5)"
        style={styles.regUser}
      />
      <TextInput
        placeholder="Passord"
        placeholderTextColor="rgba(0,0,0,0.5)"
        secureTextEntry
        style={styles.regUser}
      />
      <TouchableOpacity style={styles.submitButton} onPress={() => {}}>
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
    padding: 30,
    // borderColor: 'black',
    // borderWidth: 2,
  },
});

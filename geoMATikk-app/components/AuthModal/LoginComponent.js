import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';

export default function LoginComponent(props) {
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
        />
        <TextInput
          placeholder="Passord"
          placeholderTextColor="rgba(0,0,0,0.5)"
          marginBottom="10%"
          secureTextEntry
          style={styles.regUser}
        />
        <TouchableOpacity style={styles.submitButton} onPress={() => {}}>
          <Text style={{ fontSize: 20 }}>Logg inn</Text>
        </TouchableOpacity>
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
  },
});

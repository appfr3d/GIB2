import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function LogoutComponent(props) {
  return (
    <>
      <Text style={styles.header}>Logget inn som:</Text>
      <Text style={styles.name}>{props.name}</Text>
      <TouchableOpacity style={styles.submitButton} onPress={props.onLogout}>
        <Text style={{ fontSize: 20 }}>Logg ut</Text>
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
    backgroundColor: 'red',
    borderRadius: 20,
  },
  errorText: {
    color: 'red',
  },
  name: {
    fontSize: 40,
    fontWeight: 'bold',
  },
});

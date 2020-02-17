/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  TouchableHighlight,
  KeyboardAvoidingView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AuthModal(props) {
  const { authModalVisible, setAuthModalVisible } = props;
  const [registerUserVisible, setRegisterUserVisible] = useState(false);
  const [logInBoxVisible, setLoginBoxVisible] = useState(true);
  return (
    <Modal
      style={styles.modalStyle}
      animationType="fade"
      transparent
      visible={authModalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}
    >
      <View style={{ backgroundColor: 'rgba(0,0,0,0.4)', flex: 1 }}>
        <KeyboardAvoidingView behavior="position">
          {!logInBoxVisible ? null : (
            <View style={styles.loginbox}>
              <View
                style={{
                  justifyContent: 'flex-end',
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <TouchableOpacity
                  hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                  style={styles.closelogin}
                  onPress={() => {
                    setAuthModalVisible(!authModalVisible);
                    setRegisterUserVisible(!logInBoxVisible);
                  }}
                >
                  <Ionicons name="md-close" size={20} />
                </TouchableOpacity>
              </View>
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

                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}
                >
                  <TouchableHighlight
                    onPress={() => {
                      setAuthModalVisible(!authModalVisible);
                    }}
                  >
                    <Text>Logg inn</Text>
                  </TouchableHighlight>
                  <TouchableOpacity
                    onPress={() => {
                      setRegisterUserVisible(true);
                      setLoginBoxVisible(false);
                    }}
                  >
                    <Text>Registrer user</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          {!registerUserVisible ? null : (
            <View style={styles.loginbox}>
              <View
                style={{
                  justifyContent: 'flex-end',
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <TouchableOpacity
                  hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                  style={styles.closelogin}
                  onPress={() => {
                    setAuthModalVisible(!authModalVisible);
                    setRegisterUserVisible(false);
                    setLoginBoxVisible(true);
                  }}
                >
                  <Ionicons name="md-close" size={20} />
                </TouchableOpacity>
              </View>
              <Text style={{ fontSize: 20 }}>Registrer Bruker</Text>
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
            </View>
          )}
        </KeyboardAvoidingView>
      </View>
    </Modal>
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
  closelogin: {
    display: 'flex',
    flexDirection: 'row',
    width: '8%',
    justifyContent: 'space-around',
  },
  modalStyle: {
    opacity: 1,
  },
  regUser: {
    color: 'black',
    marginTop: '10%',
  },
});

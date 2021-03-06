/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import LoginComponent from './LoginComponent';
import RegisterComponent from './RegisterComponent';
import LogoutComponent from './LogoutComponent';
import { useAuth } from '../../hooks/useAuth';
import { primary } from '../../assets/colors';

export default function AuthModal(props) {
  const auth = useAuth();
  const [mode, setMode] = useState(auth.user ? 'logout' : 'login');

  useEffect(() => {
    if (auth.user) {
      props.setAuthModalVisible(false);
    } else {
      setMode('login');
    }
  }, [auth.user]);

  return (
    <Modal
      style={styles.modalStyle}
      animationType="fade"
      transparent
      visible={props.authModalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
      }}
    >
      <View style={{ backgroundColor: 'rgba(0,0,0,0.4)', flex: 1 }}>
        <KeyboardAvoidingView behavior="position">
          <View style={styles.loginbox}>
            {
              {
                login: <LoginComponent setMode={setMode} />,
                register: <RegisterComponent setMode={setMode} />,
                logout: (
                  <LogoutComponent name={auth.user && auth.user.username} onLogout={auth.signout} />
                ),
              }[mode]
            }
            <TouchableOpacity
              hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
              style={styles.closelogin}
              backgroundColor={primary}
              onPress={() => {
                props.setAuthModalVisible(false);
              }}
            >
              <Ionicons name="md-close" size={20} />
            </TouchableOpacity>
          </View>
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
    position: 'absolute',
    top: 30,
    right: 30,
    // flexDirection: 'row',
    // width: '8%',
    // justifyContent: 'space-around',
  },
  modalStyle: {
    opacity: 1,
  },
});

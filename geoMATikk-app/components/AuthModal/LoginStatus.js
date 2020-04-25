import React from 'react';
import { StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../hooks/useAuth';

import { primary, light, dark } from '../../assets/colors';

const LoginStatus = () => {
  const auth = useAuth();
  let name;
  let color;
  if (auth.user) {
    name = 'md-checkmark-circle';
    color = light;
  } else {
    name = 'md-close-circle';
    color = 'red';
  }
  return <Ionicons style={styles.loginStatus} name={name} size={20} color={color} />;
};

const styles = StyleSheet.create({
  loginStatus: {
    position: 'absolute',
    bottom: -1,
    left: -2,
  },
});

export default LoginStatus;

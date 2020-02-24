/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TopMenu, AuthModal, MapComponent } from './components';

export default function App() {
  const [authModalVisible, setAuthModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <MapComponent />
      <TopMenu authModalVisible={authModalVisible} setAuthModalVisible={setAuthModalVisible} />
      <AuthModal authModalVisible={authModalVisible} setAuthModalVisible={setAuthModalVisible} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

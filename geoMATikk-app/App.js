/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TopMenu, AuthModal, MapComponent } from './components';
import { FilterProvider } from './context/FilterContext';

export default function App() {
  const [authModalVisible, setAuthModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <FilterProvider>
        <MapComponent />
        <TopMenu authModalVisible={authModalVisible} setAuthModalVisible={setAuthModalVisible} />
        <AuthModal authModalVisible={authModalVisible} setAuthModalVisible={setAuthModalVisible} />
      </FilterProvider>
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

/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { TopMenu, AuthModal, MapComponent } from './components';
import { FilterProvider } from './context/FilterContext';
import FindRestaurant from './components/FindRestaurant';
import { ProvideAuth, useAuth } from './hooks/useAuth';

import { primary, light, dark } from './assets/colors';

export default function App() {
  const [authModalVisible, setAuthModalVisible] = useState(false);
  const [findRestaurantVisible, setFindRestaurantVisible] = useState(false);

  return (
    <View style={styles.container}>
      <ProvideAuth>
        <FilterProvider>
          <MapComponent />
          <TopMenu authModalVisible={authModalVisible} setAuthModalVisible={setAuthModalVisible} />
          <AuthModal
            authModalVisible={authModalVisible}
            setAuthModalVisible={setAuthModalVisible}
          />
          <FindRestaurant
            findRestaurantVisible={findRestaurantVisible}
            setFindRestaurantVisible={setFindRestaurantVisible}
          />

          <TouchableOpacity
            style={styles.findRestButton}
            onPress={() => {
              setFindRestaurantVisible(!findRestaurantVisible);
            }}
          >
            <Text style={{ fontSize: 25, textAlign: 'center', color: 'white' }}>Finn restaurant</Text>
          </TouchableOpacity>
        </FilterProvider>
      </ProvideAuth>
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
  findRestButton: {
    padding: 15,
    display: 'flex',
    backgroundColor: primary,
    width: '100%',
    height: '10%',
  },
});

import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { TopMenu, AuthModal, MapComponent } from '.';
import FindRestaurant from './FindRestaurant';
import { useRestaurants } from '../hooks';

import { primary } from '../assets/colors';

function Wrapper() {
  const [restaurants, fetchRestaurants] = useRestaurants();
  const [authModalVisible, setAuthModalVisible] = useState(false);
  const [findRestaurantVisible, setFindRestaurantVisible] = useState(false);

  return (
    <>
      <MapComponent restaurants={restaurants} />
      <TopMenu authModalVisible={authModalVisible} setAuthModalVisible={setAuthModalVisible} />

      <AuthModal authModalVisible={authModalVisible} setAuthModalVisible={setAuthModalVisible} />
      <FindRestaurant
        findRestaurantVisible={findRestaurantVisible}
        setFindRestaurantVisible={setFindRestaurantVisible}
        fetchRestaurants={fetchRestaurants}
      />

      <TouchableOpacity
        style={styles.findRestButton}
        onPress={() => {
          setFindRestaurantVisible(!findRestaurantVisible);
        }}
      >
        <Text style={{ fontSize: 25, textAlign: 'center', color: 'white' }}>Finn restaurant</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  findRestButton: {
    padding: 15,
    display: 'flex',
    backgroundColor: primary,
    width: '100%',
    height: '10%',
  },
});

export default Wrapper;

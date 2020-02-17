/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { TopMenu, AuthModal } from './components';

const marker = {
  latlng: {
    latitude: 63.430646,
    longitude: 10.397,
  },
  title: 'McDonalds',
  description: 'Burger<3',
};

export default function App() {
  const [restInfoVisible, setRestInfoVisible] = useState(false);
  const [authModalVisible, setAuthModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        initialRegion={{
          latitude: 63.430646,
          longitude: 10.397,
          latitudeDelta: 0.0372,
          longitudeDelta: 0.0271,
        }}
      >
        <Marker
          coordinate={marker.latlng}
          // title={marker.title}
          // description={marker.description}
          onPress={() => setRestInfoVisible(!restInfoVisible)}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        />
      </MapView>
      <TopMenu authModalVisible={authModalVisible} setAuthModalVisible={setAuthModalVisible} />
      <AuthModal authModalVisible={authModalVisible} setAuthModalVisible={setAuthModalVisible} />

      {!restInfoVisible ? null : (
        <View style={styles.restInfo}>
          <TouchableOpacity
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            style={styles.closelogin}
            onPress={() => {
              setRestInfoVisible(false);
            }}
          >
            <Ionicons name="md-close" size={20} />
          </TouchableOpacity>
          <View style={styles.restTitle}>
            <Text>Restaurantnavn</Text>
          </View>

          <View style={styles.restDesc}>
            <Text>Info om restaurant</Text>
          </View>
        </View>
      )}
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
  mapStyle: {
    ...StyleSheet.absoluteFill,
  },
  closelogin: {
    display: 'flex',
    flexDirection: 'row',
    width: '8%',
    justifyContent: 'space-around',
  },
  restInfo: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    height: 200,
    width: '90%',
    borderRadius: 25,
    padding: 20,
  },
});

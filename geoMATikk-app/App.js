import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, StatusBar } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';

const marker = {
  latlng: {
    latitude: 63.430646,
    longitude: 10.397,
  },
  title: 'Test',
  description: 'Description',
};

export default function App() {
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
        // provider={PROVIDER_GOOGLE}
      >
        <Marker coordinate={marker.latlng} title={marker.title} description={marker.description} />
      </MapView>
      <View style={styles.topMenu}>
        <View style={styles.searchView}>
          <TextInput placeholder="Search" style={styles.searchInput} />
          <Ionicons name="md-search" size={32} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    ...StyleSheet.absoluteFill,
  },
  topMenu: {
    position: 'absolute',
    top: StatusBar.currentHeight + 10,
    left: 10,
    borderWidth: 1,
    borderColor: 'red',
  },
  searchView: {
    // position: 'absolute',
    // top: StatusBar.currentHeight + 10,
    // left: 10,
    width: '50%',
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  searchInput: {
    width: '80%',
    marginLeft: 5,
  },
});

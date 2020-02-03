import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import TopMenu from './components/TopMenu';

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
      >
        <Marker coordinate={marker.latlng} title={marker.title} description={marker.description} />
      </MapView>
      <TopMenu />
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
});

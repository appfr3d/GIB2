import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';

function MapComponent() {
  const [restInfoVisible, setRestInfoVisible] = useState(false);
  const marker = {
    latlng: {
      latitude: 63.430646,
      longitude: 10.397,
    },
    title: 'McDonalds',
    description: 'Burger<3',
  };
  return (
    <>
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
    </>
  );
}

const styles = StyleSheet.create({
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

export default MapComponent;

import React from 'react';
import { Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

function FilterLocation() {
  async function getLocationAsync() {
    // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
    const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
      console.log(location);
      return location;
    }
    throw new Error('Location permission not granted');
  }

  return <Button title="Location" onPress={getLocationAsync} />;
}

export default FilterLocation;

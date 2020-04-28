import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import MapView from 'react-native-map-clustering';
import { /* MapView, */ Marker } from 'react-native-maps';
import { useRestaurants } from '../hooks';

import RestaurantList from './RestaurantList';
import RestaurantInfo from './RestaurantInfo';

import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { useFilterDispatch } from '..//context/FilterContext';


import { primary, medium } from '../assets/colors';

function MapComponent({ restaurants }) {
  // const [restaurants] = useRestaurants(); // Restaurant data
  const [restListVisible, setRestListVisible] = useState(false); // om listen i bunnen er synlig eller ikke
  const [restInfoVisible, setRestInfoVisible] = useState(false); // om informasjon om én restaurant er synlig
  // const [selectedRestaurantID, setSelectedRestaurantID] = useState(null); // id-en til den valgte restauranten
  const [selectedRestaurant, setSelectedRestaurant] = useState(null); // restaurant objektet som er valgt

  const filterDispatch = useFilterDispatch();
  async function getLocationAsync() {
    const { status, permissions } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
      console.log(location);
      filterDispatch({ type: 'set_position', payload: location });
    } 
  }
  useEffect(() => {
    getLocationAsync();
  }, []);

  useEffect(() => {
    console.log('rerender');
    if (selectedRestaurant) {
      console.log(`Selected restauant: ${selectedRestaurant.name}`);
      mapRef.animateToRegion({
        latitude: selectedRestaurant.location.latitude - 0.0003, // for å vise pinnen over boksen
        longitude: selectedRestaurant.location.longitude,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002,
      });
      setRestListVisible(true);
    }
  }, [selectedRestaurant]);

  useEffect(() => {
    console.log(`restListVisible is:${restListVisible}`);
  }, [restListVisible]);

  useEffect(() => {
    // console.log('useEffect:', restaurants && restaurants[0].id);
  }, [restaurants]);

  // useEffect(() => {
  //   if (selectedRestaurantID !== null) {
  //     setSelectedRestaurant(restaurants.find(x => x.id === selectedRestaurantID));
  //   }
  // }, [selectedRestaurantID]);

  const selectRestaurant = restaurant => {
    // if (!restListVisible) {
    // console.log(restaurant);
    console.log(`show restaurant: ${restaurant.name}`);
    setSelectedRestaurant(restaurant);

    // mapRef.animateToRegion({
    //   latitude: restaurant.location.latitude,
    //   longitude: restaurant.location.longitude,
    //   latitudeDelta: 0.001,
    //   longitudeDelta: 0.001,
    // });
    // }
  };

  const hideRestInfo = event => {
    // if (restListVisible) {
    if (event.nativeEvent.action !== 'marker-press') {
      console.log('hide');
      setRestListVisible(false);
    }

    // const restaurant = restaurants.find(x => x.id === selectedRestaurantID);
    // if (restaurant !== undefined && restaurant !== null) {
    //   mapRef.animateToRegion({
    //     latitude: restaurant.location.latitude,
    //     longitude: restaurant.location.longitude,
    //     latitudeDelta: 0.006,
    //     longitudeDelta: 0.006,
    //   });
    // }
    // }
  };

  let mapRef = useRef(null);

  console.log('rerendering', restaurants && restaurants.length);
  return (
    <>
      <MapView
        mapRef={ref => (mapRef = ref)}
        style={styles.mapStyle}
        clusterColor={medium}
        showsUserLocation
        showsPointsOfInterest={false}
        initialRegion={{
          latitude: 63.430646,
          longitude: 10.397,
          latitudeDelta: 0.0372,
          longitudeDelta: 0.0271,
        }}
        onPress={hideRestInfo}
      >
        {restaurants &&
          restaurants.length &&
          restaurants.map(restaurant => (
            <Marker
              key={restaurant.id}
              coordinate={restaurant.location}
              pinColor={primary}
              // title={restaurant.name}
              // description={restaurant.description}
              onPress={() => selectRestaurant(restaurant)}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            />
          ))}
      </MapView>
      {restListVisible && (
        <RestaurantList
          restaurants={restaurants}
          setVisible={setRestListVisible}
          selectedRestaurant={selectedRestaurant}
          setSelectedRestaurant={setSelectedRestaurant}
          showMoreInfo={setRestInfoVisible}
        />
      )}
      {restInfoVisible && (
        <RestaurantInfo
          restaurant={selectedRestaurant}
          setInfoVisible={setRestInfoVisible}
          setListVisible={setRestListVisible}
        />
      )}
    </>
  );
}

/*
<View style={{ width: 20, height: 20, backgroundColor: 'red' }} />
(
        <View style={styles.restInfo}>
          <TouchableOpacity
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            style={styles.closelogin}
            onPress={() => {
              setRestListVisible(false);
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
      )

*/

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

/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
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

        <View>
          <View style={styles.restInfo}>
            <View style={styles.restBox}>
              <TouchableOpacity
                hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
                style={styles.closelogin}
                onPress={() => {
                  setRestInfoVisible(false);
                }}
              >
                <Ionicons name="md-close" size={20} style={{marginRight: 20}} />
              </TouchableOpacity>

              <View style={styles.restText}>
                <View style={styles.restTitle}>
                    <Text style={{fontSize: 20}}>Restaurantnavn</Text>
                </View>

                <View style={styles.restDesc}>
                  <Text>Info om restaurant</Text>
                </View>
              </View>
            </View>

            <View style={styles.restImg}>
              <Image 
                source={{uri: 'https://www.trondheimcityguide.no/media/djmediatools/cache/270-starbucks/775x500-crop-100-starbucks-trondheim.jpg'}} 
                style={{width: 260, height: 150, margin: 10}} 
                
              />
            </View>  
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
    justifyContent: 'space-around',
  },
  restInfo: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    height: 250,
    borderRadius: 25,
    padding: 20, 
  },
  restTitle: {
    display: 'flex',
    flexDirection: 'column',
  }, 
  restDesc: {
    display: 'flex',
    flexDirection: 'column',
  },
  restBox:{
    display: 'flex',
    flexDirection: 'row',
  },
  restText: {

  },
  restImg: {
    display:'flex',
    flexDirection: 'column',
  },

});

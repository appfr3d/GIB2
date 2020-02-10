import React, { useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableHighlight, Modal, } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';

const marker = {
  latlng: {
    latitude: 63.430646,
    longitude: 10.397,
  },
  title: 'McDonalds',
  description: 'Burger<3',
};

export default function App() {

  const [modalVisible, setModalVisible] = useState(false);

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
          <TouchableOpacity>
      <Ionicons name = "md-funnel" size = {32}> </Ionicons>
          </TouchableOpacity>
          <TextInput placeholder="Search" style={styles.searchInput} />
          <TouchableOpacity onPress = {() => 
          setModalVisible(true)}>
          <Ionicons name="md-search" size={32} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress = {() => 
          setModalVisible(true)} >
          <Ionicons name = "md-person"></Ionicons>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={{ marginTop: 10 }}>
          <View>
            <Text>Hello World!</Text>

            <TouchableHighlight
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
      
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
    top: Constants.statusBarHeight + 10,
    left: 10,
    borderWidth: 0,
  },
  searchView: {
    // position: 'absolute',
    // top: StatusBar.currentHeight + 10,
    // left: 10,
    width: '85%',
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
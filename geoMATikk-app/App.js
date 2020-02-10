import React, { useState} from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, StatusBar, TouchableOpacity, Button, Alert, Modal, TouchableHighlight } from 'react-native';
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

  const [logInModelVisible, setlogInModelVisible] = useState(false);
  const [filterModelVisible, setFilterModelVisible] = useState(false);

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
          <TouchableOpacity style={styles.filterbutton}>
              <View><Ionicons name="md-funnel" size={32} /></View>
          </TouchableOpacity>
        
          <TextInput placeholder="Search" style={styles.searchInput} />
          <Ionicons name="md-search" size={32} />
        </View>

        <TouchableOpacity 
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}} 
          onPress = { () => 
          setlogInModelVisible(!logInModelVisible)} > 

          <Ionicons style= {styles.loginperson}name="md-person" size={40}/>
            
        </TouchableOpacity>  


      </View>

        <Modal style={styles.modalStyle}

          animationType="fade"
          transparent= {true}
          visible={logInModelVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          
          <View style={{backgroundColor: 'rgba(0,0,0,0.3)', flex: 1}}>
            <View style={styles.loginbox}>
              <TouchableOpacity     
                hitSlop={{top: 15, bottom: 15, left: 15, right: 15}} 
                style={styles.closelogin} 
                onPress={() => {
                  setlogInModelVisible(!logInModelVisible);
                }}>
                    <Ionicons name="md-close" size={20}/>
                    
                </TouchableOpacity>
              <View>
                <TextInput placeholder="Brukernavn" placeholderTextColor= "rgba(0,0,0,0.5)" marginBottom='5%'></TextInput>
                <TextInput placeholder="Passord" placeholderTextColor= "rgba(0,0,0,0.5)" marginBottom='10%'></TextInput>

                <TouchableHighlight
                  onPress={() => {
                    setlogInModelVisible(!logInModelVisible);
                  }}>
                  <Text>Logg inn</Text>
                </TouchableHighlight>
              </View>

              
            </View>
          </View>
        </Modal>

        <Modal           
          animationType="fade"
          transparent= {true}
          visible={logInModelVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
            <View>
              
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
    flexDirection: "row",

  },
  searchView: {
    //position: 'absolute',
    // top: StatusBar.currentHeight + 10,
    // left: 10,
    width: '75%',
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  searchInput: {
    width: '60%',
    marginLeft: 7,

  },

  filterbutton: {
   flexDirection: "column",
   paddingRight: 10,
    },

  loginperson: {
    marginLeft: 50,
  },

  loginbox: {
    padding: 30,
    margin: 0,
    marginLeft: 20,
    marginRight: 8,
    display: 'flex', 
    flexDirection: 'column',
    marginTop: 110,
    borderRadius: 10,
    backgroundColor: 'white'
   
  }, 

  closelogin: {
    display: 'flex',
    flexDirection: 'row-reverse'
  },

  modalStyle: {
    opacity: 1
  }

});

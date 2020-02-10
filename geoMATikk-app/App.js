import React, { useState} from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Dimensions, 
  TextInput, 
  StatusBar, 
  TouchableOpacity, 
  Button, 
  Alert, 
  Modal, 
  TouchableHighlight,
  Slider
} from 'react-native';
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
  const [distanceValue, setDistanceValue] = useState(10);

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
        <View style={styles.searchContainer}>
          <View style={styles.searchView}>
            <TouchableOpacity style={styles.filterbutton} 
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}} 
              onPress = { () => 
              setFilterModelVisible(!filterModelVisible)} > 
                
                <Ionicons name="md-funnel" size={32} />
            </TouchableOpacity>
          
            <TextInput placeholder="Search" style={styles.searchInput} />
            <Ionicons name="md-search" size={32} />
            
          </View>
          {
            !filterModelVisible ? null : 
            <View style={styles.filterbox}>  
              <View style= {styles.filterOption}>
                <Text>Rating</Text>
              </View> 

              <View style= {styles.filterOption}>
                <Text>Prisklasse</Text>
              </View> 

              <View style={styles.filterOption}>
                <Text>Avstand</Text>

                <Slider 
                  style={{ width: 120, height: 40}}
                  minimumValue={0}
                  maximumValue={10}
                  onValueChange={value=>setDistanceValue(Math.round(value))}
                  value={10}
                />
                <Text style={{width: 40}}>{distanceValue} km</Text>

              </View> 
            
              <View style= {styles.filterOption}>
                <Text>Type mat</Text>
              </View> 
              
            </View> 
          }
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
  searchContainer: {
    width: '75%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
  },
  searchView: {
    //position: 'absolute',
    // top: StatusBar.currentHeight + 10,
    // left: 10,
    height: 40,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  searchInput: {
    width: '60%',
    marginLeft: 7,
  },

  filterbutton: {
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
  }, 

  filterbox: {
    padding: 5,
    paddingTop: 30,
    margin: 20,
    display: 'flex', 
    flexDirection: 'column',
    borderRadius: 10,
    backgroundColor: 'white',
   
  }, 

  filterOption: {
    marginBottom: 25, 
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent: 'space-between'
  }, 

});

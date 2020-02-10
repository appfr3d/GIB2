import React, { useState} from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  TextInput, 
  TouchableOpacity, 
  Alert, 
  Modal, 
  TouchableHighlight,
  Slider,
  Console
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
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

  const [searchInput, setSearchInput] = useState('Placeholder');

  const [logInModelVisible, setlogInModelVisible] = useState(false);
  const [filterModelVisible, setFilterModelVisible] = useState(false);
  const [distanceValue, setDistanceValue] = useState(10);
  const [registerUserVisible, setRegisterUserVisible] = useState(false);
  const [restInfoVisible, setRestInfoVisible] = useState(false);

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
      <Marker 
        coordinate={marker.latlng} 
        //title={marker.title} 
        //description={marker.description}
        onPress={() =>
        setRestInfoVisible(!restInfoVisible)} 
        hitSlop={{top: 20, bottom: 20, left: 20, right: 20}} 
        />
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
            <TextInput 
              placeholder="Search" 
              style={styles.searchInput}
              onChangeText={(value) => {
                setSearchInput({value})
              }} />
            <TouchableOpacity>
              <Ionicons name="md-search" size={32} />
            </TouchableOpacity>
            <Text></Text>

            
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
        
        <View style={{backgroundColor: 'rgba(0,0,0,0.4)', flex: 1}}>
          <View style={styles.loginbox}>
            <View>
              <TextInput placeholder="Brukernavn" placeholderTextColor= "rgba(0,0,0,0.5)" marginBottom='5%'></TextInput>
              <TextInput placeholder="Passord" placeholderTextColor= "rgba(0,0,0,0.5)" marginBottom='10%'></TextInput>

              <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around'}}>
                <TouchableHighlight
                onPress={() => {
                  setlogInModelVisible(!logInModelVisible);
                }}>
                <Text>Logg inn</Text>
                </TouchableHighlight>
                <TouchableOpacity                   
                  onPress={() => {
                    setRegisterUserVisible(!registerUserVisible);
                  }}> 
                  <Text>Registrer user</Text>

                </TouchableOpacity>
              </View>
            </View>
              <TouchableOpacity     
                hitSlop={{top: 15, bottom: 15, left: 15, right: 15}} 
                style={styles.closelogin} 
                onPress={() => {
                  setlogInModelVisible(!logInModelVisible);
                  setRegisterUserVisible(false);
                }}>
                    <Ionicons name="md-close" size={20}/>
              </TouchableOpacity>
            {!registerUserVisible ? null : 
              <View style={styles.registrerUser}>
                <Text>Halla</Text>
              </View>
              }

            
          </View>
        </View>
      </Modal>

      {!restInfoVisible ? null : 
      <View style={styles.restInfo}>
        <TouchableOpacity 
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}} 
          style={styles.closelogin} 
          onPress={() => {
            setRestInfoVisible(false);
          }}>
            <Ionicons name="md-close" size={20}></Ionicons>
        </TouchableOpacity>
          <View style= {styles.restTitle}>
            <Text>Restaurantnavn</Text>
          </View> 

          <View style= {styles.restDesc}>
            <Text>Info om restaurant</Text>
          </View> 
      </View> 
      }
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
    flexDirection: 'column-reverse',
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
  registrerUser: {
    display: 'flex',
    alignItems: 'flex-start',
    height: 100
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
  }
});

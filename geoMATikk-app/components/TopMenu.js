/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet, Text, Button, Modal, ScrollView, FlatList } from 'react-native';
import Constants from 'expo-constants';
import { Dropdown } from 'react-native-material-dropdown';
import { Ionicons } from '@expo/vector-icons';
import CheckBox from 'react-native-modest-checkbox'; 
import SnapSlider from 'react-native-snap-slider';




function TopMenu(props) {
  const { authModalVisible, setAuthModalVisible } = props;
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [searchInput, setSearchInput] = useState('Placeholder');
  const [distanceValue, setDistanceValue] = useState(10);
  const [priceChecked, setPriceChecked] = useState(false);
  const [nearbyChecked, setNearbyChecked] = useState(false); 
  const [ratingChecked, setRatingChecked] = useState(false); 
  const [pricePriority, setPricePriority] = useState(1);
  const [nearbyPriority, setNearbyPriority] = useState(1); 
  const [ratingPriority, setRatingPriority] = useState(1); 
  const [kitchenVisible, setKitchenVisible] = useState(false);

  const [kjokken, setKjokken]= useState([
  
    {
      id: '1',
      title: 'Italiensk',
    }, 
  
    {
      id:'2',
      title: 'Asiatisk',
    }, 
    {
      id:'3',
      title: 'Meksikansk',
    }, 
    {
      id:'4',
      title: 'Amerikansk',
    }, 
    {
      id:'5',
      title: 'Nordisk',
    },
  
  ]);

  sliderOptions = [
    { value:0, label: 'Uviktig'},
    { value:1, label: 'Passe viktig'}, 
    { value:2, label: 'Viktig'}

  ]; 
  
  return (
    <View style={styles.topMenu}>
      <View style={styles.searchContainer}>
        <View style={styles.searchView}>
          <TouchableOpacity
            style={styles.filterbutton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            onPress={() => setFilterModalVisible(!filterModalVisible)}
          >
            <Ionicons name="md-funnel" size={32} />
          </TouchableOpacity>
          <TextInput
            placeholder="Search"
            style={styles.searchInput}
            onChangeText={value => {
              setSearchInput({ value });
            }}
          />
          <TouchableOpacity>
            <Ionicons name="md-search" size={32} />
          </TouchableOpacity>
          <Text />
        </View>
        {!filterModalVisible ? null : (
          <View style={styles.filterbox}>
            <View style={styles.filterOption}>
           
           <CheckBox
            label='Pris'
            checked={priceChecked}
            onChange ={()=> setPriceChecked(!priceChecked)}
           />


           
            
            </View>

       

        { priceChecked &&

          <>
          <View style={styles.priceRateBox}>
            <View style={styles.priceRate}>
                
              <Button 
                title="Lav"
                color="black" 
              />
              
            </View>

            <View style={styles.priceRate}>

              <Button
                title="Høy"
                color="black"
              
              />             
            </View>

          </View>

          <SnapSlider containerStyle={styles.snapSlider}
            
            labelPosisiton="top"
            items={sliderOptions}
            defaultItem='1'
            onSlidingComplete={value => setPricePriority(value)}
            width='200'

          />  

          </>
     
        }

   
            <View style={styles.filterOption}>
              <CheckBox
                label='I nærheten'
                checked={nearbyChecked}
                onChange ={()=> setNearbyChecked(!nearbyChecked)}
              />
            </View>


            { nearbyChecked &&
            <View>
            
              <SnapSlider containerStyle={styles.snapSlider}
              
                labelPosisiton="top"
                items={sliderOptions}
                defaultItem='1'
                onSlidingComplete={value => setNearbyPriority(value)}
                width='200'
              />  

            </View>

            }

            <View style={styles.filterOption}>

              <CheckBox
                label='God rating'
                checked={ratingChecked}
                onChange ={()=> setRatingChecked(!ratingChecked)}
              />

            </View>
            
          {ratingChecked &&
            <View>

          <SnapSlider containerStyle={styles.snapSlider}
            
            labelPosisiton="top"
            items={sliderOptions}
            defaultItem='1'
            onSlidingComplete={value => setRatingPriority(value)}
            width='200'
      
          />  


            </View>

            }

            <View style={styles.typeKitchen}>
              <TouchableOpacity 
              style={{display: 'flex', flexDirection: 'row'}}
              onPress={() => 
                setKitchenVisible(!kitchenVisible)}
             
              >  

                <Text style={{fontSize: 19}}>Velg kjøkken </Text>
                <Ionicons name ="md-arrow-round-forward" size={20} />

               
          
             </TouchableOpacity>

              <Modal 
              visible={kitchenVisible}
              animationType='fade'
              transparent

              > 
 
              <View style={{backgroundColor:'rgba(0,0,0,0.4)', flex: 1}}>
                <View style={styles.kitchenBox}>
                  <FlatList 
                  style={styles.kitchenFLatList}
                  ItemSeparatorComponent = {() =>
                    <View style={{height:0.1, backgroundColor:'black', width:"90%"}}>

                    </View>  
                  }
                  keyExtractor={(item)=>item.id}
                  data={kjokken}
                  renderItem={({item})=>
                    <View style={{padding:20}}> 
                     
                        <CheckBox
                          label= {item.title}
                        />

                     
                    </View>
                  }
                
                  >
                    

                  </FlatList>
                </View>

              </View>

             
              </Modal>
             
              
            </View>

            <View style={styles.searchButton}>
              <Button
                title="Søk"
                color="black"
              />

            </View>

          </View>
        )}
      </View>
      <View>
        <TouchableOpacity
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          onPress={() => {
            setAuthModalVisible(!authModalVisible);
          }}
          style={styles.profileButton}
        >
          <View style={{ justifyContent: 'center' }}>
            <Ionicons style={styles.loginperson} name="md-person" size={40} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topMenu: {
    position: 'absolute',
    top: Constants.statusBarHeight + 10,
    left: 10,
    borderWidth: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
  },
  searchView: {
    // position: 'absolute',
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
    alignItems: 'center',
    justifyContent: 'space-between',
    
  },
  dropDown: {
    flex: 1,
    padding: 50,
  },

  typeKitchen: { 
   
    padding: 5,
    display: 'flex', 
    width: 220, 
    marginBottom: 10,
    flexDirection: "row", 
    padding: 20, 

  },

  priceRate: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'lightblue', 
    borderWidth: 1.5, 
    width: 70,
    margin: 5

  }, 

  priceRateBox: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    paddingTop: 5,
  },

  snapSlider: {
    marginBottom: 35,
  }, 

  searchButton:  {
    padding: 5,
    display: 'flex', 
    backgroundColor: 'lightblue', 
    width: 200, 
    borderWidth: 1.5, 
  }, 
  kitchenFlatList: {
    backgroundColor: 'blue',
  },
  kitchenBox: {
    backgroundColor: 'white', 
    width:280,
    display: 'flex',
    marginLeft:10, 
    marginTop: 55, 
    borderRadius: 10,
    padding: 10, 

  },

});

export default TopMenu;

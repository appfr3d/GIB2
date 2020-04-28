/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  TouchableOpacity, 
  TouchableWithoutFeedback, 
  Text, 
  Button, 
  ScrollView, 
  Alert,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FilterItem, FilterLocation } from './FilterComponents';
import { useFilterState } from '../context/FilterContext';
import Constants from 'expo-constants';
// import useRestaurants from '../hooks/useRestaurants';
import TypeKitchen from './TypeKitchen';
import { primary } from '../assets/colors';
import { withTheme } from 'react-native-elements';

const screenHeight = Math.round(Dimensions.get('window').height);

export default function FindRestaurant({
  findRestaurantVisible,
  setFindRestaurantVisible,
  fetchRestaurants,
}) {
  const [kitchenVisible, setKitchenVisible] = useState(false);
  // const [, setRestaurants] = useRestaurants();
  // const filterDispatch = useFilterDispatch();
  const filterState = useFilterState();

  const createPriceAlert = () =>
    Alert.alert(
      'Pris',
      'Skal vi finne en restaurant med høy eller lav pris? Og hvor høyt prioriterer du det?',
      [{ text: 'OK' }],
      { cancelable: false }
    );

  const createNearbyAlert = () =>
    Alert.alert(
      'I nærheten',
      'Skal vi prioritere de restaurantene som ligger nærmest deg basert på gåavstand',
      [{ text: 'OK' }],
      { cancelable: false }
    );

  const createRatingAlert = () =>
    Alert.alert('God rating', 'Er god rating en viktig prioritet for deg?', [{ text: 'OK' }], {
      cancelable: false,
    });

  const selectedKitchens = () => {
    const { kitchens } = filterState.filter;
    if (kitchens.length === 0) {
      return false;
    }
    let str = 'Valgt: ';
    kitchens.forEach(item => {
      str += `${item} - `;
    });
    return str.substring(0, str.length - 3);
  };

  return (
    <View style={{ flex: 1 }}>
      {!findRestaurantVisible ? null : (
        <View style={styles.filterbox}>
          <ScrollView >
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
              Finn restauranten for deg!
            </Text>

            <Text style={{ marginBottom: 20, color: 'grey' }}>
              Huk av dine kriterier og fortell oss hvor viktig de er for deg.
            </Text>

            <TouchableWithoutFeedback onPress={() => {}}>
              <View>
                <View style={styles.criteriaBox}>
                  <FilterItem item="price" />

                  <TouchableOpacity
                    onPress={createPriceAlert}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Ionicons
                      name="ios-information-circle-outline"
                      size={25}
                      style={{ marginTop: 2, display: 'flex' }}
                    />
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    height: 0.3,
                    backgroundColor: 'black',
                    width: '100%',
                    opacity: 0.4,
                    marginBottom: 15,
                  }}
                />
              </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => {}}>
              <View>
                <View style={styles.criteriaBox}>
                  <FilterItem item="nearby">
                    <FilterLocation />
                  </FilterItem>
                  <TouchableOpacity
                    onPress={createNearbyAlert}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Ionicons
                      name="ios-information-circle-outline"
                      size={25}
                      style={{ marginTop: 2, display: 'flex' }}
                    />
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    height: 0.4,
                    backgroundColor: 'black',
                    width: '100%',
                    opacity: 0.4,
                    marginBottom: 15,
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
            
            <TouchableWithoutFeedback onPress={() => {}}>
              <View>
                <View style={styles.criteriaBox}>
                  <FilterItem item="rating" />
                  <TouchableOpacity
                    onPress={createRatingAlert}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Ionicons
                      name="ios-information-circle-outline"
                      size={25}
                      style={{ marginTop: 2, display: 'flex' }}
                    />
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    height: 0.3,
                    backgroundColor: 'black',
                    width: '100%',
                    opacity: 0.4,
                    marginBottom: 15,
                  }}
                />
              </View>
            </TouchableWithoutFeedback>


            <View style={styles.typeKitchen}>
              <TouchableOpacity
                style={{ display: 'flex', flexDirection: 'row' }}
                onPress={() => setKitchenVisible(!kitchenVisible)}
              >
                <Text style={{ fontSize: 19 }}>Velg kjøkken </Text>
                <Ionicons name="md-arrow-round-forward" size={20} color={primary} />
              </TouchableOpacity>
              <Text style={styles.selectedKitchens}>{selectedKitchens()}</Text>
            </View>

            <TypeKitchen kitchenVisible={kitchenVisible} setKitchenVisible={setKitchenVisible} />

            
            <View style={{ height: 40 }} />
          </ScrollView>

          <View style={styles.geomatBox}>
              <TouchableOpacity
                style={styles.searchButton}
                color={primary}
                onPress={() => {
                  fetchRestaurants();
                  setFindRestaurantVisible(false);
                }}
              >
                <Text style={styles.searchButtonStyle}>GEOMAT MEG</Text>
              </TouchableOpacity>
          </View>

          <TouchableOpacity
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            style={styles.closeModal}
            onPress={() => {
              setFindRestaurantVisible(false);
            }}
          >
            <Ionicons name="md-close" size={20} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  filterbox: {
    // backgroundColor: 'white',
    // marginHorizontal: 20,
    // height: '75%',
    // padding: 40,
    // paddingBottom: 40,
    // // marginBottom: 20,
    // flexDirection: 'column',
    // borderRadius: 10,

    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: Constants.statusBarHeight + 80,
    height: screenHeight*0.7,
    // marginTop: '32%',
    borderRadius: 10,
    paddingHorizontal: 40,
    paddingTop: 40
    // flex: 1,
    // borderWidth: 1

  },
  typeKitchen: {
    // paddingBottom: 20,
    // paddingTop: -40,
    // width: 200,
    // alignSelf: 'flex-start',
  },
  selectedKitchens: {
    color: 'grey',
    fontSize: 10,
  },
  searchButton: {
    padding: 5,
    backgroundColor: primary,
    width: 200,
    height: 40,
    marginTop: 15,
    alignSelf: 'center',
    borderRadius: 10,
  },
  closeModal: {
    position: 'absolute',
    top: 30,
    right: 30,
  },
  criteriaBox: {
    flexDirection: 'row',
  },
  searchButtonStyle: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    paddingTop: 3,
  }, 
  geomatBox: {
    backgroundColor: 'white', 
    margin: 10, 
    marginTop: -25,
    paddingBottom: 13,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
    marginLeft: 0,
    marginRight: 0,
  }
});

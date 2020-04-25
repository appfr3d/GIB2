/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Button, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FilterItem } from './FilterComponents';
import TypeKitchen from './TypeKitchen';
import { primary, light, dark } from '../assets/colors';

export default function FindRestaurant({ findRestaurantVisible, setFindRestaurantVisible }) {
  const [kitchenVisible, setKitchenVisible] = useState(false);

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

  return (
    <View style={{ height: '75%' }}>
      {!findRestaurantVisible ? null : (
        <ScrollView style={styles.filterbox}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
            Finn restauranten for deg!
          </Text>

          <Text style={{ marginBottom: 20, color: 'grey' }}>
            Huk av dine kriterier og fortell oss hvor viktig de er for deg.
          </Text>

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

          <View>
            <View style={styles.criteriaBox}>
              <FilterItem item="nearby" />
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
          <View style={styles.typeKitchen}>
            <TouchableOpacity
              style={{ display: 'flex', flexDirection: 'row' }}
              onPress={() => setKitchenVisible(!kitchenVisible)}
            >
              <Text style={{ fontSize: 19 }}>Velg kjøkken </Text>
              <Ionicons name="md-arrow-round-forward" size={20} color = {primary} />
            </TouchableOpacity>
          </View>

          <TypeKitchen kitchenVisible={kitchenVisible} setKitchenVisible={setKitchenVisible} />

          <View style={styles.searchButton}>
            <Button title="Søk" color="white" />
          </View>
          <View style={{ height: 60 }} />
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  filterbox: {
    padding: 40,
    paddingBottom: 40,
    marginBottom: 20,
    flexDirection: 'column',
    borderRadius: 10,
    backgroundColor: 'white',
    width: '90%',
  },
  typeKitchen: {
    padding: 10,
    width: 200,
    alignSelf: 'flex-start',
  },

  searchButton: {
    padding: 5,
    backgroundColor: primary,
    width: 200,
    marginTop: 15,
    alignSelf: 'center',
    borderRadius: 10,
  },
  kitchenBox: {
    backgroundColor: 'white',
    width: 280,
    marginLeft: 10,
    marginTop: 55,
    borderRadius: 10,
    padding: 10,
  },

  criteriaBox: {
    flexDirection: 'row',
  },
});

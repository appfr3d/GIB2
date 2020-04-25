/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Button, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FilterItem, FilterLocation } from './FilterComponents';
import TypeKitchen from './TypeKitchen';

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
              <Ionicons name="md-arrow-round-forward" size={20} />
            </TouchableOpacity>
          </View>

          <TypeKitchen kitchenVisible={kitchenVisible} setKitchenVisible={setKitchenVisible} />

          <View style={styles.searchButton}>
            <Button title="Søk" color="black" />
          </View>
          <View style={{ height: 60 }} />
        </ScrollView>
      )}
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
  },

  searchButton: {
    padding: 5,
    backgroundColor: 'lightblue',
    width: 200,
    marginTop: 15,
  },
  closeModal: {
    position: 'absolute',
    top: 30,
    right: 30,
  },
  criteriaBox: {
    flexDirection: 'row',
  },
});

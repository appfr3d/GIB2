import React, { useState } from 'react';
import { View, StyleSheet, Modal, FlatList, TouchableOpacity, Text, Dimensions } from 'react-native';
import CheckBox from 'react-native-modest-checkbox';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { useFilterDispatch, useFilterState } from '../context/FilterContext';

const screenHeight = Math.round(Dimensions.get('window').height);

export default function TypeKitchen({ kitchenVisible, setKitchenVisible }) {
  const filterDispatch = useFilterDispatch();
  const filterState = useFilterState();
  /*
  Allround : 43
  Kafe : 18
  Amerikansk : 16
  Asiatisk : 15
  Italiensk : 11
  Norsk : 4
  Bar : 4
  Thai : 2
  Latinsk : 2
  Mexikansk : 2
  Spansk : 1
  Indisk : 1
  Kinesisk : 1
  Britisk : 0
  Amerikans : 0
  Irsk : 0
  Italiansk : 0
  Afrikansk : 0
  Japansk : 0
  Fransk : 0
  */
  const [kjokken] = useState([
    { id: '0', title: 'Amerikansk' },
    { id: '1', title: 'Asiatisk' },
    { id: '2', title: 'Fransk' },
    { id: '3', title: 'Allround' },
    { id: '4', title: 'Italiensk' },
    { id: '5', title: 'Latinsk' },
    { id: '6', title: 'Spansk' },
    { id: '7', title: 'Mexikansk' },
    { id: '8', title: 'Britisk' },
    { id: '9', title: 'Bar' },
    { id: '10', title: 'Kafe' },
    { id: '11', title: 'Irsk' },
    { id: '12', title: 'Norsk' },
    { id: '13', title: 'Italiansk' },
    { id: '14', title: 'Thai' },
    { id: '15', title: 'Kinesisk' },
    { id: '16', title: 'Indisk' },
    { id: '17', title: 'Afrikansk' },
    { id: '18', title: 'Japansk' },

  ]);

  return (
    <Modal visible={kitchenVisible} animationType="fade" transparent>
      <View style={{ flex: 1 }}>
        <View style={styles.kitchenBox}>
          <TouchableOpacity
            style={{ flexDirection: 'row', padding: 10 }}
            onPress={() => setKitchenVisible(!kitchenVisible)}
          >
            <Ionicons name="md-arrow-back" size={20} style={{ marginRight: 10 }} />
            <Text style={{ fontSize: 19 }}> Tilbake </Text>
          </TouchableOpacity>

          <View style={{ flex: 1 }}>
            <FlatList
              style={styles.kitchenFLatList}
              ItemSeparatorComponent={() => (
                <View
                  style={{ height: 1, backgroundColor: 'black', width: '100%', opacity: 0.4 }}
                />
              )}
              keyExtractor={item => item.id}
              data={kjokken}
              renderItem={({ item }) => (
                <View style={{ padding: 10 }}>
                  <CheckBox
                    label={item.title}
                    checked={filterState.filter.kitchens.includes(item.title)}
                    onChange={() => filterDispatch({ type: 'toggle_kitchen', payload: item.title })}
                  />
                </View>
              )}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  kitchenBox: {
    width: '90%',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: Constants.statusBarHeight + 80,
    height: screenHeight*0.7,
    // marginTop: '32%',
    borderRadius: 10,
    padding: 20,
    // flex: 1,
    // borderWidth: 1
  },

  kitchenFLatList: {
    backgroundColor: 'white',
    flex: 1,
  },
});

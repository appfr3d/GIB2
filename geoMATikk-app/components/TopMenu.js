/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useContext } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text,
  Button,
  Modal,
  FlatList,
} from 'react-native';
import Constants from 'expo-constants';
import CheckBox from 'react-native-modest-checkbox';
import { Ionicons } from '@expo/vector-icons';
import FilterItem from './FilterItem';
import { FilterDispatchContext } from '../context/FilterContext';

function TopMenu(props) {
  const { authModalVisible, setAuthModalVisible } = props;
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [kitchenVisible, setKitchenVisible] = useState(false);
  const filterDispatch = useContext(FilterDispatchContext);

  const [kjokken, setKjokken] = useState([
    {
      id: '1',
      title: 'Italiensk',
    },

    {
      id: '2',
      title: 'Asiatisk',
    },
    {
      id: '3',
      title: 'Meksikansk',
    },
    {
      id: '4',
      title: 'Amerikansk',
    },
    {
      id: '5',
      title: 'Nordisk',
    },
  ]);

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
            onChangeText={value =>  patch({ type: 'set_search_string', payload: value })}
          />
          <TouchableOpacity>
            <Ionicons name="md-search" size={32} />
          </TouchableOpacity>
          <Text />
        </View>
        {!filterModalVisible ? null : (
          <View style={styles.filterbox}>
            <FilterItem item="price" />
            <FilterItem item="nearby" />
            <FilterItem item="rating" />

            <View style={styles.typeKitchen}>
              <TouchableOpacity
                style={{ display: 'flex', flexDirection: 'row' }}
                onPress={() => setKitchenVisible(!kitchenVisible)}
              >
                <Text style={{ fontSize: 19 }}>Velg kjøkken </Text>
                <Ionicons name="md-arrow-round-forward" size={20} />
              </TouchableOpacity>

              <Modal visible={kitchenVisible} animationType="fade" transparent>
                <View style={{ backgroundColor: 'rgba(0,0,0,0.4)', flex: 1 }}>
                  <View style={styles.kitchenBox}>
                    <FlatList
                      style={styles.kitchenFLatList}
                      ItemSeparatorComponent={() => (
                        <View style={{ height: 0.1, backgroundColor: 'black', width: '90%' }} />
                      )}
                      keyExtractor={item => item.id}
                      data={kjokken}
                      renderItem={({ item }) => (
                        <View style={{ padding: 20 }}>
                          <CheckBox label={item.title} />
                        </View>
                      )}
                    />
                  </View>
                </View>
              </Modal>
            </View>

            <View style={styles.searchButton}>
              <Button title="Søk" color="black" />
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
        >
          <Ionicons name="md-person" size={40} />
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
  typeKitchen: {
    padding: 5,
    display: 'flex',
    backgroundColor: 'lightblue',
    width: 110,
    borderWidth: 1.5,
  },

  searchButton: {
    padding: 5,
    display: 'flex',
    backgroundColor: 'lightblue',
    width: 200,
    borderWidth: 1.5,
  },
  kitchenBox: {
    backgroundColor: 'white',
    width: 280,
    display: 'flex',
    marginLeft: 10,
    marginTop: 55,
    borderRadius: 10,
    padding: 10,
  },
});

export default TopMenu;

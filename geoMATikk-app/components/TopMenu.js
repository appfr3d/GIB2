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
import TypeKitchen from './TypeKitchen';
import FilterItem from './FilterItem';
import { FilterDispatchContext } from '../context/FilterContext';

function TopMenu(props) {
  const { authModalVisible, setAuthModalVisible } = props;
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [kitchenVisible, setKitchenVisible] = useState(false);
  const filterDispatch = useContext(FilterDispatchContext);

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
            onChangeText={value => filterDispatch({ type: 'set_search_string', payload: value })}
          />
          <TouchableOpacity>
            <Ionicons name="md-search" size={32} />
          </TouchableOpacity>
          <Text />
        </View>
        {!filterModalVisible ? null : (
          <View style={styles.filterbox}>
            <FilterItem item="price" />
            <View
              style={{
                height: 0.3,
                backgroundColor: 'black',
                width: '100%',
                opacity: 0.4,
                marginBottom: 15,
              }}
            />

            <FilterItem item="nearby" />
            <View
              style={{
                height: 0.3,
                backgroundColor: 'black',
                width: '100%',
                opacity: 0.4,
                marginBottom: 15,
              }}
            />

            <FilterItem item="rating" />
            <View
              style={{
                height: 0.3,
                backgroundColor: 'black',
                width: '100%',
                opacity: 0.4,
                marginBottom: 15,
              }}
            />
            {/* <FilterItem item="kitchen">
              <TypeKitchen />
            </FilterItem> */}

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
    paddingTop: 15,
    margin: 20,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 10,
    backgroundColor: 'white',
  },

  typeKitchen: {
    padding: 10,
    display: 'flex',
    width: 200,
  },

  searchButton: {
    padding: 5,
    display: 'flex',
    backgroundColor: 'lightblue',
    width: 200,
    marginTop: 15,
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

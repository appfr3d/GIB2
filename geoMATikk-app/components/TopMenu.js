/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet, Text, Slider } from 'react-native';
import Constants from 'expo-constants';
import { Dropdown } from 'react-native-material-dropdown';
import { Ionicons } from '@expo/vector-icons';

function TopMenu(props) {
  const { authModalVisible, setAuthModalVisible } = props;
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [searchInput, setSearchInput] = useState('Placeholder');
  const [distanceValue, setDistanceValue] = useState(10);

  const data = [
    {
      value: 'Banana',
    },
    {
      value: 'Mango',
    },
    {
      value: 'Pear',
    },
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
              <Text>Rating</Text>
            </View>

            <View style={styles.filterOption}>
              <Text>Prisklasse</Text>
            </View>

            <View style={styles.filterOption}>
              <Text>Avstand</Text>

              <Slider
                style={{ width: 120, height: 40 }}
                minimumValue={0}
                maximumValue={10}
                onValueChange={value => setDistanceValue(Math.round(value))}
                value={10}
              />
              <Text style={{ width: 40 }}>{distanceValue} km</Text>
            </View>

            <View style={styles.filterOption}>
              <Text>Type mat</Text>
              <Dropdown data={data} label="haha" style={styles.dropDown} />
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
});

export default TopMenu;

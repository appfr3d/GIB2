/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';

function TopMenu() {
  return (
    <View style={styles.topMenu}>
      <TouchableOpacity style={styles.menuButton}>
        <Ionicons name="md-menu" size={25} />
      </TouchableOpacity>
      <View style={styles.searchView}>
        <Ionicons name="md-search" color="grey" size={25} />
        <TextInput placeholder="Search" style={styles.searchInput} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topMenu: {
    position: 'absolute',
    top: Constants.statusBarHeight + 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchView: {
    width: 200,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    width: 140,
    height: '100%',
    marginLeft: 10,
  },
  menuButton: {
    padding: 10,
  },
});

export default TopMenu;

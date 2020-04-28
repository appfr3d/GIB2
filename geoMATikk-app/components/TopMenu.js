/* eslint-disable import/no-extraneous-dependencies */
import React, { useRef, useEffect } from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';
import { Ionicons } from '@expo/vector-icons';
import { useFilterDispatch, useFilterState } from '../context/FilterContext';
import LoginStatus from './AuthModal/LoginStatus';

function TopMenu(props) {
  const { authModalVisible, setAuthModalVisible } = props;
  const filterDispatch = useFilterDispatch();
  const filterState = useFilterState();
  const input = useRef();

  useEffect(() => {
    if (filterState.search === '') {
      input.current.clear();
    }
  }, [filterState.search]);

  return (
    <View style={styles.topMenu}>
      <View style={styles.searchContainer}>
        <View style={styles.searchView}>
          <TextInput
            placeholder="Søk på restaurant"
            style={styles.searchInput}
            onChangeText={value => filterDispatch({ type: 'set_search_string', payload: value })}
            ref={input}
          />
          <TouchableOpacity>
            <Ionicons name="md-search" size={32} />
          </TouchableOpacity>
          {/* <Text /> */}
        </View>
      </View>
      <View>
        <TouchableOpacity
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          onPress={() => {
            setAuthModalVisible(!authModalVisible);
          }}
        >
          <Ionicons name="md-person" size={40} />
          <LoginStatus />
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
    width: '70%',
    marginLeft: 7,
  },
});

export default TopMenu;

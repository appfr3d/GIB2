/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput, StyleSheet, Text, Slider, Button } from 'react-native';
import Constants from 'expo-constants';
import { Dropdown } from 'react-native-material-dropdown';
import { Ionicons } from '@expo/vector-icons';
import CheckBox from 'react-native-modest-checkbox';


function FilterItemWrapper(props) {
  const [hidden, setHidden] = useState(true);

  return (
      <View>
          <CheckBox />
          {props.children}
      </View>


  );
}

const styles = StyleSheet.create({});


export default FilterItemWrapper;
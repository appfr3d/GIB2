// Viser enten stjerne eller kostnad rating
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
} from 'react-native';
import Constants from 'expo-constants';
// import { PanGestureHandler, State } from 'react-native-gesture-handler';

// const { Swipeable } = GestureHandler;
// import { Dropdown } from 'react-native-material-dropdown';
// import { Ionicons } from '@expo/vector-icons';
// import CheckBox from 'react-native-modest-checkbox';

// const screenWidth = Math.round(Dimensions.get('window').width);

function Rating({ maxRating, value, size }) {
  const starFull = require('../assets/rating/star-full.png')
  const starHalf = require('../assets/rating/star-half.png')
  const starEmpty = require('../assets/rating/star-empty.png')
  
  let ratings = []
  for (let i = 0; i < maxRating; i++) {
    if (i < Math.round(value)) {
      ratings.push(<Image key={i.toString()} style={{ width: size, height: size }} source={starFull} resizeMode='contain' />);
    } else {
      ratings.push(<Image key={i.toString()} style={{ width: size, height: size }} source={starEmpty} resizeMode='contain' />);
    }
  }

  return (
    <View style={[styles.ratingContainer, { height: size, width: size*maxRating}]}>
      {ratings}
    </View>
  );
}
/*

{
        ratings.map(rating => {
          rating === 'full' ? (
            <Image style={{ width: size, height: size }} source={starFull} />
          ) : 
          (
            <Image style={{ width: size, height: size }} source={starEmpty} />
          )
        })
      }

*/

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: 'row',
  },
});
  
export default Rating;
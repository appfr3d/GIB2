// READ MED
// Viser enten stjerne eller kostnad rating

import React from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import starFull from '../assets/rating/star-full.png';
import starHalf from '../assets/rating/star-half.png';
import starEmpty from '../assets/rating/star-empty.png';

function Rating({ maxRating, type, value, size }) {
  const ratings = [];

  if (type === 'star') {
    for (let i = 0; i < maxRating; i += 1) {
      if (i + 1 <= Math.floor(value)) {
        ratings.push(
          <Image
            key={i.toString()}
            style={{ width: size, height: size }}
            source={starFull}
            resizeMode="contain"
          />
        );
      } else if (i + 1 <= Math.ceil(value) && Math.round(value) > Math.floor(value)) {
        ratings.push(
          <Image
            key={i.toString()}
            style={{ width: size, height: size }}
            source={starHalf}
            resizeMode="contain"
          />
        );
      } else {
        ratings.push(
          <Image
            key={i.toString()}
            style={{ width: size, height: size }}
            source={starEmpty}
            resizeMode="contain"
          />
        );
      }
    }
  } else {
    for (let i = 0; i < maxRating; i += 1) {
      if (i + 1 <= Math.floor(value)) {
        ratings.push(
          <Text key={i.toString()} style={{ fontWeight: 'bold' }}>
            $
          </Text>
        );
      }
    }
  }

  return (
    <View style={[styles.ratingContainer, { height: size, width: size * maxRating }]}>
      {ratings}
    </View>
  );
}

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: 'row',
    marginRight: 160,
  },
});

export default Rating;

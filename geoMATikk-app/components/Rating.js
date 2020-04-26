// Viser enten stjerne eller kostnad rating
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

function Rating({ maxRating, value, size }) {
  const starFull = require('../assets/rating/star-full.png');
  const starHalf = require('../assets/rating/star-half.png');
  const starEmpty = require('../assets/rating/star-empty.png');
  const ratings = [];
  for (let i = 0; i < maxRating; i++) {
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

  return (
    <View style={[styles.ratingContainer, { height: size, width: size * maxRating }]}>
      {ratings}
    </View>
  );
}

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: 'row',
  },
});

export default Rating;

// READ MED
// Component som kan brukes til å rate
// Enten med cahs-symboler eller stjerner

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { primary } from '../assets/colors';
import starFull from '../assets/rating/star-full.png';
import starEmpty from '../assets/rating/star-empty.png';

const full = (num, type) => {
  if (type === 'star') {
    return (
      <Image
        key={num.toString()}
        style={{ width: 30, height: 30 }}
        source={starFull}
        resizeMode="contain"
      />
    );
  }
  if (type === 'cash') {
    return (
      <View
        style={{
          borderRadius: 5,
          backgroundColor: primary,
          alignItems: 'center',
          justifyContent: 'center',
          width: 60,
        }}
      >
        <Text style={{ padding: 5, color: 'white' }}>{'$'.repeat(num)}</Text>
      </View>
    );
  }
  return null;
};

const empty = (num, type) => {
  if (type === 'star') {
    return (
      <Image
        key={num.toString()}
        style={{ width: 30, height: 30 }}
        source={starEmpty}
        resizeMode="contain"
      />
    );
  }
  if (type === 'cash') {
    return (
      <View
        style={{
          borderWidth: 1,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
          width: 60,
        }}
      >
        <Text style={{ padding: 5, color: 'gray' }}>{'$'.repeat(num)}</Text>
      </View>
    );
  }
  return null;
};

function RestaurantRating({ type = 'star' }) {
  // type: 'star', 'cash'
  const [value, setValue] = useState(0);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const newRatings = [];

    for (let i = 0; i < 5; i += 1) {
      if (i + 1 <= Math.floor(value)) {
        newRatings.push({ type: 'full', indx: i });
      } else {
        newRatings.push({ type: 'empty', indx: i });
      }
    }

    console.log(newRatings.length);

    setRatings(newRatings);
  }, [value]);

  const renderRating = (rating, indx) => {
    return (
      <TouchableOpacity onPress={() => setValue(indx + 1)} key={indx.toString()}>
        {rating.type === 'full' ? full(rating.indx + 1, type) : empty(rating.indx + 1, type)}
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.ratingContainer, { height: 30 }]}>
      {ratings.map((rating, indx) => renderRating(rating, indx))}
    </View>
  );
}

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});

export default RestaurantRating;

// READ MED
// Component som kan brukes til å rate
// Enten med cahs-symboler eller stjerner

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { light, dark, primary } from '../assets/colors';

function RestaurantRating({ type='star' }) {
  // type: 'star', 'cash'

  const starFull = require('../assets/rating/star-full.png');
  const starHalf = require('../assets/rating/star-half.png');
  const starEmpty = require('../assets/rating/star-empty.png');

  const [value, setValue] = useState(0);
  const [ratings, setRatings] = useState([]);

  const full = (num) => {
    if (type=='star') {
      return (<Image
        key={num.toString()}
        style={{ width: 30, height: 30 }}
        source={ starFull}
        resizeMode="contain"
      />)
    } else if (type=='cash') {
      return (
        <View 
          style={{ 
            borderRadius: 5, 
            backgroundColor: primary, 
            alignItems: 'center', 
            justifyContent: 'center',
            width: 60
          }}>
          <Text style={{ padding: 5, color: 'white' }}>{'$'.repeat(num)}</Text>
        </View>
      )
    }
  }

  const empty = (num) => {
    if (type=='star') {
      return (<Image
        key={num.toString()}
        style={{ width: 30, height: 30 }}
        source={ starEmpty}
        resizeMode="contain"
      />)
    } else if (type=='cash') {
      return (
        <View 
          style={{ 
            borderWidth: 1, 
            borderRadius: 5, 
            alignItems: 'center', 
            justifyContent: 'center',
            width: 60
          }}>
          <Text style={{ padding: 5, color: 'gray' }}>{'$'.repeat(num)}</Text>
        </View>
      )
    }
  }


  
  useEffect(() => {
    new_ratings = [];

    for (let i = 0; i < 5; i++) {
      if (i + 1 <= Math.floor(value)) {
        new_ratings.push({ type: 'full', indx: i });
      } else {
        new_ratings.push({ type: 'empty', indx: i });
      }
    }

    console.log(new_ratings.length);

    setRatings(new_ratings);
  }, [value])
  
  renderRating = (rating, indx) => {
    return (
      <TouchableOpacity onPress={() => setValue(indx + 1)} key={indx.toString()}>
        { rating.type == 'full' ? full(rating.indx + 1) : empty(rating.indx + 1) }
      </TouchableOpacity>
    );
  }

  return (
    <View style={[styles.ratingContainer, { height: 30 }]}>
      { ratings.map((rating, indx) => renderRating(rating, indx))}
    </View>
  );
}

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10
  },
});

export default RestaurantRating;

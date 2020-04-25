import React from 'react';
import { View, StyleSheet, Button } from 'react-native';

function PrefferedPrice() {
  return (
    <View style={styles.priceRateBox}>
      <View style={styles.priceRate}>
        <Button title="Lav" color="black" />
      </View>

      <View style={styles.priceRate}>
        <Button title="Høy" color="black" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  priceRate: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'lightblue',
    borderWidth: 1.5,
    width: 70,
    margin: 5,
  },
  priceRateBox: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    paddingTop: 5,
  },
});

export default PrefferedPrice;

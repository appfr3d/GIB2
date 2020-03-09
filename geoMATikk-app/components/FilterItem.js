/* eslint-disable import/no-extraneous-dependencies */
import React, { useContext } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import CheckBox from 'react-native-modest-checkbox';
import SnapSlider from 'react-native-snap-slider';
import { FilterStateContext, FilterDispatchContext } from '../context/FilterContext';

const sliderOptions = [
  { value: 0, label: 'Uviktig' },
  { value: 1, label: 'Passe viktig' },
  { value: 2, label: 'Viktig' },
];

export default function FilterItem({ item }) {
  const filterState = useContext(FilterStateContext);
  const filterDispatch = useContext(FilterDispatchContext);
  const { name, active, prefferedValue, priority } = filterState[item];

  return (
    <>
      <View style={styles.filterOption}>
        <CheckBox
          label={name}
          checked={active}
          onChange={() => filterDispatch({ type: 'toggle_item', payload: { item } })}
        />
        {active && prefferedValue && (
          <View style={styles.priceRateBox}>
            <View style={styles.priceRate}>
              <Button title="Lav" color="black" />
            </View>

            <View style={styles.priceRate}>
              <Button title="Høy" color="black" />
            </View>
          </View>
        )}
      </View>
      {active && (
        <>
          <SnapSlider
            containerStyle={styles.snapSlider}
            labelPosisiton="top"
            items={sliderOptions}
            defaultItem={priority}
            onSlidingComplete={value =>
              filterDispatch({ type: `set_priority`, payload: { item, value } })
            }
            width="200"
          />
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
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
  snapSlider: {
    marginBottom: 30,
  },
});

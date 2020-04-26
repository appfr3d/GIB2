/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import CheckBox from 'react-native-modest-checkbox';
import SnapSlider from 'react-native-snap-slider';
import { useFilterState, useFilterDispatch } from '../../context/FilterContext';
import { light, primary } from '../../assets/colors';

const sliderOptions = [
  { value: 0, label: 'Uviktig' },
  { value: 1, label: '' },
  { value: 2, label: 'Passe viktig' },
  { value: 3, label: '' },
  { value: 4, label: 'Viktig' },
];

export default function FilterItem({ item, children }) {
  const filterState = useFilterState();
  const filterDispatch = useFilterDispatch();
  const { name, active, prefferedValue, weight } = filterState.filter[item];

  return (
    <>
      <View>
        <View style={styles.filterOption}>
          <View style={styles.priceRateButtons}>
            <CheckBox
              label={name}
              checked={active}
              onChange={() => filterDispatch({ type: 'toggle_item', payload: { item } })}
            />

            {active && prefferedValue && (
              <View style={styles.priceRateBox}>
                <View style={styles.priceRate}>
                  <Button
                    title="Billig"
                    color={prefferedValue === 'low' ? primary : light}
                    onPress={() => filterDispatch({ type: 'set_prefferedPrice', payload: 'low' })}
                  />
                </View>

                <View style={[styles.priceRate]}>
                  <Button
                    title="Eksklusivt"
                    color={prefferedValue === 'high' ? primary : light}
                    onPress={() => filterDispatch({ type: 'set_prefferedPrice', payload: 'high' })}
                  />
                </View>
              </View>
            )}
          </View>
        </View>
        {active && children}
        {active && (
          <>
            <SnapSlider
              containerStyle={styles.snapSlider}
              labelPosisiton="top"
              items={sliderOptions}
              defaultItem={weight}
              minimumTrackTintColor={light}
              onSlidingComplete={value =>
                filterDispatch({ type: `set_weight`, payload: { item, value } })
              }
              width="200"
            />
          </>
        )}
      </View>
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
    backgroundColor: light,
    width: 100,
    marginRight: 25,
    marginLeft: 0,
    borderRadius: 6,
  },
  priceRateBox: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 10,
  },
  snapSlider: {
    marginBottom: 30,
    width: 200,
  },
});

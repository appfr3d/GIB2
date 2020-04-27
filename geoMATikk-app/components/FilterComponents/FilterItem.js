/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
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
                <TouchableOpacity
                  style={[
                    styles.priceRate,
                    { backgroundColor: prefferedValue === 'low' ? primary : light },
                  ]}
                  onPress={() => filterDispatch({ type: 'set_prefferedPrice', payload: 'low' })}
                >
                  <Text style={styles.buttonText}>BILLIG</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.priceRate,
                    { backgroundColor: prefferedValue === 'high' ? primary : light },
                  ]}
                  onPress={() => filterDispatch({ type: 'set_prefferedPrice', payload: 'high' })}
                >
                  <Text style={styles.buttonText}>EKSKLUSIVT</Text>
                </TouchableOpacity>
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
    height: 40,
    marginRight: 25,
    marginLeft: 0,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
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
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
});

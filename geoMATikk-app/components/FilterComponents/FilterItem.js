/* eslint-disable import/no-extraneous-dependencies */
import React, { useContext } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import CheckBox from 'react-native-modest-checkbox';
import SnapSlider from 'react-native-snap-slider';
import { FilterStateContext, FilterDispatchContext } from '../../context/FilterContext';

const sliderOptions = [
  { value: 0, label: 'Uviktig' },
  { value: 1, label: 'Passe viktig' },
  { value: 2, label: 'Viktig' },
];

export default function FilterItem({ item, children }) {
  const filterState = useContext(FilterStateContext);
  const filterDispatch = useContext(FilterDispatchContext);
  const { name, active, priority } = filterState[item];

  return (
    <>
      <View style={styles.filterOption}>
        <CheckBox
          label={name}
          checked={active}
          onChange={() => filterDispatch({ type: 'toggle_item', payload: { item } })}
        />
        {active && children}
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
  snapSlider: {
    marginBottom: 30,
  },
});

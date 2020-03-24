/* eslint-disable import/no-extraneous-dependencies */
import React, { useContext, useState } from 'react';
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
  const [priceState, setPriceState] = useState('lav');
  
  
  const buttonStateStyle = (state) => {
    if (state === priceState) {
      return {
        backgroundColor: 'rgba(48,105,189,1)',
      }
    }
  }



  return (
    <>
      <View style={styles.filterOption}>
        <View style={styles.priceRateButtons}>
          <CheckBox
            label={name}
            checked={active}
            onChange={() => filterDispatch({ type: 'toggle_item', payload: { item } })}
          />
        
        
          {active && prefferedValue && (
            <View style={styles.priceRateBox}>
              <View style={[styles.priceRate, buttonStateStyle('lav')]}>
                <Button 
                title="Lav" 
                color="black" 
                onPress={()=>setPriceState('lav')} />
              </View>

              <View style={[styles.priceRate, buttonStateStyle('høy')]}>
                <Button 
                title="Høy" 
                color="black" 
                style={buttonStateStyle('høy')}
                onPress={()=>setPriceState('høy')}/>
              </View>
            </View>
          )}
        </View>
      


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
    width: 75,
    marginRight: 25,
    marginLeft: 0,
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

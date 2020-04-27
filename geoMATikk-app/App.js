import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { FilterProvider } from './context/FilterContext';
import { ProvideAuth } from './hooks/useAuth';
import Wrapper from './components/Wrapper';

export default function App() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <ProvideAuth>
          <FilterProvider>
            <Wrapper />
          </FilterProvider>
        </ProvideAuth>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

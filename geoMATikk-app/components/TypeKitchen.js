import React, { useContext, useState } from 'react';
import { View, StyleSheet, Modal, FlatList, TouchableOpacity, TabBarIOS, Text } from 'react-native';
import CheckBox from 'react-native-modest-checkbox';
import { Ionicons } from '@expo/vector-icons';



export default function TypeKitchen({ kitchenVisible, setKitchenVisible }) {

  const [kjokken, setKjokken] = useState([
    {
      id: '1',
      title: 'Italiensk',
    },
  
    {
      id: '2',
      title: 'Asiatisk',
    },
    {
      id: '3',
      title: 'Meksikansk',
    },
    {
      id: '4',
      title: 'Amerikansk',
    },
    {
      id: '5',
      title: 'Nordisk',
    },

    {
      id: '6',
      title: 'Spansk',
    },

    {
      id: '7',
      title: 'Fransk',
    },

    {
      id: '8',
      title: 'Vietnamesisk',
    },

    {
      id: '9',
      title: 'Midtøsten',
    },
  

  ]);

  const [checkedKitchen, setCheckedKitchen] = useState(false); 

  return (
    <Modal visible={kitchenVisible} animationType="fade" transparent>
        <View style={{ backgroundColor: 'rgba(0,0,0,0.4)', flex: 1 }}>
            <View style={styles.kitchenBox}>

            <TouchableOpacity 
                style={{ display: 'flex', flexDirection: 'row' , padding:10}}
                onPress={() => setKitchenVisible(!kitchenVisible)}
              >
                <Ionicons name="md-arrow-back" size={20} style={{marginRight:10,}} />
                <Text style={{ fontSize: 19 }}> Tilbake </Text>
                
            </TouchableOpacity>
            
            <FlatList
                style={styles.kitchenFLatList}
                ItemSeparatorComponent={() => (
                <View style={{ height: 0.4, backgroundColor: 'black', width: '100%', opacity: .4, }} />
                )}
                keyExtractor={item => item.id}
                data={kjokken}
                renderItem={({ item }) => (
                <View style={{ padding: 10 }}>
                    <CheckBox 
                    label={item.title} 
                    checked={checkedKitchen}
                    onChange={()=>setCheckedKitchen(!checkedKitchen)}
                    />
                </View>
                )}
            />

            
            </View>

            
        </View>
    </Modal>

  )}

const styles = StyleSheet.create({

  kitchenBox: {
    backgroundColor: 'white',
    width: 270,
    display: 'flex',
    marginLeft: 10,
    marginTop: 55,
    borderRadius: 10,
    padding: 25,
  },
});
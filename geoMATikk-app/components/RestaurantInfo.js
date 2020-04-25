import React from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Text,
  Image,
  Modal,
  StyleSheet,
  TextInput,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';

import Rating from './Rating';
import { primary, light, dark } from '../assets/colors';

const screenWidth = Math.round(Dimensions.get('window').width);

function RestaurantInfo({ restaurant, setInfoVisible, setListVisible }) {
  return (
    <Modal
      style={styles.modalStyle}
      animationType="fade"
      transparent
      // visible={props.authModalVisible}
      //   onRequestClose={() => {
      //     Alert.alert('Modal has been closed.');
      //   }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <Image
            style={{ width: screenWidth - 60, height: 150, alignSelf: 'center', borderRadius: 10 }}
            source={{ uri: `https://www.trondheim.no/${restaurant.image_url}` }}
            // resizeMode="contain"
          />
          <Text style={styles.name} >{restaurant.name}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>Brukernes rangering av denne restauranten</Text>    
            <Rating maxRating={5} value={restaurant.rating} size={20} />
          </View>
          <Text style={styles.description} >{restaurant.description}</Text>
          <View style={styles.rateContainer}>
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.rateButtonView}>
                <Text style={styles.rateButtonText}>Rate restaurant</Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
            style={styles.closeInfo}
            onPress={() => {
              setInfoVisible(false);
              setListVisible(true);
            }}
          >
            <Ionicons name="md-close" size={30} color='lightgray' />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalStyle: {
    opacity: 1,
    flex: 1,
  },
  container: {
    backgroundColor: 'white',
    top: Constants.statusBarHeight + 10,
    marginHorizontal: 10,
    borderRadius: 20
  },
  contentContainer: {
    padding: 20,
  },
  closeInfo: {
    position: 'absolute',
    top: 30,
    right: 30,
  },
  name: {
    color: dark,
    fontSize: 32,
    fontWeight: 'bold',
    paddingTop: 20,
    paddingBottom: 10
  },
  ratingContainer: {
    paddingBottom: 10
  },  
  ratingText: {
    color: light,
    paddingBottom: 5
  }, 
  description: {
    color: dark,
    fontSize: 20,
  },
  rateContainer: {
    alignSelf: 'flex-end',
    paddingTop: 10
  },
  rateButtonView: {
    backgroundColor: dark,
    borderRadius: 5
  },
  rateButtonText: {
    color: 'white',
    padding: 10,
  }
});

export default RestaurantInfo;

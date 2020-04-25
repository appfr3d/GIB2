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
            style={{ width: screenWidth - 40, height: 150, alignSelf: 'center' }}
            source={{ uri: `https://www.trondheim.no/${restaurant.image_url}` }}
            // resizeMode="contain"
          />
          <Text>{restaurant.name}</Text>
          <Rating maxRating={5} value={restaurant.rating} size={20} />
          <Text>{restaurant.description}</Text>
          <View style={{ alignItems: 'flex-end' }}>
            <TouchableOpacity onPress={() => {}}>
              <Text>Rate restaurant</Text>
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
            <Ionicons name="md-close" size={30} color='white' />
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
  },
  contentContainer: {
    padding: 10,
  },
  loginbox: {
    padding: 30,
    margin: 0,
    marginLeft: 20,
    marginRight: 8,
    display: 'flex',
    flexDirection: 'column',
    marginTop: 110,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  closeInfo: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  link: {
    color: 'blue',
  },
  closelogin: {
    display: 'flex',
    flexDirection: 'row',
    width: '8%',
    justifyContent: 'space-around',
  },
  regUser: {
    color: 'black',
    marginTop: '10%',
  },
  submitButton: {
    alignSelf: 'center',
    padding: 30,
  },
});

export default RestaurantInfo;

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Text,
  Image,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';

import Rating from './Rating';
import RestaurantRating from './RestaurantRating';
import { light, dark } from '../assets/colors';

import { useAuth } from '../hooks/useAuth';
import { useRate } from '../hooks';

const screenWidth = Math.round(Dimensions.get('window').width);

function RestaurantInfo({ restaurant, setInfoVisible, setListVisible }) {
  const scrollRef = useRef(null);

  const [isRating, setIsRating] = useState(false);
  const [rateState, ratingFunctions] = useRate();

  // useEffect(() => {
  //   if (scrollRef !== null && isRating) {
  //     scrollRef.scrollToEnd({animated: true});
  //   }
  // }, [isRating]);

  const auth = useAuth();

  const rateRestaurant = () => {
    ratingFunctions.rateRestaurant(auth.user.token);
  };

  useEffect(() => {
    if (rateState.done) {
      setIsRating(false);
    }
  }, [rateState]);

  useEffect(() => {
    if (isRating) {
      ratingFunctions.setRestaurantID(restaurant.id)
    }
  }, [isRating])

  return (
    <Modal style={styles.modalStyle} animationType="fade" transparent>
      <SafeAreaView style={styles.container}>
        <ScrollView ref={scrollRef}>
          <View style={styles.contentContainer}>
            <Image
              style={{
                width: screenWidth - 60,
                height: 150,
                alignSelf: 'center',
                borderRadius: 10,
              }}
              source={{ uri: `https://www.trondheim.no/${restaurant.image_url}` }}
            />
            <Text style={styles.name}>{restaurant.name}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>Brukernes rangering av denne restauranten</Text>
              <View style={{ flexDirection: 'row' }}>
                <Rating maxRating={5} type="star" value={restaurant.rating} size={20} />
                <Rating maxRating={5} type="cash" value={restaurant.price_class} size={20} />
              </View>
            </View>
            {!isRating && <Text style={styles.description}>{restaurant.description}</Text>}

            {auth.user && !isRating && !rateState.done && (
              <View style={styles.rateContainer}>
                <TouchableOpacity onPress={() => setIsRating(true)}>
                  <View style={styles.rateButtonView}>
                    <Text style={styles.rateButtonText}>Ranger restaurant</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}

            { rateState.done && (
              <Text style={{ paddingTop: 10, color: light, fontSize: 18 }}>
                Takk, din rangering er registrert!
              </Text>
            ) /* TODO: Style denne */}

            

            {isRating && (
              <View style={{ justifyContent: 'center' }}>
                <Text style={{ color: dark, fontSize: 30 }}>Ranger restauranten</Text>
                <Text style={{ color: light, fontSize: 20 }}>
                  I hvilken prisklasse vil du plassere restauranten
                </Text>
                <RestaurantRating type="cash" setRatingValue={ratingFunctions.setPrice} />
                <Text style={{ color: light, fontSize: 20 }}>Din opplevelse av restauranten</Text>
                <RestaurantRating type="star" setRatingValue={ratingFunctions.setRating} />

                { rateState.error !== '' && <Text style={{ color: 'red' }} >{rateState.error}</Text> }

                <View
                  style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}
                  // TODO: set en activity indicator her når den loader
                >
                  <TouchableOpacity onPress={() => setIsRating(false)}>
                    <View style={styles.rateButtonView}>
                      <Text style={styles.rateButtonText}>Avbryt</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={rateRestaurant}>
                    <View style={styles.rateButtonView}>
                      <Text style={styles.rateButtonText}>Bekreft</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            <TouchableOpacity
              hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
              style={styles.closeInfo}
              onPress={() => {
                setInfoVisible(false);
                setListVisible(true);
              }}
            >
              <View
                style={{
                  backgroundColor: dark,
                  padding: 5,
                  borderRadius: 5,
                  height: 40,
                  width: 40,
                  alignItems: 'center',
                }}
              >
                <Ionicons name="md-close" size={30} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
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
    borderRadius: 20,
  },
  contentContainer: {
    padding: 20,
  },
  closeInfo: {
    position: 'absolute',
    top: 25,
    right: 25,
  },
  name: {
    color: dark,
    fontSize: 32,
    fontWeight: 'bold',
    paddingTop: 20,
    paddingBottom: 10,
  },
  ratingContainer: {
    paddingBottom: 10,
  },
  ratingText: {
    color: light,
    paddingBottom: 5,
  },
  description: {
    color: dark,
    fontSize: 20,
  },
  rateContainer: {
    alignSelf: 'flex-end',
    paddingTop: 10,
  },
  rateButtonView: {
    backgroundColor: dark,
    borderRadius: 5,
  },
  rateButtonText: {
    color: 'white',
    padding: 10,
  },
});

export default RestaurantInfo;

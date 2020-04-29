import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native';
import Constants from 'expo-constants';
import Rating from './Rating';
import { dark } from '../assets/colors';

const screenWidth = Math.round(Dimensions.get('window').width);

function RestaurantItem({ restaurant, setVisible, showMoreInfo }) {
  return (
    <TouchableWithoutFeedback onPress={() => {}}>
        <View
        style={[
          {
            width: screenWidth - 40,
            backgroundColor: 'white',
            marginHorizontal: 20,
            padding: 20,
            borderRadius: 10,
          },
        ]}
      >
        <Image
          style={[{ width: screenWidth - 80, height: 150, borderRadius: 5 }]}
          source={{ uri: `https://www.trondheim.no/${restaurant.image_url}` }}
        />
        <View style={{ paddingTop: 10 }}>
          <Text style={styles.name}>{restaurant.name}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Rating maxRating={5} type="star" value={restaurant.rating} size={20} />
            <Rating maxRating={5} type="cash" value={restaurant.price_class} size={20} />
          </View>
          <Text>{restaurant.phone}</Text>
          <View style={{ alignItems: 'flex-end' }}>
            <TouchableOpacity
              onPress={() => {
                setVisible(false);
                showMoreInfo(true);
              }}
            >
              <View style={styles.merInfoView}>
                <Text style={styles.merInfoText}>Mer info</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

function RestaurantList({
  restaurants,
  setVisible,
  selectedRestaurant,
  setSelectedRestaurant,
  showMoreInfo,
}) {
  const listRef = useRef(null);

  const [scrolling, setScrolling] = useState(false);
  const [scrollDragEnded, setScrollDragEnded] = useState(false);
  const [scrollMomentEnded, setScrollMomentEnded] = useState(false);

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 85,
    minimumViewTime: 100,
  });

  const handleViewableItemsChanged = useRef(info => {
    // Only update the selected state when scrolling, not on e.i. mount
    if (info.viewableItems.length > 0) {
      console.log('setter restaurant i useRef');
      setSelectedRestaurant(info.viewableItems[0].item);
    }
  });

  // useEffect(() => {
  //   if (scrollDragEnded && scrollMomentEnded) {
  //     setScrolling(false);
  //   }
  // }, [scrollDragEnded, scrollMomentEnded]);

  // useEffect(() => {
  //   console.log('scrolling: ' + scrolling);
  // }, [scrolling])

  useEffect(() => {
    // måtte ha null-sjekk for at den ikke skal krasje på iOS
    if (listRef !== null && restaurants && listRef.current !== null) {
      const i = restaurants.map(x => x.id).indexOf(selectedRestaurant.id);
      // const i = restaurants.indexOf(selectedRestaurant);
      if (i > -1) {
        console.log(`index: ${i}`);
        listRef.current.scrollToIndex({ animated: false, index: i });
        // listRef.scrollToIndex({ index: i });
      }
    }
  }, [selectedRestaurant]);




  console.log('Length of restaurants: ' + restaurants.length);
  return (
    <SafeAreaView style={styles.listContainer}>
      <FlatList
        style={{ paddingBottom: 60 }}
        ref={listRef}
        data={restaurants}
        renderItem={({ item }) => (
          <RestaurantItem restaurant={item} setVisible={setVisible} showMoreInfo={showMoreInfo} />
        )}
        getItemLayout={(data, index) => ({
          length: screenWidth,
          offset: screenWidth * index,
          index,
        })}
        keyExtractor={item => item.id.toString()}
        horizontal
        pagingEnabled
        snapToInterval={screenWidth}
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={restaurants.map(x => x.id).indexOf(selectedRestaurant.id)}
        viewabilityConfig={viewabilityConfig.current}
        onViewableItemsChanged={handleViewableItemsChanged.current}
        // onScrollBeginDrag={() => setScrolling(true)}
        // onScrollEndDrag={() => setScrollDragEnded(true)}
        // onMomentumScrollEnd={() => setScrollMomentEnded(true)}
        // onScrollAnimationEnd={() => setScrolling(false)}
        // onScrollToIndexFailed={(err) => console.log('scroll error: ' + err)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    position: 'absolute',
    marginTop: Constants.statusBarHeight,
  },
  name: {
    fontSize: 24,
    color: dark,
  },
  merInfoView: {
    backgroundColor: dark,
    borderRadius: 5,
  },
  merInfoText: {
    color: 'white',
    padding: 10,
  },
});

export default RestaurantList;

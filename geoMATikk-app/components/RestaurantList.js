import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableOpacity,
  // Animated,
  // TextInput,
  // Slider,
  //
} from 'react-native';
import Constants from 'expo-constants';
// import { PanGestureHandler, State } from 'react-native-gesture-handler';

import Rating from './Rating';
import { primary, light, dark } from '../assets/colors';

// const { Swipeable } = GestureHandler;
// import { Dropdown } from 'react-native-material-dropdown';
// import { Ionicons } from '@expo/vector-icons';
// import CheckBox from 'react-native-modest-checkbox';

const screenWidth = Math.round(Dimensions.get('window').width);

function RestaurantItem({ restaurant, setVisible, showMoreInfo }) {
  /*
  function handleAnimationStateChange({ nativeEvent }) {
    if (nativeEvent.state === State.ACTIVE) {
      console.log('PAN!!!');
    }
  }

  let _panY = new Animated.Value(0);
  const _onPanGestureEvent = Animated.event([{nativeEvent: {translationY: _panY}}]);

  const animatedStyle = {
    height: Animated.add(100, _panY),
  };
  <PanGestureHandler onHandlerStateChange={_onPanGestureEvent}>

    </PanGestureHandler>
  */

  return (
    <View
      style={[
        {
          width: screenWidth - 40,
          backgroundColor: 'white',
          marginHorizontal: 20,
          padding: 20,
          borderRadius: 10
        },
      ]}
    >
      <Image
        style={[{ width: screenWidth - 80, height: 150, borderRadius: 5 }]}
        source={{ uri: `https://www.trondheim.no/${restaurant.image_url}` }}
      />
      <View style={{ paddingTop: 10 }}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <Rating maxRating={5} value={restaurant.rating} size={20} />
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
  );
}

/* {
  transform: [
    {
      scaleX: _panY.interpolate({
        inputRange: [-1000, 1000],
        outputRange: [0, 2], // 0 : 150, 0.5 : 75, 1 : 0
      }),
    },
    {
      scaleY: _panY.interpolate({
        inputRange: [-1000, 1000],
        outputRange: [0, 2], // 0 : 150, 0.5 : 75, 1 : 0
      }),
    },
  ],
},
*/

function RestaurantList({
  restaurants,
  visible,
  setVisible,
  selectedID,
  setSelectedID,
  showMoreInfo,
}) {
  const listRef = useRef(null);

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 95,
    minimumViewTime: 100,
  });

  const handleViewableItemsChanged = useRef(info => {
    if (info.viewableItems.length > 0) {
      setSelectedID(info.viewableItems[0].item.id);
    }
  });

  useEffect(() => {
    // måtte ha null-sjekk for at den ikke skal krasje på iOS
    if (listRef !== null && restaurants) {
      const i = restaurants.map(x => x.id).indexOf(selectedID);
      if (i > -1) {
        console.log(`index: ${i}`);
        listRef.current.scrollToIndex({ index: i });
      }
    }
  }, [selectedID]);

  return (
    <SafeAreaView style={styles.listContainer}>
      {visible && (
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
          initialScrollIndex={restaurants.map(x => x.id).indexOf(selectedID)}
          viewabilityConfig={viewabilityConfig.current}
          onViewableItemsChanged={handleViewableItemsChanged.current}
        />
      )}
    </SafeAreaView>
  );
}

/*
<TouchableWithoutFeedback onPress={() => setVisability(false)}>
            <View />
          </TouchableWithoutFeedback>

*/

const styles = StyleSheet.create({
  listContainer: {
    // ...StyleSheet.fill,
    // top: 0,
    // bottom: 0,
    position: 'absolute',
    marginTop: Constants.statusBarHeight,
    // backgroundColor: 'red',
    // justifyContent: 'flex-end',
  },
  name: {
    fontSize: 24,
    color: dark
  },
  merInfoView: {
    backgroundColor: dark,
    borderRadius: 5
  },
  merInfoText: {
    color: 'white',
    padding: 10
  }
});

export default RestaurantList;

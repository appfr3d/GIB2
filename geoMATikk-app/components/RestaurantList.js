import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  SafeAreaView,
  Dimensions,
  Image,
  Animated,
  // TextInput,
  // Slider,
  // Button,
} from 'react-native';
import Constants from 'expo-constants';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

// const { Swipeable } = GestureHandler;
// import { Dropdown } from 'react-native-material-dropdown';
// import { Ionicons } from '@expo/vector-icons';
// import CheckBox from 'react-native-modest-checkbox';

const screenWidth = Math.round(Dimensions.get('window').width);

function RestaurantItem({ restaurant }) {
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
          // position: 'absolute',
          width: screenWidth - 40,
          // height: 100,
          backgroundColor: 'white',
          marginHorizontal: 20,
          padding: 10,
        },
      ]}
    >
      <Image
        style={[{ width: screenWidth - 60, height: 150 }]}
        source={{ uri: `https://www.trondheim.no/${restaurant.image_url}` }}
      />
      <View style={{ paddingTop: 10 }}>
        <Text>{restaurant.name}</Text>
        <Text>{restaurant.phone}</Text>
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

function RestaurantList({ restaurants, visible, selectedID, setSelectedID }) {
  const listRef = useRef(null);

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 95,
    minimumViewTime: 100,
  });

  const handleViewableItemsChanged = useRef(info => {
    console.log(info);
    if (info.viewableItems.length > 0) {
      setSelectedID(info.viewableItems[0].item.id);
    }
  });

  useEffect(() => {
    if (listRef && restaurants) {
      const i = restaurants.map(x => x.id).indexOf(selectedID);
      if (i > -1) {
        listRef.current.scrollToIndex({ index: i });
      }
    }
  }, [selectedID]);

  return (
    <SafeAreaView style={styles.listContainer}>
      {visible && (
        <FlatList
          ref={listRef}
          data={restaurants}
          renderItem={({ item }) => <RestaurantItem restaurant={item} />}
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
});

export default RestaurantList;

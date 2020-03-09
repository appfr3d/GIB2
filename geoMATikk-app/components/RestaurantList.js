import React, { useState } from 'react';
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
        }
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

/*{
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
  // const [{ restaurants, queryState }, queryDispatch] = useRestaurants();
  // const [hidden, setHidden] = useState(true);

  function printEvent(event) {
    // console.log(event.nativeEvent);
    const i = Math.floor(event.nativeEvent.contentOffset.x / screenWidth);
    setSelectedID(restaurants[i].id);
  }

  let isInitialized = false;

  function scrollToInitialIndex() {
    if (!isInitialized) {
      isInitialized = true;
      const i = restaurants.map(x => x.id).indexOf(selectedID);
      listRef.scrollToIndex({ animated: true, index: i });
    }
  }

  let listRef = null;

  return (
    <SafeAreaView style={styles.listContainer}>
      {visible && (
        <FlatList
          ref={ref => {
            listRef = ref;
          }}
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
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={e => printEvent(e)}
          onLayout={() => scrollToInitialIndex()}
          // onScroll={()}
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

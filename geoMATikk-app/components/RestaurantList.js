import React, { useEffect, useRef } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  SafeAreaView,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import Constants from 'expo-constants';
import Rating from './Rating';

const screenWidth = Math.round(Dimensions.get('window').width);

function RestaurantItem({ restaurant, setVisible, showMoreInfo }) {
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
        <View style={{flexDirection:'row'}}>
          <Rating maxRating={5} type='star' value={restaurant.rating} size={20} />
          <Rating maxRating={5} type='cash' value={restaurant.price_class} size={20}/>
        </View>
        <Text>{restaurant.phone}</Text>
        <View style={{ alignItems: 'flex-end' }}>
          <TouchableOpacity
            onPress={() => {
              setVisible(false);
              showMoreInfo(true);
            }}
          >
            <Text>Mer info</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

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
    console.log(info);
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

const styles = StyleSheet.create({
  listContainer: {
    position: 'absolute',
    marginTop: Constants.statusBarHeight,
  },
});

export default RestaurantList;

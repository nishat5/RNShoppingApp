//import liraries
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { CartContext } from '../context/cartContext';
import ProductCard from '../components/eCommerce/ProductCard';
import Header from '../components/eCommerce/Header';

// create a component
const FavouriteScreen = ({ navigation }) => {
  const { likedItems } = useContext(CartContext);
  const [isGridView, setIsGridView] = useState(true);
  const numColumns = isGridView ? 2 : 1;
  return (
    <View style={styles.container}>
      <Header isFavourite={true} />
      {likedItems.length > 0 ? (
        <FlatList
          data={likedItems}
          key={numColumns}
          numColumns={numColumns}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <ProductCard
                item={item}
                onPress={() => {
                  navigation.navigate('Details', { item });
                }}
              />
            );
          }}
        />
      ) : (
        <View style={styles.emptyLikedContainer}>
          <Text style={styles.emptyLikedText}>
            You don't have any favourites yet.
          </Text>
        </View>
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: '#f3eaeaff',
  },
  emptyLikedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  emptyLikedText: {
    fontSize: 22,
    fontWeight: '700',
    fontFamily: 'Roboto-Regular',
    color: '#f33716ff',
  },
});

//make this component available to the app
export default FavouriteScreen;

//import liraries
import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { CartContext } from '../../context/cartContext';

// create a component
const ProductCard = ({ item, onPress }) => {
  // const [isLiked, setIsLiked] = useState(false);
  const { likedItems, toggleLikedItems } = useContext(CartContext); //cartcontext toggler for like/unlike
  const isLiked = likedItems.some(i => i.id === item.id); //return TRUE any item already liked
  return (
    <TouchableOpacity style={styles.modelContainer} onPress={onPress}>
      <View style={styles.imgContainer}>
        <Image
          style={styles.modelImage}
          resizeMode="cover"
          source={{
            uri: item.imgUrl,
          }}
        />
      </View>
      <Text style={styles.modelOutfit}> {item.outfit}</Text>
      <Text style={styles.outfitPrice}>${item.price}</Text>
      <TouchableOpacity
        onPress={() => {
          // setIsLiked(!isLiked);
          toggleLikedItems(item); //this is function for toggling like/unlike items
          console.log('i am running on toggling like button');
        }}
        style={styles.likeContainer}
      >
        {isLiked ? (
          <Entypo color={'#f33716ff'} name="heart" size={25} />
        ) : (
          <Entypo color={'#323235ff'} name="heart-outlined" size={25} />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  //modalflatlist designing
  modelContainer: {
    // flex: 1,
    padding: 5,
    position: 'relative',
    // borderWidth: 1,
    marginHorizontal: 6,
    marginVertical: 4,
  },
  imgContainer: { width: 170 },
  modelImage: {
    height: 240,
    width: '100%',
    borderRadius: 10,
  },
  modelOutfit: {
    fontSize: 19,
    marginTop: 3,
    letterSpacing: 0.2,
    fontWeight: '700',
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
  },
  outfitPrice: {
    fontSize: 17,
    color: 'gray',
    fontWeight: '500',
    marginTop: 3,
    marginLeft: 7,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  likeContainer: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#f7f7f7',
    backgroundColor: 'rgba(253, 253, 253, 0.6)',
    position: 'absolute',
    top: 12,
    right: 12,
  },
});

//make this component available to the app
export default ProductCard;

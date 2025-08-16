//import liraries
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// create a component
const Header = ({
  isUser,
  isHome,
  isProductDetail,
  isCart,
  isFavourite,
  isOrder,
  isConfirmOrder,
  isOrderDetail,
  email,
  onPress,
}) => {
  const username = email?.split('@')[0] || null;

  const showBackArrow =
    isOrderDetail || isConfirmOrder || isProductDetail || isOrder || isCart;

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.logoContainer} onPress={onPress}>
        {showBackArrow && (
          <Ionicons style={styles.logoIcon} name="chevron-back" />
        )}
        {isFavourite && <FontAwesome style={styles.logoIcon} name="heart" />}
        {isHome && <Feather style={styles.logoIcon} name="shopping-bag" />}
        {isUser && <Feather style={styles.logoIcon} name="shopping-bag" />}
      </TouchableOpacity>
      {isOrderDetail && <Text style={styles.headerText}>Order Details</Text>}
      {isConfirmOrder && <Text style={styles.headerText}>Confirm Order</Text>}
      {isOrder && <Text style={styles.headerText}>Order Now</Text>}
      {isCart && <Text style={styles.headerText}>Cart Products</Text>}
      {username && <Text style={styles.headerText}>{username}</Text>}
      {isFavourite && <Text style={styles.headerText}>Favourites</Text>}
      {/* {isHome && <Text style={styles.headerText}>All Products</Text>} */}
      <View style={styles.imgContainer}>
        {isProductDetail ? null : (
          <Image source={require('../../assets/img.jpg')} style={styles.img} />
        )}
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  headerContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 21,
    fontWeight: '700',
    fontFamily: 'Roboto-Regular',
  },
  logoContainer: {
    backgroundColor: '#f3f3f3',
    height: 30,
    width: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: {
    fontSize: 20,
    color: '#f33716ff',
  },
  imgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});

//make this component available to the app
export default Header;

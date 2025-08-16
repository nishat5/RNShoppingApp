//import liraries
import React, { Component, useContext, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CartContext } from '../../context/cartContext';
import QuantitySelector from './QuantitySelector';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

// create a component
const CartCard = ({ item, isConfirmOrder }) => {
  const { deleteToCart, updateCartQuantity } = useContext(CartContext);
  const [quantity, setQuantity] = useState(item.quantity);
  // console.log(carts.quantity)
  const handlerDeleteCart = () => {
    deleteToCart(item.id);
  };

  useEffect(() => {
    if (quantity !== item.quantity) {
      updateCartQuantity(item.id, quantity); // pass only id & new quantity
    }
  }, [quantity]);

  //below code will give accurate quantity between Quantity Selector input + 1 -
  useEffect(() => {
    setQuantity(item.quantity); // sync local quantity when context changes
  }, [item.quantity]);

  return (
    <View style={styles.container} key={item.id}>
      <Image
        source={{
          uri: item.imgUrl,
        }}
        style={styles.image}
      />
      <View style={styles.cartInfoContainer}>
        <Text style={styles.title}>
          {item.outfit}
          <Text style={{ color: '#f33716ff', fontSize: 19 }}>
            {' '}
            x {item.quantity}
          </Text>
        </Text>
        <Text style={styles.price}>${item.price}</Text>
        <View style={styles.sizeColorContainer}>
          <View
            style={[styles.choosenColor, { backgroundColor: item.color }]}
          ></View>
          <View style={styles.sizeInnerContainer}>
            <Text style={[styles.sizeCategoryText, { color: item.color }]}>
              {item.size}
            </Text>
          </View>
        </View>
      </View>
      {isConfirmOrder ? (
        <View style={{ alignSelf: 'center' }}>
          <FontAwesome6 style={styles.logoIcon} name="circle-check" size={24} />
        </View>
      ) : (
        <>
          {/* Quantity Selector */}
          <View style={{ alignSelf: 'center' }}>
            <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
          </View>
          <TouchableOpacity
            onPress={handlerDeleteCart}
            style={{ alignSelf: 'center' }}
          >
            <MaterialIcons
              style={styles.logoIcon}
              color="#f33716ff"
              name="delete-outline"
              size={26}
            />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    padding: 6,
    flexDirection: 'row',
    backgroundColor: '#e4e3e1ff',
    borderWidth: 1,
    borderColor: '#cfcbcbff',
    borderRadius: 10,
    elevation: 2,
    marginBottom: 10,
    height: 120,
    overflow: 'hidden',
  },
  image: {
    width: '25%',
    borderRadius: 5,
  },
  cartInfoContainer: {
    marginHorizontal: 15,
    // alignSelf: 'center',
    marginVertical: 7,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
  },
  price: {
    fontSize: 17,
    fontWeight: '600',
    fontFamily: 'Roboto-Medium',
    marginTop: 5,
    letterSpacing: 0.5,
    color: '#575555ff',
  },
  sizeColorContainer: {
    marginVertical: 13,
    flexDirection: 'row',
    gap: 6,
  },
  choosenColor: {
    height: 22,
    width: 22,
    borderRadius: 11,
  },
  sizeInnerContainer: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderColor: 'gray',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  sizeCategoryText: {
    fontSize: 13,
    fontWeight: '800',
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
  },
  logoIcon: {
    marginVertical: 7,
    marginHorizontal: 10,
  },
});

//make this component available to the app
export default CartCard;

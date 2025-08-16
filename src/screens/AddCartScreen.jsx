//import liraries
import React, { Component, useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';
import Header from '../components/eCommerce/Header';
import CartCard from '../components/eCommerce/CartCard';
import CustomButton from '../components/eCommerce/CustomButton';
import { CartContext } from '../context/cartContext';
// import { Picker } from '@react-native-picker/picker';
// import OrderNowScreen from './OrderNowScreen';

// create a component
const AddCartScreen = ({ navigation }) => {
  // const [deliveryMethod, setDeliveryMethod] = useState('');
  // const [paymentMethod, setPaymentMethod] = useState('');

  const handleCheckout = () => {
    navigation.navigate('OrderNow');
  };
  const { carts, addCartTotal, cartTotal } = useContext(CartContext);
  useEffect(() => {
    //adding cart total
    addCartTotal();
  }, [carts]);

  return (
    <View style={styles.container}>
      <Header isCart={true} onPress={() => navigation.navigate('HomeScreen')} />
      {carts.length > 0 ? (
        <View style={styles.cartContainer}>
          <FlatList
            data={carts}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return <CartCard item={item} />;
            }}
            ListFooterComponentStyle={{ paddingBottom: 70 }}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={
              <>
                <View style={[styles.billContainer, { marginTop: 20 }]}>
                  <Text style={styles.billHeading}>Total: </Text>
                  <Text style={styles.billAmount}>${cartTotal.toFixed(2)}</Text>
                </View>
                <View style={styles.buttonContainer}>
                  <CustomButton
                    color="#f33716ff"
                    title="Proceed to Checkout"
                    onPress={handleCheckout}
                  />
                </View>
              </>
            }
          />
        </View>
      ) : (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>No item found in cart!</Text>
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
  cartContainer: {
    marginTop: 10,
  },
  billContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 5,
  },
  billHeading: {
    fontSize: 19,
    fontFamily: 'Roboto-Regular',
    letterSpacing: 0.2,
    fontWeight: 'bold',
  },
  billAmount: {
    fontSize: 19,
    fontFamily: 'Roboto-Regular',
    letterSpacing: 0.3,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 10,
    paddingBottom: 15,
  },
  emptyCartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  emptyCartText: {
    fontSize: 25,
    fontWeight: '700',
    fontFamily: 'Roboto-Regular',
    color: '#f33716ff',
  },
});

//make this component available to the app
export default AddCartScreen;

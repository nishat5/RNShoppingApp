//import liraries
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import Header from '../components/eCommerce/Header';
import CartCard from '../components/eCommerce/CartCard';
import CustomButton from '../components/eCommerce/CustomButton';
import { CartContext } from '../context/cartContext';
import { Picker } from '@react-native-picker/picker';
import { TextInput } from 'react-native';

// create a component
const OrderNowScreen = ({ navigation, route }) => {
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [address, setAddress] = useState('');

  //for collectiong delivery amount from delivery mthod picker
  let deliveryAmount = 0;
  if (deliveryMethod === 'standard') {
    deliveryAmount = 0;
  }
  if (deliveryMethod === 'express') {
    deliveryAmount = 10;
  }
  if (deliveryMethod === 'same_day') {
    deliveryAmount = 20;
  }

  const {
    carts,
    addCartTotal,
    cartTotal,
    addGrandTotal,
    cartGrandTotal,
    setCheckoutData,
  } = useContext(CartContext);
  useEffect(() => {
    addCartTotal();
    addGrandTotal(deliveryAmount);
  }, [carts, deliveryAmount, deliveryMethod]);

  const handlePlaceOrder = () => {
    if (!deliveryMethod || !paymentMethod || !address) {
      Alert.alert(
        'Missing Info',
        'Please enter address, delivery and payment methods to proceed.',
      );
      return;
    }

    setCheckoutData({ address, deliveryMethod, paymentMethod, deliveryAmount });
    navigation.navigate('ConfirmOrderScreen');
  };

  return (
    <View style={styles.container}>
      <Header
        isOrder={true}
        onPress={() => {
          navigation.navigate('HomeScreen');
        }}
      />
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
              <View>
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.label}>Delivery Method</Text>
                  <View style={styles.pickerWrapper}>
                    <Picker
                      enabled={true}
                      selectedValue={deliveryMethod}
                      onValueChange={itemValue => setDeliveryMethod(itemValue)}
                      style={styles.pickerItemContainer}
                    >
                      <Picker.Item
                        style={styles.pickerItemText}
                        label="-- Select Delivery --"
                        value=""
                      />
                      <Picker.Item
                        style={styles.pickerItemText}
                        label="Standard (Free)"
                        value="standard"
                      />
                      <Picker.Item
                        style={styles.pickerItemText}
                        label="Express ($10)"
                        value="express"
                      />
                      <Picker.Item
                        style={styles.pickerItemText}
                        label="Same Day ($20)"
                        value="same_day"
                      />
                    </Picker>
                  </View>

                  <Text style={styles.label}>Payment Method</Text>
                  <View style={styles.pickerWrapper}>
                    <Picker
                      enabled={true}
                      selectedValue={paymentMethod}
                      onValueChange={itemValue => setPaymentMethod(itemValue)}
                      style={styles.pickerItemContainer}
                    >
                      <Picker.Item
                        style={styles.pickerItemText}
                        label="-- Select Payment --"
                        value=""
                      />
                      <Picker.Item
                        style={styles.pickerItemText}
                        label="Cash on Delivery"
                        value="cod"
                      />
                      <Picker.Item
                        style={styles.pickerItemText}
                        label="PayFast"
                        value="payfast"
                      />
                    </Picker>
                  </View>
                  <Text style={styles.label}>Delivery Address</Text>
                  <View style={styles.pickerWrapper}>
                    <TextInput
                      style={styles.input}
                      value={address}
                      onChangeText={text => setAddress(text)}
                      placeholder="Enter Address"
                      placeholderTextColor="black"
                    />
                  </View>
                </View>

                <View style={[styles.billContainer, { marginTop: 10 }]}>
                  <Text style={styles.billHeading}>Total: </Text>
                  <Text style={styles.billAmount}>${cartTotal.toFixed(2)}</Text>
                </View>
                <View style={styles.billContainer}>
                  <Text style={styles.billHeading}>Shipping Cost: </Text>
                  <Text style={styles.billAmount}>${deliveryAmount}</Text>
                </View>
                <View style={[styles.billContainer, { marginTop: 30 }]}>
                  <Text style={[styles.billHeading, { fontWeight: 'bold' }]}>
                    Grand Total:
                  </Text>
                  <Text style={[styles.billAmount, { fontWeight: 'bold' }]}>
                    ${cartGrandTotal.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.buttonContainer}>
                  <CustomButton
                    color="#f33716ff"
                    title="Place Order"
                    onPress={handlePlaceOrder}
                  />
                </View>
              </View>
            }
          />
        </View>
      ) : (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>
            No item found in order now screen!
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
  cartContainer: {
    marginTop: 10,
  },
  input: {
    height: 48,
    marginVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: '#faf7f7ff',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
  label: {
    marginBottom: 10,
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
  },
  pickerWrapper: {
    marginBottom: 15,
    elevation: 1,
  },
  pickerItemContainer: {
    backgroundColor: '#faf7f7ff',
  },
  pickerItemText: {
    fontFamily: 'Roboto-Regular',
  },
  billContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 5,
  },
  billHeading: {
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
    letterSpacing: 0.2,
  },
  billAmount: {
    fontSize: 17,
    fontFamily: 'Roboto-Regular',
    letterSpacing: 0.3,
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
    textAlign: 'center',
  },
});

//make this component available to the app
export default OrderNowScreen;

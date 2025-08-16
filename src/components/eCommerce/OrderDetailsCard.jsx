//import liraries
import React, { Component, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CartContext } from '../../context/cartContext';

// create a component
const OrderDetailsCard = ({ item }) => {
  const { deleteOrder } = useContext(CartContext);

  const handlerCancelOrder = () => {
    deleteOrder(item.orderId);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.orderText}>Order ID: {item.orderId}</Text>
      <View style={styles.flexContainerWrapper}>
        <View style={styles.flexContainer}>
          <Text style={[styles.text, { fontWeight: '700' }]}>
            Order Status:
          </Text>
          <Text style={[styles.text, { fontWeight: '700' }]}>
            {item.status}
          </Text>
        </View>
        <View style={styles.flexContainer}>
          <Text style={styles.text}>Payment: {item.paymentMethod}</Text>
          <Text style={styles.text}>Delivery: {item.deliveryMethod}</Text>
        </View>
        <View style={styles.flexContainer}>
          <Text style={styles.text}>
            Total Amount: ${item.grandTotal.toFixed(2)}
          </Text>
          <Text style={styles.text}>Shipping Cost: ${item.shippingCost}</Text>
        </View>

        <View style={styles.flexContainer}>
          <Text style={styles.text}>Items:</Text>
          <Text style={styles.text}>
            {item.productDetails.map(i => i.outfit).join(', ')}
          </Text>
        </View>
        <View style={styles.flexContainer}>
          <Text style={styles.text}>Quantity:</Text>
          <Text style={styles.text}>
            {item.productDetails.map(i => i.quantity).join(', ')}
          </Text>
        </View>
        <View style={styles.flexContainer}>
          <Text style={styles.text}>Price: </Text>
          <Text style={styles.text}>
            ${item.productDetails.map(i => i.price).join(', $')}
          </Text>
        </View>
        <View style={styles.flexContainer}>
          <Text style={styles.text}>Address: </Text>
          <Text style={[styles.text, { textTransform: 'capitalize' }]}>
            {item.address}
          </Text>
        </View>
      </View>

      <View style={styles.deleteBtnWrapper}>
        <Text style={[styles.text, { fontWeight: 'bold' }]}>Cancel Order:</Text>
        <TouchableOpacity
          onPress={handlerCancelOrder}
          style={styles.deteteIconContainer}
        >
          <MaterialIcons color="#f33716ff" name="delete-outline" size={20} />
        </TouchableOpacity>
      </View>

      <Text style={styles.orderTime}>
        Created At: {item.orderCreation.toLocaleString()}
      </Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
    // backgroundColor: '#e4e3e1ff',
    backgroundColor: '#f5f5f5',
  },
  orderText: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
    backgroundColor: '#f33716ff',
    color: 'white',
    paddingVertical: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  flexContainerWrapper: {
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  flexContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  text: {
    fontSize: 17,
    fontFamily: 'Roboto-Regular',
  },
  deleteBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  deteteIconContainer: {
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
  orderTime: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    fontWeight: '700',
    textAlign: 'center',
    backgroundColor: '#58575aff',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    color: 'white',
  },
});

//make this component available to the app
export default OrderDetailsCard;

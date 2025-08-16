//import liraries
import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import Header from '../components/eCommerce/Header';
import CartCard from '../components/eCommerce/CartCard';
import CustomButton from '../components/eCommerce/CustomButton';
import { CartContext } from '../context/cartContext';

// create a component
const ConfirmOrderScreen = ({ navigation, route }) => {
  const [orderSuccess, setOrderSuccess] = useState(false); // always defined

  const { checkoutData } = useContext(CartContext);
  const { address, deliveryMethod, paymentMethod, deliveryAmount } =
    checkoutData;

  // Get orderSuccess from route.params only when passed
  useEffect(() => {
    if (route?.params?.orderSuccess !== undefined) {
      setOrderSuccess(route.params.orderSuccess);
    }
  }, [route?.params]);

  const {
    carts,
    addCartTotal,
    cartTotal,
    addGrandTotal,
    cartGrandTotal,
    addOrderDetail,
  } = useContext(CartContext);
  useEffect(() => {
    addCartTotal();
    addGrandTotal(deliveryAmount);
  }, [deliveryAmount]);

  const handlePayment = () => {
    navigation.navigate('PaymentWebViewScreen', {
      amount: cartGrandTotal,
      itemName: 'Order #' + Date.now(),
    });
  };

  const handleConfirmOrder = () => {
    //adding order details to database
    addOrderDetail(
      carts,
      cartGrandTotal,
      deliveryAmount,
      deliveryMethod,
      paymentMethod,
      address,
    );
    navigation.navigate('Orders');
    Alert.alert('Successfully Order Placed');
  };

  return (
    <View style={styles.container}>
      <Header
        isConfirmOrder={true}
        onPress={() => {
          navigation.navigate('OrderNow');
        }}
      />

      {carts.length > 0 ? (
        <View style={styles.cartContainer}>
          <FlatList
            data={carts}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return (
                <CartCard
                  isConfirmOrder={true}
                  onPress={() => navigation.goBack()}
                  item={item}
                />
              );
            }}
            ListFooterComponentStyle={{ paddingBottom: 0 }}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={
              <View>
                <View style={styles.headingContainer}>
                  <Text style={styles.heading}>Delivery Method: </Text>
                  <Text style={styles.headingText}>{deliveryMethod}</Text>
                </View>

                <View style={styles.headingContainer}>
                  <Text style={styles.heading}>Payment Method: </Text>
                  <Text style={styles.headingText}>{paymentMethod}</Text>
                </View>

                <View style={styles.headingContainer}>
                  <Text style={styles.heading}>Delivery Address: </Text>
                  <Text
                    style={[
                      styles.headingText,
                      {
                        flexShrink: 1,
                        flexWrap: 'wrap',
                        textAlign: 'right',
                      },
                    ]}
                  >
                    {address}
                  </Text>
                </View>

                <View style={styles.headingContainer}>
                  <Text style={styles.heading}>Shipping Cost: </Text>
                  <Text style={styles.headingText}>${deliveryAmount}</Text>
                </View>
                <View style={styles.headingContainer}>
                  <Text style={styles.heading}>Total: </Text>
                  <Text style={styles.headingText}>
                    ${cartTotal.toFixed(2)}
                  </Text>
                </View>
                <View
                  style={[
                    styles.headingContainer,
                    {
                      marginTop: 15,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.heading,
                      { fontSize: 19, fontWeight: 'bold' },
                    ]}
                  >
                    Grand Total:
                  </Text>
                  <Text
                    style={[
                      styles.headingText,
                      { fontSize: 19, fontWeight: 'bold' },
                    ]}
                  >
                    ${cartGrandTotal.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.buttonContainer}>
                  {paymentMethod === 'cod' || orderSuccess ? (
                    <CustomButton
                      color="#f33716ff"
                      title="Confirm Order"
                      onPress={handleConfirmOrder}
                    />
                  ) : (
                    <CustomButton
                      color="#f33716ff"
                      title="Pay Now"
                      onPress={handlePayment}
                    />
                  )}
                </View>
              </View>
            }
          />
        </View>
      ) : (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>No order found to confirm!</Text>
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
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 5,
  },
  heading: {
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
    letterSpacing: 0.2,
    // fontWeight: 'bold',
  },
  headingText: {
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
    letterSpacing: 0.2,
    textTransform: 'capitalize',
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
export default ConfirmOrderScreen;

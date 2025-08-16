//import liraries
import React, { Component, useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { CartContext } from '../context/cartContext';
import OrderDetailsCard from '../components/eCommerce/OrderDetailsCard';
import Header from '../components/eCommerce/Header';

// create a component
const OrderDetailsScreen = ({ navigation }) => {
  const { orderDetail } = useContext(CartContext);

  return (
    <View style={styles.container}>
      <Header
        isOrderDetail={true}
        onPress={() => {
          navigation.navigate('Home');
        }}
      />

      {orderDetail.length > 0 ? (
        <FlatList
          data={orderDetail}
          keyExtractor={item => item.orderId}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <OrderDetailsCard item={item} />}
          contentContainerStyle={{ marginTop: 10 }}
        />
      ) : (
        <View style={styles.emptyOrderContainer}>
          <Text style={styles.emptyOrderText}>
            You haven't placed any order yet.
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
  headerText: {
    fontSize: 29,
    marginVertical: 15,
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
  },
  emptyOrderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  emptyOrderText: {
    fontSize: 22,
    fontWeight: '700',
    fontFamily: 'Roboto-Regular',
    color: '#f33716ff',
  },
});

//make this component available to the app
export default OrderDetailsScreen;

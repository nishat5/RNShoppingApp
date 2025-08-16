//import liraries
import React, { Component, useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

// create a component
const AdminManageOrderScreen = () => {
  const [orders, setOrders] = useState([]);

  //fetching orders directily from firestore database
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('orders')
      .onSnapshot(snapshot => {
        setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });

    return unsubscribe;
  }, []);

  //updating particular order status for users which has been shipped
  const updateOrderStatus = (orderId, newStatus) => {
    firestore().collection('orders').doc(orderId).update({ status: newStatus });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Admin Order Management</Text>

      {orders.length > 0 ? (
        <FlatList
          data={orders}
          keyExtractor={item => item.orderId}
          renderItem={({ item }) => {
            return (
              <View style={styles.flatlistWrapper}>
                <Text style={styles.orderText}>User ID: {item.userId}</Text>
                <Text style={styles.orderText}>Order ID: {item.orderId}</Text>
                <Text style={styles.orderText}>
                  User Email: {item.userEmail}
                </Text>
                <Text style={[styles.orderText, { fontWeight: 'bold' }]}>
                  Order Status: {item.status}
                </Text>

                <TouchableOpacity
                  onPress={() => updateOrderStatus(item.orderId, 'shipped')}
                  style={styles.btnContainer}
                >
                  <Text style={styles.btnText}>Mark Shipped</Text>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      ) : (
        <View style={styles.emptyOrderContainer}>
          <Text style={styles.emptyOrderText}>
            No Order Placed By Any User...
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
    paddingHorizontal: 30,
    backgroundColor: '#f3eaeaff',
  },
  headerText: {
    fontSize: 25,
    marginTop: 15,
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
    // borderWidth: 1,
  },
  orderText: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    marginBottom: 5,
  },
  flatlistWrapper: {
    marginTop: 15,
    borderWidth: 0.5,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 4,
    backgroundColor: '#f5f5f5',
  },
  btnContainer: { marginTop: 5 },
  btnText: {
    paddingVertical: 5,
    borderRadius: 4,
    backgroundColor: '#f33716ff',
    color: 'white',
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    textAlign: 'center',
  },
  emptyOrderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  emptyOrderText: {
    fontSize: 25,
    fontWeight: '700',
    fontFamily: 'Roboto-Regular',
    color: '#f33716ff',
    textAlign: 'center',
  },
});

//make this component available to the app
export default AdminManageOrderScreen;

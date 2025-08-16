//import liraries
import React, { Component, useContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../components/eCommerce/CustomButton';
import auth from '@react-native-firebase/auth';
import { AuthContext } from '../context/authContext';
import Header from '../components/eCommerce/Header';
import { CartContext } from '../context/cartContext';

// create a component
const UserScreen = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const { setCarts, setLikedItems, setOrderDetail } = useContext(CartContext);
  const handleLogout = async () => {
    await auth().signOut(); // will switch back to AuthNavigator
    //when User logged out , clear cart, likedItems, order details from state
    setCarts([]);
    setLikedItems([]);
    setOrderDetail([]);
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header isUser={true} email={user.email} />
      </View>
      <View style={styles.userinfoContainer}>
        <Text style={styles.userinfo}>{user.email}</Text>
        <CustomButton title="Logout" color="#f33716ff" onPress={handleLogout} />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#f3eaeaff',
  },
  headerContainer: {
    paddingHorizontal: 15,
  },
  userinfoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  userinfo: {
    fontSize: 20,
    marginBottom: 10,
    alignSelf: 'center',
    fontFamily: 'Roboto-Bold',
  },
});

//make this component available to the app
export default UserScreen;

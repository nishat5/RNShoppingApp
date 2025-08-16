//import liraries
import React, { Component, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../components/eCommerce/CustomButton';

import auth from '@react-native-firebase/auth';
import { AuthContext } from '../context/authContext';

// create a component
const AdminLogoutScreen = () => {
  const { user } = useContext(AuthContext);
  const handleLogout = async () => {
    auth().signOut();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.userText}>{user.email}</Text>
      <CustomButton
        title="Admin Logout"
        color="#f33716ff"
        onPress={handleLogout}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3eaeaff',
    paddingHorizontal: 30,
  },
  userText: {
    fontSize: 24,
    fontFamily: 'Roboto-Regular',
    marginBottom: 6,
  },
});

//make this component available to the app
export default AdminLogoutScreen;

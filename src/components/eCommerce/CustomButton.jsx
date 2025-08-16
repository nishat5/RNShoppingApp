//import liraries
import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

// create a component
const CustomButton = ({ title, onPress, color }) => {
  return (
    <TouchableOpacity
      style={[styles.btnContainer, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  btnContainer: {
    width: '100%',
    padding: 11,
    marginHorizontal: 'auto',
    borderRadius: 10,
    marginVertical: 6,
  },
  btnText: {
    fontSize: 19,
    color: 'white',
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
});

//make this component available to the app
export default CustomButton;

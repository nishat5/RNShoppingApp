//import liraries
import React, { Component } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

// create a component
const CategoryList = ({ item, isSelected, setIsSelected }) => {
  return (
    <TouchableOpacity
      style={[
        styles.listContainer,
        isSelected === item && {
          backgroundColor: '#f33716ff',
        },
      ]}
      onPress={() => {
        setIsSelected(item);
      }}
    >
      <Text style={styles.listTitle}>{item}</Text>
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 30,
    backgroundColor: '#5c5858ff',
    marginHorizontal: 5,
    marginVertical: 10,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Roboto-Bold',
  },
});

//make this component available to the app
export default CategoryList;

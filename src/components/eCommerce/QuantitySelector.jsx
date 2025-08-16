//import liraries
import React, { Component, useContext } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';

import InputSpinner from 'react-native-input-spinner';

// create a component
const QuantitySelector = ({ quantity, setQuantity, detailScreen }) => {
  return (
    <InputSpinner
      max={10}
      min={1}
      step={1}
      value={quantity}
      onChange={setQuantity}
      color={'#f33716ff'} // Button border and icon color
      colorLeft={'#5c5858ff'} // Left button background
      colorRight={'#5c5858ff'} // Right button background
      height={30}
      width={150}
      buttonFontSize={23}
      fontSize={18}
      fontFamily="Roboto-Bold"
      buttonFontFamily="Roboto-Bold"
      editable={false} // prevents keyboard popup on touch input quantity field
      style={[
        styles.spinner,
        detailScreen && { flexDirection: 'row', width: 110 },
      ]}
    />
  );
};

// define your styles
const styles = StyleSheet.create({
  spinner: {
    width: 45,
    borderRadius: 8,
    flexDirection: 'column-reverse',
  },
});

//make this component available to the app
export default QuantitySelector;

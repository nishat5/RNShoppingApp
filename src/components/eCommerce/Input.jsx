//import liraries
import React, { Component, useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

// create a component
const Input = ({
  value,
  onChangeText,
  placeholder,
  autoCapitalize,
  keyboardType,
  secureTextEntry,
  onFocus,
  onBlur,
  focusedInput,
  error,
  isEmail,
  isPassword,
  isConfirmPassword,
}) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <View style={[styles.inputWrapper, focusedInput && styles.inputFocused]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          secureTextEntry={visible ? false : true}
          style={styles.input}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholderTextColor="silver"
        />
        {isEmail && (
          <View>
            <Ionicons color="#f03919d7" name="person" size={18} />
          </View>
        )}

        {isPassword && (
          <TouchableOpacity onPress={() => setVisible(!visible)}>
            {visible ? (
              <Entypo color="#f03919d7" name="eye" size={18} />
            ) : (
              <Entypo color="#f03919d7" name="eye-with-line" size={18} />
            )}
          </TouchableOpacity>
        )}
        {isConfirmPassword && (
          <TouchableOpacity onPress={() => setVisible(!visible)}>
            {visible ? (
              <Entypo color="#f03919d7" name="eye" size={18} />
            ) : (
              <Entypo color="#f03919d7" name="eye-with-line" size={18} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={styles.errorText}>*{error}</Text> : null}
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#ecebebff',
    height: 43,
    borderRadius: 5,
    marginVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 17,
    color: '#363434e7',
    fontFamily: 'Roboto-Regular',
  },
  inputFocused: {
    borderColor: '#f03919d7', // border on focus
    borderWidth: 1.2,
  },
  errorText: {
    fontSize: 15,
    paddingLeft: 5,
    fontFamily: 'Roboto-Bold',
    color: '#f33716ff',
    marginTop: -4,
  },
  logoIcon: {
    position: 'absolute',
  },
});

//make this component available to the app
export default Input;

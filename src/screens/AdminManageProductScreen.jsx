//import liraries
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CustomButton from '../components/eCommerce/CustomButton';
import firestore from '@react-native-firebase/firestore';

// create a component
const AdminProductManageScreen = ({ route, navigation }) => {
  const { item, editProduct } = route.params || '';
  const [formData, setFormData] = useState({
    imgUrl: editProduct ? item.imgUrl : '',
    outfit: editProduct ? item.outfit : '',
    price: editProduct ? item.price.toString() : '',
    category: editProduct ? item.category : '',
  });

  //for comparing value and making if logic
  const [previousValue, setPreviousValue] = useState({
    imgUrl: editProduct ? item.imgUrl : '',
    outfit: editProduct ? item.outfit : '',
    price: editProduct ? item.price : '',
    category: editProduct ? item.category : '',
  });

  const [focusedInput, setFocusedInput] = useState(false); //for border focus of input

  const onChangeHandler = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  //for editing Product by admin
  const handlerEditProduct = async productId => {
    if (
      formData.outfit === previousValue.outfit &&
      formData.price === previousValue.price &&
      formData.imgUrl === previousValue.imgUrl &&
      formData.category === previousValue.category
    ) {
      Alert.alert('Please make any change to edit product.');
      return;
    }
    try {
      const productRef = firestore().collection('products').doc(productId);
      await productRef.update({
        imgUrl: formData.imgUrl,
        outfit: formData.outfit,
        price: formData.price,
        category: formData.category,
      });
      Alert.alert('Success:', 'Product has been successfully edited!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error in updating', error.message);
    }
  };

  //for adding new product from admin
  const handlerAddProduct = async () => {
    if (!formData.outfit || !formData.price || !formData.imgUrl) {
      Alert.alert(
        'Error',
        'Please fill in all fields before adding a product.',
      );
      return;
    }
    try {
      const productRef = firestore().collection('products');
      await productRef.add({
        imgUrl: formData.imgUrl,
        outfit: formData.outfit,
        price: formData.price,
        category: formData.category,
      });
      Alert.alert('Success', 'Product has been added!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error in Adding Product', error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {editProduct ? (
          <Text style={styles.headerText}>Edit Product</Text>
        ) : (
          <Text style={styles.headerText}>Add Product</Text>
        )}
        <View>
          <TextInput
            value={formData.imgUrl}
            onChangeText={value => {
              onChangeHandler('imgUrl', value);
            }}
            placeholder="Product Url"
            autoCapitalize="none"
            keyboardType="default"
            onFocus={() => setFocusedInput('imgUrl')}
            onBlur={() => setFocusedInput(false)}
            focusedInput={focusedInput === 'imgUrl'}
            style={[
              styles.input,
              focusedInput === 'imgUrl' && styles.inputFocused,
            ]}
          />
          <TextInput
            value={formData.outfit}
            onChangeText={value => {
              onChangeHandler('outfit', value);
            }}
            placeholder="Product Name"
            autoCapitalize="none"
            keyboardType="default"
            onFocus={() => setFocusedInput('outfit')}
            onBlur={() => setFocusedInput(false)}
            focusedInput={focusedInput === 'outfit'}
            style={[
              styles.input,
              focusedInput === 'outfit' && styles.inputFocused,
            ]}
          />
          <TextInput
            value={formData.price}
            onChangeText={value => {
              onChangeHandler('price', value);
            }}
            placeholder="Product Price"
            autoCapitalize="none"
            keyboardType="default"
            onFocus={() => setFocusedInput('price')}
            onBlur={() => setFocusedInput(false)}
            focusedInput={focusedInput === 'price'}
            style={[
              styles.input,
              focusedInput === 'price' && styles.inputFocused,
            ]}
          />
          <View style={styles.pickerWrapper}>
            <Picker
              enabled={true}
              selectedValue={formData.category}
              onValueChange={
                value => onChangeHandler('category', value) // update formData.category
              }
              style={styles.pickerItemContainer}
            >
              <Picker.Item
                style={styles.pickerItemText}
                label="Men"
                value="men"
              />
              <Picker.Item
                style={styles.pickerItemText}
                label="Women"
                value="women"
              />
            </Picker>
          </View>
        </View>
        {editProduct ? (
          <CustomButton
            title="Edit Product"
            color="#f33716ff"
            onPress={() => handlerEditProduct(item.id)}
          />
        ) : (
          <CustomButton
            title="Add Product"
            color="#f33716ff"
            onPress={handlerAddProduct}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: '#f3eaeaff',
  },
  headerText: {
    fontSize: 25,
    marginVertical: 5,
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
  },
  input: {
    borderWidth: 0.5,
    borderColor: '#ecebebff',
    height: 40,
    borderRadius: 5,
    marginVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    fontSize: 17,
    color: '#363434e7',
    fontFamily: 'Roboto-Regular',
    elevation: 2,
  },
  inputFocused: {
    borderColor: '#f03919d7', // border on focus
    borderWidth: 1.2,
  },
  pickerWrapper: {
    marginBottom: 15,
    marginTop: 7,
    elevation: 1,
  },
  pickerItemContainer: {
    backgroundColor: 'white',
    height: 46,
  },
  pickerItemText: {
    fontFamily: 'Roboto-Regular',
  },
});

//make this component available to the app
export default AdminProductManageScreen;

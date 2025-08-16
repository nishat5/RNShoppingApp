//import liraries
import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
// import Swiper from 'react-native-swiper';
import Header from '../components/eCommerce/Header';
import CustomButton from '../components/eCommerce/CustomButton';
import { CartContext } from '../context/cartContext';
import QuantitySelector from '../components/eCommerce/QuantitySelector';

const { width } = Dimensions.get('window');

// create a component
const ProductDetailScreen = ({ navigation, route }) => {
  const sizes = ['S', 'M', 'L', 'XL'];
  const colors = ['gray', 'red', 'blue', 'black', 'green', 'purple'];
  const [sizeSelected, setSizeSelected] = useState(sizes[1]);
  const [colorSelected, setColorSelected] = useState(colors[0]);
  const [quantity, setQuantity] = useState(1);
  const { item } = route.params;
  const { addToCart } = useContext(CartContext);
  const addToCartHandler = item => {
    item.size = sizeSelected;
    item.color = colorSelected;
    item.quantity = quantity;
    addToCart(item);
    navigation.navigate('Cart');
  };

  // Make sure imagesUrl key is an array (fallback if only one image exists)
  // const imagesArray = Array.isArray(item.imgUrl) ? item.imgUrl : [item.imgUrl];

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header isProductDetail={true} onPress={() => navigation.goBack()} />
      </View>
      <View style={styles.imageContainer}>
        {/* <Swiper
          showsButtons={false}
          // autoplay
          dotStyle={{ backgroundColor: 'rgba(255,255,255,0.5)' }}
          activeDotStyle={{ backgroundColor: '#fff' }}
          style={{ height: 440 }}
        >
          {imagesArray.map((imgUrl, index) => (
            <Image
              key={index}
              source={{ uri: imgUrl }}
              style={styles.image}
              resizeMode="cover"
            />
          ))}
        </Swiper> */}
        <Image
          style={styles.modelImage}
          source={{
            uri: item.imgUrl,
          }}
        />
      </View>

      <View style={styles.productContainer}>
        <Text style={styles.productTitle}>{item.outfit}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
      </View>

      {/* Quantity Selector */}
      <View style={{ alignSelf: 'center' }}>
        <QuantitySelector
          detailScreen={true}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      </View>

      {/* Sizes section */}
      <Text style={styles.sizeText}>Size</Text>
      <View style={styles.sizeMainContainer}>
        {sizes.map((sizes, index) => (
          <TouchableOpacity
            key={index}
            style={styles.sizeInnerContainer}
            onPress={() => {
              setSizeSelected(sizes);
            }}
          >
            <Text
              style={[
                styles.sizeCategoryText,
                sizeSelected === sizes && {
                  color: '#f33716ff',
                },
              ]}
            >
              {sizes}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* //////colors */}

      <Text style={styles.colorText}>Colors</Text>
      <View style={styles.colorsMainContainer}>
        {colors.map((colors, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.colorsInnerContainer,
              colorSelected === colors && {
                borderColor: colorSelected,
                borderWidth: 2,
              },
            ]}
            onPress={() => {
              setColorSelected(colors);
            }}
          >
            <View
              style={[
                styles.choosenColor,
                // sizeSelected === colors && {

                // },
                { backgroundColor: colors },
              ]}
            ></View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ paddingHorizontal: 20 }}>
        <CustomButton
          title="Add To Cart"
          color="#f33716ff"
          onPress={() => {
            addToCartHandler(item);
          }}
        />
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#f3eaeaff',
  },
  headerContainer: {
    paddingHorizontal: 15,
  },
  imageContainer: {
    height: 440,
    width: width,
  },
  // image: {
  //   width: '100%',
  //   height: '100%',
  // },
  modelImage: {
    height: '100%',
    width: '100%',
  },
  productContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  productTitle: {
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
  },
  productPrice: {
    fontSize: 19,
    color: '#575555ff',
    fontWeight: '700',
    fontFamily: 'Roboto-Regular',
  },
  sizeText: {
    fontSize: 19,
    fontFamily: 'Roboto-Bold',
    paddingHorizontal: 20,
  },
  sizeMainContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 20,
    gap: 10,
  },
  sizeInnerContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: 'gray',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  sizeCategoryText: {
    fontSize: 16,
    fontWeight: '800',
    fontFamily: 'Roboto-Regular',
    textAlign: 'center',
  },

  //colors designing
  colorText: {
    fontSize: 19,
    fontFamily: 'Roboto-Bold',
    paddingHorizontal: 20,
    marginTop: 5,
  },
  colorsMainContainer: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 20,
    // marginHorizontal: 20,
    gap: 8,
  },
  colorsInnerContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderColor: 'silver',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'white',
    padding: 5,
  },
  choosenColor: {
    height: 26,
    width: 26,
    borderRadius: 13,
  },
});

//make this component available to the app
export default ProductDetailScreen;

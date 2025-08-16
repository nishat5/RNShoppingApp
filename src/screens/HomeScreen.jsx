//import liraries
import React, { useEffect, useState } from 'react';
import EvilIcons from 'react-native-vector-icons/FontAwesome';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
} from 'react-native';
import Header from '../components/eCommerce/Header';
import ProductCard from '../components/eCommerce/ProductCard';
import CategoryList from '../components/eCommerce/CategoryList';
import firestore from '@react-native-firebase/firestore';
// import { uploadProductsToFirestore } from '../Firebase/uploadProducts';

const list = ['All Products', 'Men', 'Women', 'Trending', 'Latest', 'Fashion'];
// const models = [
//   {
//     id: 1,
//     imgUrl:
//       'https://images.squarespace-cdn.com/content/v1/6204821bfe06b76898b431c5/80221678-0539-4495-8007-0096677e1eca/image00016.jpeg',
//     outfit: 'Dimen Jacket',
//     price: 99.99,
//   },
//   {
//     id: 2,
//     imgUrl:
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt-9ovRGLCdPR-CqLcskWQ54MOGMwliY1nfHABAq6q6szaQYZzcJFkh4SCgncJEu_tRYs&usqp=CAU',
//     outfit: 'Three Piece',
//     price: 169.99,
//   },
//   {
//     id: 3,
//     imgUrl:
//       'https://images.pexels.com/photos/20225051/pexels-photo-20225051/free-photo-of-portrait-of-a-handsome-man-wearing-a-brown-jacket.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
//     outfit: 'Gray Jacket',
//     price: 299.99,
//   },
//   {
//     id: 4,
//     imgUrl:
//       'https://i.pinimg.com/736x/87/ed/19/87ed191483619006d4dff5aec8660bda.jpg',
//     outfit: 'Blue Jeans',
//     price: 89.99,
//   },
//   {
//     id: 5,
//     imgUrl:
//       'https://i.pinimg.com/474x/fb/14/82/fb148238a0c5d8d1acbf150cfd33666d.jpg',
//     outfit: 'Hoody',
//     price: 69.99,
//   },
//   {
//     id: 6,
//     imgUrl:
//       'https://i.pinimg.com/736x/e8/18/55/e81855a7f792c358b1795d19abe974b7.jpg',
//     outfit: 'Track Suit',
//     price: 179.99,
//   },
//   {
//     id: 7,
//     imgUrl:
//       'https://i.pinimg.com/736x/87/ed/19/87ed191483619006d4dff5aec8660bda.jpg',
//     outfit: 'Blue Jacket',
//     price: 99.99,
//   },
//   {
//     id: 8,
//     imgUrl:
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZJOJh4KtHrdvTQWZBIKlU4ndND7Kb8mzPYpuSkCVMbLJkwB9ZjeoDQElhn9NrLoZCeGo&usqp=CAU',
//     outfit: 'Three Piece',
//     price: 69.99,
//   },
// ];

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [focusSearch, setFocusSearch] = useState(null);
  const [isSelected, setIsSelected] = useState(list[0]); //for category flatlist
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    setFlag(true);
    try {
      const unsubscribe = firestore()
        .collection('products')
        .onSnapshot(snapshot => {
          setProducts(
            snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })),
          );
        });
      setFlag(false);
      return unsubscribe;
    } catch (error) {
      Alert.alert('Error in fecthing products: ', error.message);
    }
  }, []);

  const filteredProducts = products.filter(item => {
    // console.log('filterProducts ran');
    //for search input
    const matchesSearch = item.outfit
      .toLowerCase()
      .includes(search.toLowerCase());
    //for category tabs
    const matchesCategory =
      isSelected.toLowerCase() === 'all products' ||
      isSelected.toLowerCase() === item.category;
    return matchesSearch && matchesCategory;
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {/* this() TouchableWithoutFeedback )will close keyboard and remove
               focus when user will click outside of input field */}
      <View style={styles.container}>
        {/* Fixed Header  */}
        <Header isHome={true} />
        {/* <Button title="Fetch Data" onPress={uploadProductsToFirestore} /> */}

        <Text style={styles.headrText}>Match Your Style</Text>

        {/* Search Bar */}
        <View
          style={[
            styles.inputContainer,
            focusSearch && { borderWidth: 1, borderColor: '#f33716ff' },
          ]}
        >
          <EvilIcons style={styles.logoIcon} name="search" size={25} />
          <TextInput
            style={styles.input}
            value={search}
            onFocus={() => setFocusSearch(true)}
            onBlur={() => setFocusSearch(false)}
            onChangeText={text => setSearch(text)}
            placeholder="Search"
            placeholderTextColor="gray"
          />
        </View>

        {/* Category List */}
        <View style={styles.categoryContainer}>
          <FlatList
            data={list}
            horizontal
            keyExtractor={item => item}
            renderItem={({ item }) => (
              <CategoryList
                item={item}
                isSelected={isSelected}
                setIsSelected={setIsSelected}
              />
            )}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* Scrollable Area: Product List */}
        {flag ? (
          <ActivityIndicator
            size="large"
            color="#f33716ff"
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        ) : (
          <FlatList
            data={filteredProducts}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            initialNumToRender={10} // Render fewer items at start
            windowSize={5} // Keep fewer items in memory
            removeClippedSubviews // Unmount off-screen items
            renderItem={({ item }) => {
              return (
                <ProductCard
                  item={item}
                  onPress={() => {
                    navigation.navigate('Details', { item });
                  }}
                />
              );
            }}
            contentContainerStyle={{ paddingBottom: 20 }}
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
    paddingHorizontal: 15,
    backgroundColor: '#f3eaeaff',
  },
  headrText: {
    fontSize: 28,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
  },
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 45,
    borderRadius: 25,
    borderColor: '#f9f9f9',
    alignItems: 'center',
    marginTop: 10,
    shadowColor: 'gray',
  },
  logoIcon: {
    marginHorizontal: 15,
    color: 'gray',
  },
  input: {
    flex: 1,
    fontSize: 19,
    justifyContent: 'center',
    fontFamily: 'Roboto-regular',
  },
  categoryContainer: {
    // marginVertical: 5,
    marginTop: 5,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});

//make this component available to the app
export default HomeScreen;

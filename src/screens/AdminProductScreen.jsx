//import liraries
import React, { Component, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';

// create a component
const AdminProductScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  //fetching all products directly from firestore database products collection
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('products')
      .onSnapshot(snapshot => {
        setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      {/* Button for adding new product */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ManageProductScreen');
        }}
        style={{
          marginTop: 7,
          alignSelf: 'center',
        }}
      >
        <Ionicons color="#f33716ff" name="add-circle" size={40} />
      </TouchableOpacity>

      <Text style={styles.headerText}>Admin Product Management</Text>
      <View>
        <FlatList
          data={products}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  marginVertical: 6,
                  flexDirection: 'row',
                  borderRadius: 50,
                  gap: 10,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  backgroundColor: '#f5f5f5',
                }}
              >
                <Image
                  resizeMode="cover"
                  style={{
                    width: 75,
                    height: 75,
                    borderRadius: 50,
                    borderColor: 'red',
                  }}
                  source={{
                    uri: item.imgUrl,
                  }}
                />
                <View style={{ flex: 1, justifyContent: 'center' }}>
                  <Text style={styles.text}>{item.outfit}</Text>
                  <Text style={styles.text}>${item.price}</Text>
                  <Text style={[styles.text, { color: '#f33716ff' }]}>
                    {item.category}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingRight: 10,
                    borderWidth: 0,
                    gap: 8,
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('ManageProductScreen', {
                        editProduct: true,
                        item,
                      })
                    }
                    style={{ justifyContent: 'center' }}
                  >
                    <AntDesign color="black" name="edit" size={23} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={async () => {
                      await firestore()
                        .collection('products')
                        .doc(item.id)
                        .delete();
                    }}
                    style={{ justifyContent: 'center' }}
                  >
                    <MaterialIcons
                      style={styles.logoIcon}
                      color="#f33716ff"
                      name="delete-outline"
                      size={25}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
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
    paddingHorizontal: 30,
    backgroundColor: '#f3eaeaff',
  },
  headerText: {
    fontSize: 24,
    marginBottom: 10,
    marginTop: 2,
    fontFamily: 'Roboto-Bold',
    alignSelf: 'center',
  },
  text: {
    fontSize: 17,
    fontFamily: 'Roboto-Regular',
  },
});

//make this component available to the app
export default AdminProductScreen;

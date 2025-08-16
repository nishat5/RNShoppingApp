import { createContext, useEffect, useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carts, setCarts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [cartGrandTotal, setCartGrandTotal] = useState(0);
  const [likedItems, setLikedItems] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);
  const [checkoutData, setCheckoutData] = useState(null);

  //**************************UPLOADING PART************************************************8

  useEffect(() => {
    //UPLOADING CARTS OF SPECIFIC USER TO FIRESTORE DATABASE
    const uploadCarts = async () => {
      const user = auth().currentUser; //info of login user will be fetched

      // Prevent uploading if cart is still empty (possibly during first load)
      if (carts.length === 0 || !user) return;

      if (user) {
        const userId = user.uid; //fetching current user specific id

        try {
          await firestore()
            .doc(`users/${userId}/carts/current`) // current overwrites existing cart items when user add new
            .set({ cartItems: carts });

          // console.log('Cart uploaded successfully!');
        } catch (error) {
          console.error('Error in fetching cart items: ', error);
        }
      } else {
        console.log('user not logged in.');
      }
    };
    uploadCarts();
  }, [carts]);

  useEffect(() => {
    //UPLOADING LIKED ITEMS OF SPECIFIC USER TO FIRESTORE DATABASE
    const uploadLikedItem = async () => {
      const user = auth().currentUser;
      if (likedItems.length === 0 || !user) return;

      if (user) {
        const userId = user.uid;
        try {
          await firestore()
            .doc(`users/${userId}/likedItems/current`)
            .set({ likedItems: likedItems });
          // console.log('Liked Items uploaded successfully!');
        } catch (error) {
          console.error('Error fetching liked item: ', error);
        }
      } else {
        console.log('user not logged in');
      }
    };
    uploadLikedItem();
  }, [likedItems]);

  //UPLOADING ORDER DETAILS OF SPECIFIC USER IN FIRESTORE DATABASE

  // const uploadPlacedOrder = async order => {
  //   const user = auth().currentUser;

  //   if (!order || !user) return;

  //   if (user) {
  //     const userId = user.uid; //fetching logged in user specific id
  //     try {
  //       //getting reference for order
  //       const orderRef = firestore().collection(`users/${userId}/orders`).doc();
  //       const orderId = orderRef.id;

  //       const fullOrder = {
  //         orderId,
  //         ...order,
  //         // createdAt: firestore.FieldValue.serverTimestamp(),
  //       };

  //       await orderRef.set(fullOrder);

  //       //updating carts from firestore database after user placed specific carts order

  //       await firestore().doc(`users/${userId}/carts/current`).update({
  //         cartItems: [],
  //       });

  //       //setting cart items to empty locally after user placed order
  //       setCarts([]);

  //       return fullOrder;
  //     } catch (error) {
  //       console.error('Error in uploading orders: ', error);
  //       return null;
  //     }
  //   } else {
  //     console.log('no user is logged in');
  //   }
  // };

  const uploadPlacedOrder = async order => {
    //UPLOADING ORDERS OF SPECIFIC USER AND MAKING NEW COLLECTION OF ORDERS IN FIRESTORE DATABASE
    if (!order) return;

    try {
      const user = auth().currentUser;

      //creating unique orderId
      const orderId = firestore().collection('orders').doc().id;

      const orderData = {
        orderId,
        userId: user.uid,
        userEmail: user.email,
        status: 'pending',
        createdAt: firestore.FieldValue.serverTimestamp(),
        ...order,
      };

      const globalOrdersRef = firestore().collection('orders').doc(orderId);
      await globalOrdersRef.set(orderData);

      //updating carts from firestore database after user placed specific carts order

      await firestore().doc(`users/${user.uid}/carts/current`).update({
        cartItems: [],
      });

      //setting cart items to empty locally after user placed order
      setCarts([]);

      return orderData;
    } catch (error) {
      console.error('Error in uploading orders: ', error);
      return null;
    }
  };

  //*****************************FETCHING PART************************************************************

  //FETCHING CARTS DATA OF LOGGED IN USER FROM FIRESTORE DATABASE

  const fetchCartForUser = async userId => {
    try {
      const cartsSnap = await firestore()
        .doc(`users/${userId}/carts/current`)
        .get();
      if (cartsSnap.exists) {
        setCarts(cartsSnap.data().cartItems);
      } else {
        setCarts([]); // No cart exists yet
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  //FETCHING LIKED ITEMS DATA OF LOGGED IN USER FROM FIRESTORE DATABASE

  const fetchLikedItemsForUser = async userId => {
    try {
      const likedItemSnap = await firestore()
        .doc(`users/${userId}/likedItems/current`)
        .get();

      if (likedItemSnap.exists) {
        setLikedItems(likedItemSnap.data().likedItems);
      } else {
        setLikedItems([]);
      }
    } catch (error) {
      console.error('Error in fetching likedItems: ', error);
    }
  };

  //FETCHING ORDERS DETAILS DATA OF LOGGED IN USER FROM FIRESTORE DATABASE

  const fetchingOrderDetailsForUser = async userId => {
    try {
      //fetching orders from a seperate order collection on basis of userId
      const ordersSnap = await firestore()
        .collection('orders')
        .where('userId', '==', userId) //where will find order on basis of userId, fetch orders for specific user
        .get();

      const orders = ordersSnap.docs.map(doc => ({
        ...doc.data(), // All fields inside the document below doc ID
        orderId: doc.id, // This is the auto-generated order doc ID
      }));

      if (orders) {
        setOrderDetail(orders);
      } else {
        setOrderDetail([]);
      }
    } catch (error) {
      console.error('error in fetching order details: ', error);
    }
  };

  // const STORAGE_CART_KEY = '@cartData';
  // const STORAGE_LIKED_KEY = '@likedData';

  //fetching or getting cart data store in async storage of phone

  // useEffect(() => {
  //   console.log('getMethod ascync storage');
  //   const getData = async () => {
  //     try {
  //       //fetching or getting cart data store in async storage of phone
  //       const storedData = await AsyncStorage.getItem(STORAGE_CART_KEY);
  //       if (storedData) {
  //         setCarts(JSON.parse(storedData));
  //       }

  //       //fetching or getting liked Items stored in async storage of phone
  //       const storedLikedItems = await AsyncStorage.getItem(STORAGE_LIKED_KEY);
  //       if (storedLikedItems) {
  //         setLikedItems(JSON.parse(storedLikedItems));
  //       }
  //     } catch (error) {
  //       console.error(error.message);
  //     }
  //   };
  //   getData();
  // }, []);

  // useEffect(() => {
  //   const storeData = async () => {
  //     try {
  //       //storing cart screen data into async storage
  //       await AsyncStorage.setItem(STORAGE_CART_KEY, JSON.stringify(carts));
  //       //storing liked item into async storage
  //       await AsyncStorage.setItem(
  //         STORAGE_LIKED_KEY,
  //         JSON.stringify(likedItems),
  //       );
  //     } catch (error) {
  //       console.log('ERROR<');
  //       console.error(error.message);
  //     }
  //   };
  //   storeData();
  // }, [carts, likedItems]);

  //Function which is adding products to cart screen which are added to cart in detail screen

  const addToCart = item => {
    //findIndex if conditon dont meet it returns -1, else return index of existed item,
    const itemExist = carts.findIndex(cart => cart.id === item.id);
    if (itemExist !== -1) {
      //updating carts when user again add already cart item and do changes in color quantity etc
      const updatedCartItems = carts.map(cartsItem =>
        cartsItem.id === item.id ? item : cartsItem,
      );
      setCarts(updatedCartItems);
    }
    //if item is not availabe in cart, adds up new item on  cart screen
    if (itemExist === -1) {
      setCarts([...carts, item]);
    }
  };

  //it will update cart quantity whenever user increase or decrease it (CartCard.jsx)
  const updateCartQuantity = (id, newQuantity) => {
    setCarts(prevCarts =>
      prevCarts.map(cartItem =>
        cartItem.id === id ? { ...cartItem, quantity: newQuantity } : cartItem,
      ),
    );
  };

  //Function for adding total amount and deleteing items from addToCart screen
  const addCartTotal = () => {
    const total = carts.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    setCartTotal(total);
  };

  //addgrandtotal to the orderNow screen
  const addGrandTotal = deliveryAmount => {
    const total = carts.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    setShippingCost(deliveryAmount);
    setCartGrandTotal(total + deliveryAmount);
  };

  //deleting cart items on pressing delete icon
  const deleteToCart = id => {
    const updatedCart = carts.filter(cart => cart.id !== id);
    setCarts(updatedCart);
  };

  //  UPDATE PLACE ORDER WHEN USER CANCEL IT FROM ORDER DETAILS SCREEN

  // const deleteOrder = async orderId => {
  //   try {
  //     //updating/deleting order from specific user collection from firestore database
  //     const userId = auth().currentUser.uid;
  //     const orderRef = firestore()
  //       .collection(`users/${userId}/orders`)
  //       .doc(orderId);
  //     await orderRef.delete();

  //     //updating local state
  //     setOrderDetail(prev => prev.filter(orders => orders.orderId !== orderId));
  //   } catch (error) {
  //     console.error('Error updating orders: ', error);
  //   }
  // };

  const deleteOrder = async orderId => {
    //UPDATING PLACE ORDER WHEN USER CANCEL IT FROM ORDER DETAILS SCREEN
    try {
      //updating/deleting order from specific user collection from firestore database
      const globalOrderRef = firestore().collection('orders').doc(orderId);

      //if order has been shipped, it will not delete the order
      const orderData = (await globalOrderRef.get()).data(); //fetching details of order to be deleted
      if (orderData.status === 'shipped') {
        Alert.alert(
          'Sorry',
          "Your order has been shipped. So you can't cancel now.",
        );
        return;
      }

      globalOrderRef.delete();

      //updating or deleting orders from local state
      setOrderDetail(prev => prev.filter(orders => orders.orderId !== orderId));
    } catch (error) {
      console.error('Error updating orders: ', error);
    }
  };

  //Funtion for manageing like and unlike products

  const toggleLikedItems = item => {
    const alreadyLiked = likedItems.some(i => i.id === item.id); //return TRUE any item already liked
    if (alreadyLiked) {
      setLikedItems(prev => prev.filter(i => i.id !== item.id)); //filter will remove that already like item from likeItems
    } else {
      setLikedItems(prev => [...prev, item]); //if already not liked, will add item to likeItems variable
    }
  };

  //functon on adding order details

  const addOrderDetail = async (
    carts,
    cartGrandTotal,
    deliveryAmount,
    deliveryMethod,
    paymentMethod,
    address,
  ) => {
    const order = {
      orderCreation: Date().toLocaleString(),
      productDetails: carts,
      shippingCost: deliveryAmount,
      grandTotal: cartGrandTotal,
      deliveryMethod,
      paymentMethod,
      address,
    };

    // Upload and get full order (with ID and timestamp)
    const uploadedOrder = await uploadPlacedOrder(order);

    if (uploadedOrder) {
      setOrderDetail(prev => [...prev, uploadedOrder]); // Now includes orderId immediately
    }
  };

  return (
    <CartContext.Provider
      value={{
        carts,
        cartTotal,
        cartGrandTotal,
        likedItems,
        shippingCost,
        orderDetail,
        checkoutData,
        setCarts,
        setLikedItems,
        setOrderDetail,
        setCheckoutData,
        addToCart,
        addCartTotal,
        addGrandTotal,
        deleteToCart,
        deleteOrder,
        toggleLikedItems,
        updateCartQuantity,
        fetchCartForUser,
        fetchLikedItemsForUser,
        addOrderDetail,
        fetchingOrderDetailsForUser,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { createContext, useState, useEffect, useContext } from 'react';
import { CartContext } from './cartContext';
import firestore from '@react-native-firebase/firestore';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //if user will register and verified then user value will be updated from Null --> TRUE
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const {
    setCarts,
    setLikedItems,
    setOrderDetail,
    fetchCartForUser,
    fetchLikedItemsForUser,
    fetchingOrderDetailsForUser,
  } = useContext(CartContext);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async currentUser => {
      setUser(currentUser);
      if (currentUser) {
        // **************Fetching role from Firestore database when user login******************
        const userDoc = await firestore()
          .collection('allusers')
          .doc(currentUser.uid)
          .get();
        setRole(userDoc.data()?.role || 'user');
        // New user logged in , fetch that user cart, likeditems, orders
        await fetchCartForUser(currentUser.uid);
        await fetchLikedItemsForUser(currentUser.uid);
        await fetchingOrderDetailsForUser(currentUser.uid);
      } else {
        setRole(null);
        // User logged out , clear cart,likedItems, orderDetails from state
        setCarts([]);
        setLikedItems([]);
        setOrderDetail([]);
      }

      if (initializing) setInitializing(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, setRole, setUser }}>
      {!initializing ? children : null}
    </AuthContext.Provider>
  );
};

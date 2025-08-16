import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import AddCartScreen from '../screens/AddCartScreen';
import OrderNowScreen from '../screens/OrderNowScreen';
import PaymentWebViewScreen from '../screens/PaymentWebViewScreen';
import ConfirmOrderScreen from '../screens/ConfirmOrderScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'fade', // animation type
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Details" component={ProductDetailScreen} />
      <Stack.Screen name="Cart" component={AddCartScreen} />
      <Stack.Screen name="OrderNow" component={OrderNowScreen} />
      <Stack.Screen name="ConfirmOrderScreen" component={ConfirmOrderScreen} />
      <Stack.Screen
        name="PaymentWebViewScreen"
        component={PaymentWebViewScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;

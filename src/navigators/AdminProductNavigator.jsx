import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminProductScreen from '../screens/AdminProductScreen';
import AdminProductManageScreen from '../screens/AdminManageProductScreen';

const Stack = createNativeStackNavigator();

const AdminProductNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animation: 'fade', // animation type
        headerShown: false,
      }}
    >
      <Stack.Screen name="ProductScreen" component={AdminProductScreen} />
      <Stack.Screen
        name="ManageProductScreen"
        component={AdminProductManageScreen}
      />
    </Stack.Navigator>
  );
};

export default AdminProductNavigator;

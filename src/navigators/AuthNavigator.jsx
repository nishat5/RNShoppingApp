import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthRegister from '../screens/AuthRegister';
import AuthLogin from '../screens/AuthLogin';
import AuthResetPassword from '../screens/AuthResetPassword';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          animation: 'fade', // animation type
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={AuthLogin} />
        <Stack.Screen name="Register" component={AuthRegister} />
        <Stack.Screen name="Reset" component={AuthResetPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;

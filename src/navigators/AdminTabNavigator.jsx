import { View, Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AdminManageOrderScreen from '../screens/AdminManageOrderScreen';
import AdminLogoutScreen from '../screens/AdminLogoutScreen';
import AdminProductNavigator from './AdminProductNavigator';

const Tab = createBottomTabNavigator();

const AdminTabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarShowLabel: true,
          tabBarLabelStyle: { fontSize: 12, fontFamily: 'Roboto-Bold' },
          tabBarStyle: {
            height: 66,
            backgroundColor: '#eeeef1ff',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            paddingBottom: 15,
            paddingTop: 5,
            elevation: 5,
          },
          tabBarActiveTintColor: '#f33716ff',
          tabBarInactiveTintColor: '#615b5bff',
        }}
      >
        <Tab.Screen
          name="Manage_Products"
          component={AdminProductNavigator}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                color={color}
                name={focused ? 'bag' : 'bag-outline'}
                size={size}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Manage_Orders"
          component={AdminManageOrderScreen}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <Octicons
                color={color}
                name={focused ? 'package' : 'package'}
                size={size}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Admin_Logout"
          component={AdminLogoutScreen}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <Icon
                name={focused ? 'person' : 'person-outline'}
                size={27}
                color={color}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AdminTabNavigator;

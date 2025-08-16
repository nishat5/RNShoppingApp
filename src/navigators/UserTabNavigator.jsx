import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CartContext } from '../context/cartContext';
import { View, Text } from 'react-native';
import FavouriteScreen from '../screens/FavouriteScreen';
import HomeNavigator from './HomeNavigator';
import AddCartScreen from '../screens/AddCartScreen';
import UserScreen from '../screens/UserScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
// import MaterialDesignIcons from 'react-native-vector-icons/MaterialDesignIcons';

const Tab = createBottomTabNavigator();

const UserTabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarShowLabel: true,
          tabBarLabelStyle: { fontSize: 13, fontFamily: 'Roboto-Bold' },
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
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeNavigator}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <Octicons
                color={color}
                name={focused ? 'home' : 'home'}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Favourite"
          component={FavouriteScreen}
          options={{
            tabBarIcon: ({ color, size, focused }) => (
              <FontAwesome
                color={color}
                name={focused ? 'heart' : 'heart-o'}
                size={size}
              />
            ),
          }}
        />

        <Tab.Screen
          name="Cart"
          component={AddCartScreen}
          options={{
            tabBarIcon: ({ color, size, focused }) => {
              const { carts } = useContext(CartContext);
              return (
                <View style={{ position: 'relative' }}>
                  <Icon
                    name={focused ? 'cart' : 'cart-outline'}
                    size={28}
                    color={color}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      top: -5,
                      right: -16,
                      width: 18,
                      height: 18,
                      borderRadius: 14,
                      backgroundColor: '#f33716ff',
                    }}
                  >
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 12,
                        color: 'white',
                        fontWeight: '700',
                      }}
                    >
                      {carts?.length}
                    </Text>
                  </View>
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name="Orders"
          component={OrderDetailsScreen}
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
          name="User"
          component={UserScreen}
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

export default UserTabNavigator;

// //import liraries
import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import { AuthContext } from '../context/authContext';
import UserTabNavigator from '../navigators/UserTabNavigator';
import AuthNavigator from '../navigators/AuthNavigator';
import SplashScreen from 'react-native-splash-screen';
import AdminTabNavigator from '../navigators/AdminTabNavigator';

// create a component
const AppContent = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const { user, role } = useContext(AuthContext);

  //on first render, if both user and role are null then it will show activity indicator
  //this will avoid me from showing flicker of userNavigator on admin login
  if (user && role === null) {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor="#f3eaeaff"
          hidden={false}
          translucent={true}
        />
        <ActivityIndicator
          color="#f33716ff"
          size="large"
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor="#f3eaeaff"
        hidden={false}
        translucent={true}
      />

      {/* {user && user.emailVerified ? <UserTabNavigator /> : <AuthNavigator />} */}

      {!user || !user.emailVerified ? (
        <AuthNavigator />
      ) : role === 'admin' ? (
        <AdminTabNavigator />
      ) : (
        <UserTabNavigator />
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#f3eaeaff',
  },
});

//make this component available to the app
export default AppContent;

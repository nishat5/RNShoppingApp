//import liraries
import React, { Component, useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { loginUser } from '../services/auth';
import Input from '../components/eCommerce/Input';
import { AuthContext } from '../context/authContext';

// create a component
const AuthLogin = ({ navigation }) => {
  const { setUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState({
    email: '',
    password: '',
  });

  const [flag, setFlag] = useState(false);
  const [focusedInput, setFocusedInput] = useState(false);

  const onChangeHandler = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value.trim() }));
    setError(prev => ({ ...prev, [key]: '' })); //clear particular input errror when user write something in it
  };

  const handleLogin = async () => {
    let valid = true;
    const newErrors = {
      email: '',
      password: '',
    };

    if (!formData.email) {
      newErrors.email = 'Please enter your email';
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Please enter your password';
      valid = false;
    }

    if (!valid) {
      setError(newErrors);
      return;
    }

    try {
      setFlag(true);
      //emailVerified is returning  value TRUE, if firebase database already have entered email and pswd
      const { user } = await loginUser(formData.email, formData.password);

      if (user.emailVerified) {
        setFlag(false);
        setUser(user); //authContext , used to avoid stuck on auth screen
        Alert.alert('Success', 'You have logged in, sucessfully!');
        setFormData({
          email: '',
          password: '',
        });
      } else if (!user.emailVerified) {
        setFlag(false);
        Alert.alert('Error', 'Email is not verified.');
        setFormData({
          email: '',
          password: '',
        });
        setError({
          email: '',
          password: '',
        });
      }
    } catch (error) {
      setFlag(false);
      const newErrors = {
        email: '',
        password: '',
      };
      if (error.code === 'auth/wrong-password') {
        newErrors.password = 'Incorrect Password';
      } else if (error.code === 'auth/user-not-found') {
        newErrors.email = 'User not found!';
      } else if (error.code === 'auth/invalid-credential') {
        newErrors.email = 'Invalid Credentials';
        newErrors.password = 'Invalid Credentials';
      } else {
        Alert.alert('Login Error: ', error.message); //catch all other issues
      }

      setError(newErrors);
      // Alert.alert(
      //   'Error',
      //   'Error Occured in logging in with email, password of user!',
      // );
      setFormData({
        email: '',
        password: '',
      });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {/* this() TouchableWithoutFeedback )will close keyboard and
         remove focus when user will click outside of input field */}
        <View style={styles.formContainer}>
          <Image
            source={require('../assets/logo3.png')}
            style={{
              width: 140,
              height: 140,
              marginHorizontal: 'auto',
            }}
          />
          <Text style={styles.headerText}>User Login</Text>

          <View>
            <Input
              value={formData.email}
              onChangeText={value => {
                onChangeHandler('email', value);
              }}
              placeholder="Enter Email"
              autoCapitalize="none"
              keyboardType="email-address"
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput(false)}
              focusedInput={focusedInput === 'email'}
              error={error.email}
              isEmail={true}
            />

            <Input
              value={formData.password}
              onChangeText={value => {
                onChangeHandler('password', value);
              }}
              placeholder="Enter Password"
              autoCapitalize="none"
              keyboardType="default"
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(false)}
              focusedInput={focusedInput === 'password'}
              error={error.password}
              isPassword={true}
            />

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleLogin}
            >
              {flag ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{ marginTop: 20, alignSelf: 'center' }}
            onPress={() => navigation.navigate('Reset')}
          >
            <Text style={styles.forgotPswdText}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: 10, alignSelf: 'center' }}
            onPress={() => {
              navigation.navigate('Register');
              setError({
                email: '',
                password: '',
              });
            }}
          >
            <Text style={styles.clickRegisterText}>
              Click Here To Register!
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3eaeaff',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 5,
    paddingHorizontal: 25,
  },
  headerText: {
    fontSize: 29,
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'Roboto-Bold',
  },
  buttonContainer: {
    paddingVertical: 11,
    backgroundColor: '#f33716ff',
    borderRadius: 5,
    marginTop: 15,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',

    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  forgotPswdText: {
    alignSelf: 'center',
    fontSize: 17,
    textDecorationLine: 'underline',
    fontFamily: 'Roboto-Regular',
  },
  clickRegisterText: {
    fontSize: 19,
    marginTop: 5,
    color: '#f33716ff',
    fontFamily: 'Roboto-Bold',
  },
});

//make this component available to the app
export default AuthLogin;

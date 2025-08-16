//import liraries
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { registerUser } from '../services/auth';
import Input from '../components/eCommerce/Input';

// create a component
const AuthRegister = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState({
    //for setting errors on form submissions
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [flag, setFlag] = useState(false);
  const [focusedInput, setFocusedInput] = useState(false);

  const onChangeHandler = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value.trim() }));
    setError(prev => ({ ...prev, [key]: '' }));
    // Clear error on typing in particular input
  };

  const handleRegister = async () => {
    let valid = true;
    const newErrors = {
      email: '',
      password: '',
      confirmPassword: '',
    };

    // Basic validations

    if (!formData.email) {
      newErrors.email = 'Please Enter Your Email';
      valid = false;
    }
    if (!formData.password) {
      newErrors.password = 'Please Enter Your Password';
      valid = false;
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please Enter Your Password';
      valid = false;
    }

    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Password doesn't matched";
      valid = false;
    }

    if (!valid) {
      setError(newErrors);
      return;
    }

    try {
      setFlag(true);
      await registerUser(formData.email, formData.password);
      setFlag(false);
      Alert.alert('User Added, Verification email is sent to your email!');
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
      });
      setError({
        email: '',
        password: '',
        confirmPassword: '',
      });
      navigation.navigate('Login');
    } catch (error) {
      const newErrors = {
        email: '',
        password: '',
        confirmPassword: '',
      };

      switch (error.code) {
        case 'auth/email-already-in-use':
          newErrors.email =
            'This email is already in use. Please use a different email address';
          break;

        case 'auth/invalid-email':
          newErrors.email = 'Invalid Email Address';
          break;

        case 'auth/weak-password':
          newErrors.password =
            'Password is too weak, Please use at least 6 characters';
          break;

        default:
          Alert.alert('Registration Error', 'An unknown error occurred.');
          break;
      }
      setError(newErrors);
      setFlag(false);
    }
    //  catch (error) {
    //   Alert.alert('Error registering user: ', error.message);
    //   setFlag(false);
    // }
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {/* this() TouchableWithoutFeedback )will close keyboard and remove
         focus when user will click outside of input field */}
        <View style={styles.formContainer}>
          <Image
            source={require('../assets/logo3.png')}
            style={{
              width: 140,
              height: 140,
              marginHorizontal: 'auto',
            }}
          />
          <Text style={styles.headerText}>User Signup</Text>
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
              // secureTextEntry={true}
              placeholder="Enter Password"
              autoCapitalize="none"
              keyboardType="default"
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput(false)}
              focusedInput={focusedInput === 'password'}
              error={error.password}
              isPassword={true}
            />

            <Input
              value={formData.confirmPassword}
              onChangeText={value => {
                onChangeHandler('confirmPassword', value);
              }}
              // secureTextEntry={true}
              placeholder="Confirm Your Password"
              autoCapitalize="none"
              keyboardType="default"
              onFocus={() => setFocusedInput('confirmPassword')}
              onBlur={() => setFocusedInput(false)}
              focusedInput={focusedInput === 'confirmPassword'}
              error={error.confirmPassword}
              isConfirmPassword={true}
            />

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleRegister}
            >
              {flag ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.buttonText}>Register</Text>
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{ marginTop: 20, alignSelf: 'center' }}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.wantLoginText}>Want to Login?</Text>
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
    // fontWeight: 'bold',
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
    // fontWeight: '500',
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  wantLoginText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#f33716ff',
    fontFamily: 'Roboto-Bold',
  },
});

//make this component available to the app
export default AuthRegister;

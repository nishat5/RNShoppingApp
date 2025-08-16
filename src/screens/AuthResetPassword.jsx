//import liraries
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { resetUserPassword } from '../services/auth';
import Input from '../components/eCommerce/Input';

// create a component
const AuthResetPassword = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: '',
  });

  const [error, setError] = useState('');

  const [flag, setFlag] = useState(false);
  const [focusedInput, setFocusedInput] = useState(false);

  const onChangeHandler = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value.trim() }));
  };

  const handleResetPassword = async () => {
    if (!formData.email) {
      setError('Please enter your email address');
      return;
    }
    try {
      setFlag(true);
      await resetUserPassword(email);
      setFlag(false);
      Alert.alert('Success!', 'Password reset link sent to your email address');
      setFormData({
        email: '',
      });
    } catch (error) {
      Alert.alert('Error: ', error.message);
      setFlag(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {/* this() TouchableWithoutFeedback )will close keyboard and remove focus
         when user will click outside of input field */}
        <View style={styles.formContainer}>
          <Image
            source={require('../assets/logo3.png')}
            style={{
              width: 140,
              height: 140,
              marginHorizontal: 'auto',
            }}
          />
          <Text style={styles.headerText}>Reset Password</Text>
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
              error={error}
              isEmail={true}
            />

            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={handleResetPassword}
            >
              {flag ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text style={styles.buttonText}>Reset Password</Text>
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{ marginTop: 20, alignSelf: 'center' }}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.backLoginText}>Go back to Login</Text>
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
    letterSpacing: 0.5,
    // fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Roboto-Bold',
  },
  buttonContainer: {
    paddingVertical: 11,
    backgroundColor: '#f33716ff',
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  backLoginText: {
    textAlign: 'center',
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    color: '#f33716ff',
  },
});

//make this component available to the app
export default AuthResetPassword;

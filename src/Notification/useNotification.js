import { useEffect } from 'react';
import { PermissionsAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging';

const userRequestPermisson = async () => {
  const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  );
  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    console.log('Notification permission granted');
  } else {
    console.log('Notification permission denied');
  }
};

const getToken = async () => {
  try {
    const token = await messaging().getToken();
    console.log('FCM TOKEN: ', token);
  } catch (error) {
    console.log('FCM TOKEN ERROR: ', token);
  }
};

export const userNotification = () => {
  useEffect(() => {
    userRequestPermisson();
    getToken();
  }, []);
};

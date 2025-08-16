// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAI614JDGb2MNM08m0ZfkqS-flsAcRNCUY',
  authDomain: 'shoppingapp-17fbe.firebaseapp.com',
  projectId: 'shoppingapp-17fbe',
  storageBucket: 'shoppingapp-17fbe.appspot.com',
  messagingSenderId: '367124762504',
  appId: '1:367124762504:android:421fc4d81a55c12e9a743d',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

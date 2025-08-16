import auth from '@react-native-firebase/auth';
import firestore, { FieldValue } from '@react-native-firebase/firestore';

export const registerUser = async (email, password) => {
  const userCredentials = await auth().createUserWithEmailAndPassword(
    //creating user in firebase with email and pswd
    email,
    password,
  );
  const user = auth().currentUser; //takes current who have registered and sent verfication mail to it

  // ***************creating user document with default role***************************
  const userId = user.uid;
  await firestore().collection('allusers').doc(userId).set({
    userId,
    email,
    role: 'user', // default role for normal users
    createdAt: firestore.FieldValue.serverTimestamp(),
  });

  if (user && !user.emailVerified) {
    await user.sendEmailVerification();
  }
  return userCredentials.user;
};

export const loginUser = async (email, password) => {
  const userCredentials = await auth().signInWithEmailAndPassword(
    email,
    password,
  );
  const user = userCredentials.user;
  await user.reload(); //  important to refresh emailVerified status
  return { user, emailVerified: user.emailVerified }; //if email is verfied, return emailverified === TRUE
};

export const resetUserPassword = async email => {
  try {
    await auth().sendPasswordResetEmail(email);
  } catch (error) {
    let errorMessage;
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage = 'This user does not exist';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Invalid Email address';
        break;
      case 'auth/invalid-credential':
        errorMessage = 'Invalid Credentials';
        break;
      default:
        errorMessage = 'An knowon error occurred';
    }
    throw new Error(errorMessage);
  }
};

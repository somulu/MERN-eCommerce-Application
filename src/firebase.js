import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyA48_pMNLn-ngiLbtp9adJ23MRKk0KNKxA',
  authDomain: 'mern-ecommerce-93137.firebaseapp.com',
  projectId: 'mern-ecommerce-93137',
  storageBucket: 'mern-ecommerce-93137.appspot.com',
  messagingSenderId: '1038670604549',
  appId: '1:1038670604549:web:f9c1223c55fbdfc4306f6c',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

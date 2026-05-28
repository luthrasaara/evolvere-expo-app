// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { initializeAuth, getReactNativePersistence } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
// import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBEPI4K4ONlGGwhG2cnoEVTeJ_G-kHu6TU",
//   authDomain: "evolvere-expo.firebaseapp.com",
//   projectId: "evolvere-expo",
//   storageBucket: "evolvere-expo.firebasestorage.app",
//   messagingSenderId: "258319414488",
//   appId: "1:258319414488:web:5a093b6739dab3687b93ad",
//   measurementId: "G-93QN96YBPD"
// };


// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// export const auth = initializeAuth(app,
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// );
// const analytics = getAnalytics(app);
// export const auth = getAuth(app);

// firebase/config.ts

import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore"

import {
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBEPI4K4ONlGGwhG2cnoEVTeJ_G-kHu6TU',
  authDomain: 'evolvere-expo.firebaseapp.com',
  projectId: 'evolvere-expo',
  storageBucket: 'evolvere-expo.firebasestorage.app',
  messagingSenderId: '258319414488',
  appId: '1:258319414488:web:5a093b6739dab3687b93ad',
  measurementId: 'G-93QN96YBPD',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export default app;


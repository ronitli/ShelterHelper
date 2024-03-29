
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
  } from "firebase/auth";

import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc
  } from "firebase/firestore";
 

const firebaseConfigAndroid = {
  apiKey: 'AIzaSyA3finvrEOoIEm0kIQ-bTPgUjxLwHMkNGA',
  authDomain: 'test-78257.firebaseapp.com',
  databaseURL: 'https://test-78257.firebaseio.com',
  projectId: 'test-78257',
  storageBucket: 'test-78257.appspot.com',
  messagingSenderId: '650377746192',
  appId: '1:650377746192:android:9ad7ef484609e6159d7795',
};

const firebaseConfigIOS = {
  apiKey: 'AIzaSyA3finvrEOoIEm0kIQ-bTPgUjxLwHMkNGA',
  authDomain: 'test-78257.firebaseapp.com',
  databaseURL: 'https://test-78257.firebaseio.com',
  projectId: 'test-78257',
  storageBucket: 'test-78257.appspot.com',
  messagingSenderId: '650377746192',
  appId: '1:650377746192:ios:6cb85db0352e30079d7795',
};
// const iosApp= initializeApp(firebaseConfigIOS);
// console.log({iosApp});
// const auth = getAuth(iosApp);
// console.log({auth});

const androidApp= initializeApp(firebaseConfigAndroid);
console.log({androidApp});
const auth = getAuth(androidApp);
console.log({auth});
const db = getFirestore(androidApp);
const storage = getStorage(androidApp);

// export default firebase;
export {
  auth,
  db,
  storage,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  addDoc,
  collection,
};
// fg

export const a = 5;
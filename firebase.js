// // import firebase from 'firebase/app';
// // import 'firebase/auth';
// // import 'firebase/database';
// // import 'firebase/storage';
// import * as firebase from "firebase";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


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

// export default firebase;
export {
  auth,
  signInWithEmailAndPassword  
};
// fg

export const a = 5;
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

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


firebase.initializeApp(firebaseConfigAndroid);
firebase.initializeApp(firebaseConfigIOS);

export default firebase;

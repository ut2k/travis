import firebase from 'firebase/app';
import 'firebase/database';
import apiKey from './api-key';

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: "boar-d6042.firebaseapp.com",
  databaseURL: "https://boar-d6042.firebaseio.com",
  projectId: "boar-d6042",
  storageBucket: "boar-d6042.appspot.com",
  messagingSenderId: "97299538707",
  appId: "1:97299538707:web:232705d5421931947770e6",
  measurementId: "G-6C5XDWMN1Z"
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.database().ref();
import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDfmgY9F8ms-PTeDATk0GKOQtA63VueGwc",
  authDomain: "nu-hiit.firebaseapp.com",
  databaseURL: "https://nu-hiit.firebaseio.com",
  projectId: "nu-hiit",
  storageBucket: "nu-hiit.appspot.com",
  messagingSenderId: "719477044477",
  appId: "1:719477044477:web:f2347fc0247c9e3190ba94",
  measurementId: "G-ZLZB3V2C2V"
};

firebase.initializeApp(firebaseConfig);
const firebaseDb = firebase.database().ref()

export { firebaseDb , firebase};

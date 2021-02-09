import firebase from 'firebase';
//initializing firebase with the firebase object
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAvFrHohHSpW4jR71uqBPINh9r82--TwK8",
  authDomain: "facebook-messanger-clone-7732f.firebaseapp.com",
  databaseURL: "https://facebook-messanger-clone-7732f-default-rtdb.firebaseio.com",
  projectId: "facebook-messanger-clone-7732f",
  storageBucket: "facebook-messanger-clone-7732f.appspot.com",
  messagingSenderId: "413027830984",
  appId: "1:413027830984:web:7f16710efabff80e88a9fd",
  measurementId: "G-MKT7DRM3BN"
});
//creating a virtual db that stays sync with the actual db in firebase and
const db = firebaseApp.firestore();

export default db;
// Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyADQZnuTgTqArDFjjFGyRV3XYYJqW72x8w",
  authDomain: "birthday-app-c3e16.firebaseapp.com",
  databaseURL: "https://birthday-app-c3e16-default-rtdb.firebaseio.com",
  projectId: "birthday-app-c3e16",
  storageBucket: "birthday-app-c3e16.firebasestorage.app",
  messagingSenderId: "491285432590",
  appId: "1:491285432590:web:585be0343e9f3c9474af5f",
  measurementId: "G-HD7C4HR6H5"
};

/*
INITIALIZATION HAPPENS HERE
  This runs as soon as config.js is loaded
*/
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

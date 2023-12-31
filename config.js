import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

export const firebaseConfig = {
    apiKey: "AIzaSyCR7nZBPUgN8Y8Qs3iiDCYwZqKMOJczskg",
    authDomain: "musicpjandroid.firebaseapp.com",
    databaseURL: "https://musicpjandroid-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "musicpjandroid",
    storageBucket: "musicpjandroid.appspot.com",
    messagingSenderId: "136458080681",
    appId: "1:136458080681:web:6c35977cc1db39f8d974b8",
    measurementId: "G-H19WS5YB30"
  };
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
  }
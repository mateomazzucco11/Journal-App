import 'firebase/firestore';
import 'firebase/auth';

import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFHvNp7tAL0GLUOWv-PevwXTdKKRp53M0",
  authDomain: "journal-fernando.firebaseapp.com",
  projectId: "journal-fernando",
  storageBucket: "journal-fernando.appspot.com",
  messagingSenderId: "102337862600",
  appId: "1:102337862600:web:f9cfa8a93d8a37ca4efefd"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();
const googleAuthProvider = new GoogleAuthProvider();

export{
  db,
  googleAuthProvider
}
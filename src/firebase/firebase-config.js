import 'firebase/firestore';
import 'firebase/auth';

import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const {REACT_API_KEY, REACT_API_ID, REACT_AUTH_DOMAIN, REACT_PROJECT_ID, REACT_STORAGE_BUCKET, REACT_MESSAGING_SENDER_ID} = process.env

const firebaseConfig = {
  apiKey: REACT_API_KEY,
  authDomain: REACT_AUTH_DOMAIN,
  projectId: REACT_PROJECT_ID,
  storageBucket: REACT_STORAGE_BUCKET,
  messagingSenderId: REACT_MESSAGING_SENDER_ID,
  appId: REACT_API_ID
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();
const googleAuthProvider = new GoogleAuthProvider();

export{
  db,
  googleAuthProvider
}
import 'firebase/firestore';
import 'firebase/auth';

import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
const {REACT_APP_API_KEY, REACT_APP_API_ID, REACT_APP_AUTH_DOMAIN, REACT_APP_PROJECT_ID, REACT_APP_STORAGE_BUCKET, REACT_APP_MESSAGING_SENDER_ID} = process.env

const firebaseConfig = {
  apiKey: REACT_APP_API_KEY,
  authDomain: REACT_APP_AUTH_DOMAIN,
  projectId: REACT_APP_PROJECT_ID,
  storageBucket: REACT_APP_STORAGE_BUCKET,
  messagingSenderId: REACT_APP_MESSAGING_SENDER_ID,
  appId: REACT_APP_API_ID
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getFirestore();
const googleAuthProvider = new GoogleAuthProvider();

export{
  db,
  googleAuthProvider
}
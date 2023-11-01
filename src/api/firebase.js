// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFysd1gMQMXEvSSYd420spPnsK4VC3q2Q",
  authDomain: "my-unburden-diary.firebaseapp.com",
  databaseURL: "https://my-unburden-diary-default-rtdb.firebaseio.com",
  projectId: "my-unburden-diary",
  storageBucket: "my-unburden-diary.appspot.com",
  messagingSenderId: "795510681712",
  appId: "1:795510681712:web:efa66a273b6eb5a18a04b5",
  measurementId: "G-19N5KS4Y31"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);
export const dbFirestore = getFirestore(app);
export const auth = getAuth(app);
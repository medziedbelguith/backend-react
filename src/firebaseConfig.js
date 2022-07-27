import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBSN_An0or5hREU9j9XpKHJT_lO2rEgtWI",
  authDomain: "fir-frontend-18e59.firebaseapp.com",
  projectId: "fir-frontend-18e59",
  storageBucket: "fir-frontend-18e59.appspot.com",
  messagingSenderId: "315402586893",
  appId: "1:315402586893:web:717944d206d0148e6a7e44"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
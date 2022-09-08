import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBCcgejzv4f97uqlKKRiHKy8NsCwVscigM",
  authDomain: "asra-jsi-dewas.firebaseapp.com",
  databaseURL: "https://asra-jsi-dewas-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "asra-jsi-dewas",
  storageBucket: "asra-jsi-dewas.appspot.com",
  messagingSenderId: "579903285002",
  appId: "1:579903285002:web:cd305ed232cdf9618a3cf3"
};

const app = initializeApp(firebaseConfig);

export const firebasedatabase = getDatabase(app)
export const firebaseAuth = getAuth(app)
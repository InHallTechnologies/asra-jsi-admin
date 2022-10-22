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


const firebaseConfig_Guna = {
  apiKey: "AIzaSyCbXX9OBKk3vrzfsezmhpQ-SLdK91AKWps",
  authDomain: "asra-jsi-guna.firebaseapp.com",
  databaseURL: "https://asra-jsi-guna-default-rtdb.firebaseio.com",
  projectId: "asra-jsi-guna",
  storageBucket: "asra-jsi-guna.appspot.com",
  messagingSenderId: "72852126783",
  appId: "1:72852126783:web:4bcc699f39bc6d305bcc8a"
};

const firebaseConfig_RajGarh = {
  apiKey: "AIzaSyCTXdU7pjmVg_HCmzNG7COf8NAzZJ47wSw",
  authDomain: "asra-jsi-rajgarh.firebaseapp.com",
  databaseURL: "https://asra-jsi-rajgarh-default-rtdb.firebaseio.com",
  projectId: "asra-jsi-rajgarh",
  storageBucket: "asra-jsi-rajgarh.appspot.com",
  messagingSenderId: "610983214296",
  appId: "1:610983214296:web:99a1e085f01fc6fe03ebad",
  measurementId: "G-346VSGQ052"
};


const GunaApp = initializeApp(firebaseConfig_Guna, "Guna");
const RajGarhApp = initializeApp(firebaseConfig_RajGarh, "RajGarh");
const app = initializeApp(firebaseConfig, "Dewas");



export const firebasedatabase = getDatabase(app)
export const GunaDatabase = getDatabase(GunaApp);
export const RajGarhDatabase = getDatabase(RajGarhApp);

export const firebaseAuth = getAuth(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_6exTDJb4nSa2vQoppfybzCqpEsVcrao",
  authDomain: "medicalservices-eef24.firebaseapp.com",
  projectId: "medicalservices-eef24",
  storageBucket: "medicalservices-eef24.firebasestorage.app",
  messagingSenderId: "409902149284",
  appId: "1:409902149284:web:6ff2029e3dc0e8afb20031"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase;
const auth = initializeAuth(appFirebase, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
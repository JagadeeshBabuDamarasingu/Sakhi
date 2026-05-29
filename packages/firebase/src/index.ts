import { getApp, getApps, initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBkmcVQsgTXcC5Emf0OH9gNvBsKcWcYOCE",
  authDomain: "nari-shakthi-dev.firebaseapp.com",
  projectId: "nari-shakthi-dev",
  storageBucket: "nari-shakthi-dev.firebasestorage.app",
  messagingSenderId: "504626026587",
  appId: "1:504626026587:web:c73e329b94fa7b27b7477e",
  measurementId: "G-WPF3DPEZ0Z"
};

export const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);

export { getAuth } from "firebase/auth";
export { getFirestore } from "firebase/firestore";
export { getStorage } from "firebase/storage";

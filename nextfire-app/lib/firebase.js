import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBBy_z03do36M31Ugx-3jHkrbgtZTHcUAc",
  authDomain: "firebasics-dzr.firebaseapp.com",
  projectId: "firebasics-dzr",
  storageBucket: "firebasics-dzr.appspot.com",
  messagingSenderId: "753966254127",
  appId: "1:753966254127:web:6ca3c6290d7face56adeda",
  measurementId: "G-H70LT7J7LH",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const db = getFirestore(app);

export const storage = getStorage(app);

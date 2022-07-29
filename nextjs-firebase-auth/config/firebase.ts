// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAF1yU4uvoO5SAgNHf_hiESqAjXXJTQ1VI",
  authDomain: "nextjs-firebase-auth-1d0f5.firebaseapp.com",
  projectId: "nextjs-firebase-auth-1d0f5",
  storageBucket: "nextjs-firebase-auth-1d0f5.appspot.com",
  messagingSenderId: "5852130536",
  appId: "1:5852130536:web:7f6644324047380f8a2d5d",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const auth = getAuth();

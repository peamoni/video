// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFunctions, httpsCallable } from "firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDU5tyzR_MIwwS9h8rhA3cqLP-duoHMkgI",
  authDomain: "videomoni-2a6cf.firebaseapp.com",
  projectId: "videomoni-2a6cf",
  storageBucket: "videomoni-2a6cf.appspot.com",
  messagingSenderId: "474809864317",
  appId: "1:474809864317:web:4f436cf19677ba5be52114",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const functions = getFunctions(app, "europe-west1");

const renderVideo = httpsCallable(functions, "render");

export { auth, renderVideo };

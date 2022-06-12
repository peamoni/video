// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import {
  connectFunctionsEmulator,
  getFunctions,
  httpsCallable,
} from "firebase/functions";
import { Render } from "./model/types";

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
const db = getFirestore(app);
const functions = getFunctions(app, "europe-west1");

const renderVideo = httpsCallable(functions, "render");
const downloadVideo = httpsCallable(functions, "download");

let getDownloadVideoLink = (uid: string) =>
  `https://europe-west1-${firebaseConfig.projectId}.cloudfunctions.net/video?uid=${uid}`;

if (false) {
  connectFunctionsEmulator(functions, "localhost", 5001);
  getDownloadVideoLink = (uid: string) =>
    `http://localhost:5001/${firebaseConfig.projectId}/europe-west1/video?uid=${uid}`;
}

// get renders from firestores
const getRenders = async (author: string): Promise<any> => {
  const q = query(collection(db, "renders"), where("author_id", "==", author));

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => {
    return { ...doc.data(), uid: doc.id } as Render;
  });
};

export { auth, renderVideo, getRenders, downloadVideo, getDownloadVideoLink };

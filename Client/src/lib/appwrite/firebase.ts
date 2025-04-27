import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBU-Dy-b4wfit1vXddGzkDsJ9GnrFE0ZGw",
  authDomain: "posts-6ff7f.firebaseapp.com",
  databaseURL: "https://posts-6ff7f-default-rtdb.firebaseio.com",
  projectId: "posts-6ff7f",
  storageBucket: "posts-6ff7f.firebasestorage.app",
  messagingSenderId: "744899162167",
  appId: "1:744899162167:web:f212a8cd0abaf0bc014fb2",
  measurementId: "G-R6LCK83M8L",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
const analytics = getAnalytics(app);

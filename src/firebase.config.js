import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCpNEHXnON1WgjFKfGfUEt7zs1HFQHSwqY",
  authDomain: "houser-da6b7.firebaseapp.com",
  projectId: "houser-da6b7",
  storageBucket: "houser-da6b7.appspot.com",
  messagingSenderId: "541423981639",
  appId: "1:541423981639:web:07bdd4fdcb2eb443808d62",
  measurementId: "G-B4R1R9CWGL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
export const db = getFirestore();
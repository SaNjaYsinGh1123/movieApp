// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore,collection} from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAr0jahX33VQdlLu4AT-abZpItzyqbwCzg",
  authDomain: "movieworld-1b103.firebaseapp.com",
  projectId: "movieworld-1b103",
  storageBucket: "movieworld-1b103.appspot.com",
  messagingSenderId: "406776567132",
  appId: "1:406776567132:web:6a9e9ed7947e76643fdd99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const movieRef = collection(db,'movies');
export const reviewRef = collection(db,'reviews');
export const userRef = collection(db,'users');
export default app;


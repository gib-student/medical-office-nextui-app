import {initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA4mz3wNmt3e5wMtI-UHFeghxIseHHNbnM",
    authDomain: "medical-office-nextui-app.firebaseapp.com",
    projectId: "medical-office-nextui-app",
    storageBucket: "medical-office-nextui-app.firebasestorage.app",
    messagingSenderId: "948530169418",
    appId: "1:948530169418:web:5ab24c380ee069c1c988b3",
    measurementId: "G-EDBBS02E7T"
  };

//   Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
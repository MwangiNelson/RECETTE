// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDU-L-SqfSOhdqJxdKVyrT1a5y4H0mqKmM",
    authDomain: "recette-cd6aa.firebaseapp.com",
    projectId: "recette-cd6aa",
    storageBucket: "recette-cd6aa.appspot.com",
    messagingSenderId: "340336757116",
    appId: "1:340336757116:web:65db7a1d9a0925eaba7cf9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);  
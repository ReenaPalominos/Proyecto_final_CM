import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBip5-PR3unavAudwB7QQkmNnR0ZN33iXs",
    authDomain: "proyecto-final-cm.firebaseapp.com",
    projectId: "proyecto-final-cm",
    storageBucket: "proyecto-final-cm.appspot.com",
    messagingSenderId: "413701259593",
    appId: "1:413701259593:web:6cc87ee29a07c3bce8da98",
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

const storage = getStorage(appFirebase);
const db = getFirestore(appFirebase);
const auth = getAuth(appFirebase);
const database = getDatabase(appFirebase);

export { appFirebase, storage, db, auth, database };
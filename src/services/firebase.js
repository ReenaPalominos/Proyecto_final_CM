// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBip5-PR3unavAudwB7QQkmNnR0ZN33iXs",
    authDomain: "proyecto-final-cm.firebaseapp.com",
    projectId: "proyecto-final-cm",
    storageBucket: "proyecto-final-cm.appspot.com",
    messagingSenderId: "413701259593",
    appId: "1:413701259593:web:6cc87ee29a07c3bce8da98"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

export default appFirebase;
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA0D_V7VCNRiQJrII03otmhuPVCrNX0cqo",
    authDomain: "mern-job-portal-2a958.firebaseapp.com",
    projectId: "mern-job-portal-2a958",
    storageBucket: "mern-job-portal-2a958.appspot.com",
    messagingSenderId: "620814949850",
    appId: "1:620814949850:web:243fa59c796369777a74e3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app
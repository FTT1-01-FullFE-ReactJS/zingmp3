// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvcHxJPcaQKQDlupeKwz8HxX420IGBrTk",
  authDomain: "zingmp3-41829.firebaseapp.com",
  projectId: "zingmp3-41829",
  storageBucket: "zingmp3-41829.appspot.com",
  messagingSenderId: "165831702200",
  appId: "1:165831702200:web:7eec8b0e9e1d2589e1664d",
  measurementId: "G-YGWK8GJXTG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
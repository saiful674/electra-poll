// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDo1mz2QajUXeKWe6C21D-go8J0g1MuC8Y",
  authDomain: "electropoll.firebaseapp.com",
  projectId: "electropoll",
  storageBucket: "electropoll.appspot.com",
  messagingSenderId: "79151528743",
  appId: "1:79151528743:web:b21671c3b6d203e70ec702"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
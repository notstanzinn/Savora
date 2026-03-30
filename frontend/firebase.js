// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "zomato-project-41c21.firebaseapp.com",
  projectId: "zomato-project-41c21",
  storageBucket: "zomato-project-41c21.firebasestorage.app",
  messagingSenderId: "598557732212",
  appId: "1:598557732212:web:07c579a92a8f97eba4d021"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
export {app,auth}
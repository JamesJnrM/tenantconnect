import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCRj5YSCDI8xLqrGcLwiUccRjbv8nhuzgw",
  authDomain: "tenanctconnect.firebaseapp.com",
  projectId: "tenanctconnect",
  storageBucket: "tenanctconnect.firebasestorage.app",
  messagingSenderId: "449204714339",
  appId: "1:449204714339:web:e4ef496d9619930d447156",
  measurementId: "G-MD5L4RQFN0"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
export {app, auth, db}
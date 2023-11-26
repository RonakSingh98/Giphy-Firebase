import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAoOlztyahOeONrecLnygzS7T8yZ8seBXU",
  authDomain: "next-bbe9a.firebaseapp.com",
  projectId: "next-bbe9a",
  storageBucket: "next-bbe9a.appspot.com",
  messagingSenderId: "748924411630",
  appId: "1:748924411630:web:8a3f0c260623fcbcee5dff",
  measurementId: "G-PFDEQRYFQ2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
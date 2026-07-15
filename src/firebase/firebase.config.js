import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCLRNZwhifwhKBqh2GewvPcBbgB0BjDnZM",
  authDomain: "tarbiyah-online-e0fc3.firebaseapp.com",
  projectId: "tarbiyah-online-e0fc3",
  storageBucket: "tarbiyah-online-e0fc3.firebasestorage.app",
  messagingSenderId: "248281133257",
  appId: "1:248281133257:web:114a433a2bf961d9155d18",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;

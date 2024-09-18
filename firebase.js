import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Firebase Storage 추가

const firebaseConfig = {
  apiKey: "AIzaSyBEzydfcJVPY2eti06lasdgmQbHbuJGeR8",
  authDomain: "x-app-c62bb.firebaseapp.com",
  projectId: "x-app-c62bb",
  storageBucket: "x-app-c62bb.appspot.com",
  messagingSenderId: "498896639348",
  appId: "1:498896639348:web:1cec8cc719c2f28f5bc821",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // Firebase Storage 초기화

export { auth, db, storage };

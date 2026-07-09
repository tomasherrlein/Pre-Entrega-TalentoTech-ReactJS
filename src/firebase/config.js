import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCI-_rgXH0f7RP7g0Zezrj7pEEpvabIvnc",
  authDomain: "player-2-5010e.firebaseapp.com",
  projectId: "player-2-5010e",
  storageBucket: "player-2-5010e.firebasestorage.app",
  messagingSenderId: "848929048076",
  appId: "1:848929048076:web:cd039485ff56bdabbb9029",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

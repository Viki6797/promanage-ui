import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyC... your key ...",
  authDomain: "promanage-ui.firebaseapp.com",
  projectId: "promanage-ui",
  storageBucket: "promanage-ui.appspot.com",
  messagingSenderId: "44338281950",
  appId: "1:44338281950:web:7ab1ce46088..."
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBAE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBAE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBAE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBAE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBAE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();

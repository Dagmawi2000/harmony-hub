import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDfqVj__UhhUj4DvVZlirMY97grWBghVaQ",
  authDomain: "harmony-hub-web.firebaseapp.com",
  projectId: "harmony-hub-web",
  storageBucket: "harmony-hub-web.firebasestorage.app",
  messagingSenderId: "552286400488",
  appId: "1:552286400488:web:3cfab69508f58c43cd3e5d",
  measurementId: "G-ZNNJMYDDPT"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
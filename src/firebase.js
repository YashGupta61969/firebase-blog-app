import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDg48dF4MgBtjfA5NLbs0AhVFe8vKd5HXI",
  authDomain: "hk-blog-app.firebaseapp.com",
  projectId: "hk-blog-app",
  storageBucket: "hk-blog-app.appspot.com",
  messagingSenderId: "942178700107",
  appId: "1:942178700107:web:17e6418ac68d016f1476ce"
}
// I have choose to set these configs as public as this is a temporary project



const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)
export const auth = getAuth();
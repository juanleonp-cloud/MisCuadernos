import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAb8gSZpM4In_C1ZmdJwqpUgtn4Prc6UOw",
  authDomain: "notbooks-app.firebaseapp.com",
  projectId:  "notbooks-app",
  storageBucket:  "notbooks-app.firebasestorage.app",
  messagingSenderId: "287303250033",
  appId: "1:287303250033:web:c3af8d3829d28a8b44abd0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

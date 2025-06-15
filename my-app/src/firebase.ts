// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCd5psY8VY7MMdylbERRluueF_kxELOkas",
  authDomain: "smartgifts-fdc43.firebaseapp.com",
  projectId: "smartgifts-fdc43",
  storageBucket: "smartgifts-fdc43.firebasestorage.app",
  messagingSenderId: "511614940291",
  appId: "1:511614940291:web:ceeeb12427fb668e2517b6",
  measurementId: "G-2J3J455RRC"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

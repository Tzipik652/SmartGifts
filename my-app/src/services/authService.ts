// src/services/authService.ts
import axios from "axios";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";

// הרשמה
export const register = async (name: string, email: string, password: string, captchaToken: string) => {
  if (!captchaToken || captchaToken.trim() === "") {
    throw new Error("אימות captcha נדרש – נא לאשר שאתה לא רובוט");
  }

  console.log("Simulating CAPTCHA token received:", captchaToken);

  // בדמו – לא נשלחת בקשה לשרת
  // TODO: In a real app, the captchaToken must be verified on the server

  await axios.post("http://localhost:3001/users", {
    name, 
    email,
    password,
    role: "customer"
  });
  return createUserWithEmailAndPassword(auth, email, password);

};

// התחברות
export const login = async (email: string, password: string) => {
  const result = await signInWithEmailAndPassword(auth, email, password);
  const user = result.user;
  const displayName = user.displayName || "";
  const userEmail = user.email || "";

  localStorage.setItem("displayName", displayName);
  localStorage.setItem("email", userEmail);


  const dbUserResponse = await axios.get(`http://localhost:3001/users?email=${encodeURIComponent(userEmail)}&password=${encodeURIComponent(password)}`);
  const dbUser = dbUserResponse.data[0];

  return { ...user, dbUser };
};
export const getUserRoleByEmail = async (email: string) => {
  const res =  axios.get(`http://localhost:3001/users?email=${encodeURIComponent(email)}`);
   const users = (await res).data;
      if (users.length > 0 && users[0].role) {
        return users[0].role;
      }
};

// התנתקות
export const logout = async () => {
  await signOut(auth);
  localStorage.removeItem("displayName");
  localStorage.removeItem("email");
};

const provider = new GoogleAuthProvider();
export const loginWithGoogle =async () => {
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  const displayName = user.displayName || "";
  const email = user.email || "";

  localStorage.setItem("displayName", displayName);
  localStorage.setItem("email", email);
  return user;
};
export const resetPassword = (email: string) => {
  return sendPasswordResetEmail(auth, email);
};

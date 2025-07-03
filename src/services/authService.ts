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
export const register = async (
  name: string,
  email: string,
  password: string,
  captchaToken: string
) => {
  if (!captchaToken || captchaToken.trim() === "") {
    throw new Error("אימות captcha נדרש – נא לאשר שאתה לא רובוט");
  }

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    const dbRes = await axios.post("http://localhost:3001/users", {
      name,
      email,
      password,
      role: "customer",
    });

    return { id: dbRes.data.id, name, email };

  } catch (error: any) {
    if (error.code === "auth/email-already-in-use") {
      throw new Error("האימייל הזה כבר רשום במערכת. נסה להתחבר במקום להירשם מחדש.");
    } else if (error.code === "auth/invalid-email") {
      throw new Error("כתובת אימייל לא תקינה");
    } else if (error.code === "auth/weak-password") {
      throw new Error("הסיסמה חלשה מדי – נסה לבחור סיסמה חזקה יותר");
    } else {
      throw new Error("שגיאה כללית ברישום: " + error.message);
    }
  }
};

export const updateUser = async (userId: string, updatedData: any) => {
  try {
    const response = await axios.patch(
      `http://localhost:3001/users/${userId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
// התחברות
export const login = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    
    const user = result.user;
    const displayName = user.displayName || "";
    const userEmail = user.email || "";

    const dbUserResponse = await axios.get(
      `http://localhost:3001/users?email=${encodeURIComponent(
        userEmail
      )}&password=${encodeURIComponent(password)}`
    );

    const dbUser = dbUserResponse.data[0];

    return {
      userId: dbUser?.id ||  result.user.uid || "",
      username: dbUser?.name || displayName || "",
      email: dbUser?.email || userEmail,
      isAdmin: dbUser?.role === "admin",
    };
  } catch (error: any) {
    if (error.code === "auth/user-not-found") {
      throw new Error("המשתמש לא נמצא. ודא שהאימייל נכון או נסה להירשם");
    } else if (error.code === "auth/wrong-password" || error.code === "auth/invalid-credential") {
      throw new Error("הסיסמה שגויה");
    } else if (error.code === "auth/invalid-email") {
      throw new Error("כתובת האימייל אינה תקינה");
    } else {
      console.error("שגיאה בהתחברות:", error);
      throw new Error("אירעה שגיאה בהתחברות. נסה שוב");
    }
  }
};

export const getUserRoleByEmail = async (email: string) => {
  const res = axios.get(
    `http://localhost:3001/users?email=${encodeURIComponent(email)}`
  );
  const users = (await res).data;
  if (users.length > 0 && users[0].role) {
    return users[0].role;
  }
};

// התנתקות
export const logout = async () => {
  await signOut(auth);


};

const provider = new GoogleAuthProvider();
export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  return user;
};
export const resetPassword = (email: string) => {
  return sendPasswordResetEmail(auth, email);
};

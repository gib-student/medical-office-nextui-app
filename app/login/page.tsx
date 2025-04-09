"use client";

import LoginForm from "@/components/LoginForm";
import { useRouter } from "next/navigation";
import { db } from "@/firebase";
import { auth, signInWithEmailAndPassword } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import CryptoJS from "crypto-js";

export default function LoginPage() {
  const router = useRouter();

  // Call this function when they click the "Sign In" button
  const handleLogin = async (username: string, password: string) => {
    try {
      // Fetch the encryption key from Firestore
      const keyDocRef = doc(db, "encryptionKey", "9Qy70YeM1e66czakvXGr");
      const keyDoc = await getDoc(keyDocRef);

      if (!keyDoc.exists()) {
        console.error("Encryption key document does not exist.");
        return;
      }

      const encryptionKey = keyDoc.data().key;
      // console.log("Encryption key fetched:", encryptionKey);

      // Google Authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );
      const user = userCredential.user;

      // Log the user information for debugging
      console.log("User signed in:", user);

      // Save the user data in a cookie with an expiry of 1 hour
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1); // Token expires in 1 hour

      // Encrypt the user data
      const encryptedUser = CryptoJS.AES.encrypt(
        JSON.stringify(user),
        encryptionKey
      ).toString();

      document.cookie = `user=${encryptedUser}; path=/; secure; SameSite=Strict; expires=${expiryDate.toUTCString()}`;
      router.push("/dashboard");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-5">MyChart Login</h1>
      <div className="mb-5">
        <LoginForm handleLogin={handleLogin} />
      </div>
    </>
  );
}

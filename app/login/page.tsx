"use client";

import LoginForm from "@/components/LoginForm";
import { useRouter } from "next/navigation";
import { auth, signInWithEmailAndPassword } from "@/firebase";
// import CryptoJS from "crypto-js";

export default function LoginPage() {
  const router = useRouter();

  // Call this function when they click the "Sign In" button
  const handleLogin = async (username: string, password: string) => {
    // Google Authentication
    signInWithEmailAndPassword(auth, username, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // log the user information for debugging
        console.log("User signed in:", user);
        // Save the user data in a cookie with an expiry of 1 hour
        // const expiryDate = new Date();
        // expiryDate.setHours(expiryDate.getHours() + 1); // Token expires in 1 hour

        // // Encrypt the user data
        // const encryptedUser = CryptoJS.AES.encrypt(
        //   JSON.stringify(user),
        //   "CSE499B"
        // ).toString();

        // document.cookie = `user=${encryptedUser}; path=/; secure; SameSite=Strict; expires=${expiryDate.toUTCString()}`;
        router.push("/dashboard");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
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

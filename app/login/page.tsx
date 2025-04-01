"use client";

import LoginForm from "@/components/LoginForm";
import { useRouter } from "next/navigation";
import { auth, signInWithEmailAndPassword } from "@/firebase";

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
        // Save the user information in local storage for later use
        localStorage.setItem("user", JSON.stringify(user));
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

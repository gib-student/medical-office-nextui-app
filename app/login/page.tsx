"use client";

import LoginForm from "@/components/LoginForm";
import { db } from "@/firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const auth = getAuth();

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

    // Pre-Google Authentication
    // const patientID = await getPatientID(username, password);
    // if (patientID) {
    //   console.log("User authenticated:", patientID);
    //   // Store the patient information in local storage for later use
    //   const patientData = await getPatientData(patientID);
    //   localStorage.setItem("patientID", patientID);
    //   // Redirect to the dashboard or another page
    //   router.push("/dashboard");
    // } else {
    //   console.log("Authentication failed.");
    //   // Handle authentication failure (e.g., show an error message)
    //   alert("Invalid username or password. Please try again.");
    // }
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

"use client";

import LoginForm from "@/components/LoginForm";
import { db } from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function LoginPage() {
  // Query for the user
  const getPatientID = async (username: string, password: string) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.log("No matching documents.");
      return;
    } else {
      const userData = querySnapshot.docs[0].data();
      if (userData.password === password) {
        return userData.patient_id;
      } else {
        console.log("Incorrect password.");
        return null;
      }
    }
  };

  // Call this function when they click the "Sign In" button
  const handleLogin = async (username: string, password: string) => {
    const patientID = await getPatientID(username, password);
    if (patientID) {
      console.log("User authenticated:", patientID);
      // Redirect to the dashboard or another page
    } else {
      console.log("Authentication failed.");
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

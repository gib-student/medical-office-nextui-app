"use client";

import LoginForm from "@/components/LoginForm";
import { db } from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

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

  const getPatientData = async (patientID: string) => {
    const patientsRef = collection(db, "patients");
    const q = query(patientsRef, where("patient_id", "==", patientID));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.log("No matching documents.");
      return;
    } else {
      const patientData = querySnapshot.docs[0].data();
      return patientData;
    }
  };

  // Call this function when they click the "Sign In" button
  const handleLogin = async (username: string, password: string) => {
    const patientID = await getPatientID(username, password);
    if (patientID) {
      console.log("User authenticated:", patientID);
      // Store the patient information in local storage for later use
      const patientData = await getPatientData(patientID);
      localStorage.setItem("patientID", patientID);
      // Redirect to the dashboard or another page
      router.push("/dashboard");
    } else {
      console.log("Authentication failed.");
      // Handle authentication failure (e.g., show an error message)
      alert("Invalid username or password. Please try again.");
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

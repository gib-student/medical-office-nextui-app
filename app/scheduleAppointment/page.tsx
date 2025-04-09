"use client";

import { useEffect, useState } from "react";
import { Calendar } from "@heroui/react";
import { db } from "@/firebase";
import CryptoJS from "crypto-js";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { today, getLocalTimeZone, isWeekend } from "@internationalized/date"; // Removed useLocale

export default function ScheduleAppointmentsPage() {
  const [provider, setProvider] = useState(null);
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState("");

  // Utility function to fetch and decrypt cookies
  const fetchAndDecryptCookies = async () => {
    try {
      // Fetch the encryption key from Firestore
      const keyDocRef = doc(db, "encryptionKey", "9Qy70YeM1e66czakvXGr");
      const keyDoc = await getDoc(keyDocRef);

      if (!keyDoc.exists()) {
        throw new Error("Encryption key document does not exist.");
      }

      const encryptionKey = keyDoc.data().key;

      // Decrypt the "provider" cookie
      const encryptedProvider = document.cookie
        .split("; ")
        .find((row) => row.startsWith("provider="))
        ?.split("=")[1];
      const decryptedProvider = encryptedProvider
        ? JSON.parse(
            CryptoJS.AES.decrypt(encryptedProvider, encryptionKey).toString(
              CryptoJS.enc.Utf8
            )
          )
        : null;

      // Decrypt the "user" cookie
      const encryptedUser = document.cookie
        .split("; ")
        .find((row) => row.startsWith("user="))
        ?.split("=")[1];
      const decryptedUser = encryptedUser
        ? JSON.parse(
            CryptoJS.AES.decrypt(encryptedUser, encryptionKey).toString(
              CryptoJS.enc.Utf8
            )
          )
        : null;

      // Fetch patient data from Firestore
      if (decryptedUser?.uid) {
        const patientsRef = collection(db, "patients");
        const patientQuery = query(
          patientsRef,
          where("uid", "==", decryptedUser.uid)
        );
        const patientSnapshot = await getDocs(patientQuery);

        if (!patientSnapshot.empty) {
          const patientData = patientSnapshot.docs[0].data();
          console.log("Patient data found:", patientData);
          setPatient(patientData);
        } else {
          console.log("No patient data found for the user.");
          setPatient(null);
        }
      }

      // Update provider state
      setProvider(decryptedProvider);
    } catch (err) {
      console.error(err);
      setError("Unable to retrieve necessary information.");
    }
  };

  // Define isDateUnavailable function
  const isDateUnavailable = (date: any) => {
    let now = today(getLocalTimeZone());

    // Use a default locale or fetch it dynamically if needed
    const locale = navigator.language || "en-US";

    return isWeekend(date, locale);
  };

  // Use useEffect to call the utility function on component mount
  useEffect(() => {
    fetchAndDecryptCookies();
  }, []);

  return (
    <div className="px-4">
      <h1 className="text-3xl font-bold text-center mb-5">
        Schedule Appointments
      </h1>
      <div>
        {error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : provider && patient ? (
          <p className="text-center">
            Scheduling an appointment for {patient.first_name} with{" "}
            {provider.first_name} {provider.last_name}.
          </p>
        ) : (
          <p className="text-center">Loading...</p>
        )}
      </div>
      <div className="border rounded-lg p-4 shadow-md">
        <h2 className="text-xl font-semibold text-center mb-4">
          Select day of appointment
        </h2>
        <div className="flex justify-center items-center">
          <Calendar
            aria-label="Date (No Selection)"
            defaultValue={today(getLocalTimeZone())}
            minValue={today(getLocalTimeZone())}
            isDateUnavailable={isDateUnavailable}
          />
        </div>
      </div>
    </div>
  );
}

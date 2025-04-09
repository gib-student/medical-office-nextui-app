"use client";

import CryptoJS from "crypto-js";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function ManageAppointmentsPage() {
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        // Fetch the encrypted appointment from the cookie
        const encryptedAppointment = document.cookie
          .split("; ")
          .find((row) => row.startsWith("appointment="))
          ?.split("=")[1];

        if (!encryptedAppointment) {
          console.error("No appointment cookie found.");
          return;
        }

        // Fetch the encryption key from Firestore
        const keyDocRef = doc(db, "encryptionKey", "9Qy70YeM1e66czakvXGr");
        const keyDoc = await getDoc(keyDocRef);

        if (!keyDoc.exists()) {
          console.error("Encryption key document does not exist.");
          return;
        }

        const encryptionKey = keyDoc.data().key;

        // Decrypt the appointment object
        const bytes = CryptoJS.AES.decrypt(encryptedAppointment, encryptionKey);
        const decryptedAppointment = JSON.parse(
          bytes.toString(CryptoJS.enc.Utf8)
        );

        console.log("Decrypted appointment:", decryptedAppointment);
        setAppointment(decryptedAppointment);
      } catch (error) {
        console.error("Error fetching appointment:", error);
      }
    };

    fetchAppointment();
  }, []);

  if (!appointment) {
    return <p>Loading appointment details...</p>;
  }

  return (
    <div>
      <h1>Manage Appointment</h1>
      {/* <p>Appointment ID: {appointment.id}</p> */}
      {/* <p>Doctor ID: {appointment.doctor_id}</p> */}
      {/* Render other appointment details */}
    </div>
  );
}

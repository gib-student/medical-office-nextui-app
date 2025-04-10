"use client";

import CryptoJS from "crypto-js";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";

// Define the doctor's data structure
interface Doctor {
  first_name: string;
  last_name: string;
  doctor_id: string; // Add other fields based on your Firestore schema
}

// Define the appointment's data structure
interface Appointment {
  appointment_id: string;
  appointment_date_time: {
    seconds: number;
    nanoseconds: number;
  };
  doctor_id: string;
  reason_for_visit?: string;
}

export default function ManageAppointmentsPage() {
  const [appointment, setAppointment] = useState<Appointment | null>(null); // Explicitly type the state
  const [doctor, setDoctor] = useState<Doctor | null>(null); // Explicitly type the state
  const router = useRouter();

  useEffect(() => {
    if (!router) {
      console.error("Router is not available.");
      return;
    }

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

        const encryptionKey = keyDoc.data()?.key;

        if (!encryptionKey) {
          console.error("Encryption key is missing.");
          return;
        }

        // Decrypt the appointment object
        const bytes = CryptoJS.AES.decrypt(encryptedAppointment, encryptionKey);
        const decryptedAppointment: Appointment = JSON.parse(
          bytes.toString(CryptoJS.enc.Utf8)
        );

        console.log("Decrypted appointment:", decryptedAppointment);
        setAppointment(decryptedAppointment);

        // Fetch the doctor's details
        const doctorsRef = collection(db, "doctors");
        const doctorQuery = query(
          doctorsRef,
          where("doctor_id", "==", decryptedAppointment.doctor_id)
        );
        const doctorSnapshot = await getDocs(doctorQuery);

        if (!doctorSnapshot.empty) {
          const doctorData = doctorSnapshot.docs[0].data() as Doctor; // Type assertion
          console.log("Doctor data:", doctorData);
          setDoctor(doctorData);
        } else {
          console.error("Doctor not found.");
        }
      } catch (error) {
        console.error("Error fetching appointment:", error);
      }
    };

    fetchAppointment();
  }, [router]);

  const handleCancelAppointment = async () => {
    if (!appointment || !appointment.appointment_id) {
      console.error("No appointment to cancel.");
      return;
    }

    // Ask for confirmation
    const confirmDelete = window.confirm(
      "Are you sure you want to cancel this appointment? This action cannot be undone."
    );

    if (!confirmDelete) {
      return; // Exit if the user cancels
    }

    try {
      // Reference the appointment document in Firestore
      const appointmentDocRef = doc(
        db,
        "appointments",
        appointment.appointment_id
      );

      // Delete the document
      await deleteDoc(appointmentDocRef);

      console.log("Appointment canceled successfully.");
      alert("Appointment has been canceled.");
      setAppointment(null); // Clear the appointment from state

      // Delete the secure cookie containing the appointment info
      document.cookie =
        "appointment=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure; SameSite=Strict";

      // Redirect to the appointments page
      router.push("/appointments");
    } catch (error) {
      console.error("Error canceling appointment:", error);
      alert("Failed to cancel the appointment. Please try again.");
    }
  };

  if (!appointment) {
    return <p>Loading appointment details...</p>;
  }

  return (
    <div className="px-4 pb-4">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center pb-6">
        Manage Appointment
      </h1>

      {/* Appointment Details */}
      <div className="p-6 border-2 border-black rounded-lg shadow-md bg-gray-100">
        <p className="text-lg font-bold text-black">
          {new Date(
            appointment.appointment_date_time.seconds * 1000
          ).toLocaleDateString()}{" "}
          at{" "}
          {new Date(
            appointment.appointment_date_time.seconds * 1000
          ).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          })}
        </p>
        <p className="text-lg text-gray-800">
          Doctor:{" "}
          {doctor
            ? `${doctor.first_name} ${doctor.last_name}`
            : "Doctor information not available"}
        </p>
        <p className="text-lg text-gray-800">
          Reason for Visit: {appointment.reason_for_visit || "Not specified"}
        </p>
      </div>

      {/* Cancel Appointment Button */}
      <div className="mt-6 text-center">
        <button
          className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          onClick={handleCancelAppointment}
        >
          Cancel Appointment
        </button>
      </div>
    </div>
  );
}

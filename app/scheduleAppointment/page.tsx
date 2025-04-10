"use client";

import { useEffect, useState } from "react";
import { Calendar } from "@heroui/react";
import { Button } from "@heroui/button";
import { TimeInput } from "@heroui/react";
import { Input } from "@heroui/input";
import { Time } from "@internationalized/date";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { db } from "@/firebase";
import CryptoJS from "crypto-js";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { today, getLocalTimeZone, isWeekend } from "@internationalized/date";
import { v4 as uuidv4 } from "uuid";

export default function ScheduleAppointmentsPage() {
  const [provider, setProvider] = useState(null);
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState(null); // State to store the selected date
  const [selectedTime, setSelectedTime] = useState(null); // State to store the selected time
  const [appointmentReason, setAppointmentReason] = useState(""); // State for appointment reason
  const router = useRouter(); // Initialize router for navigation

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
      console.log("Decrypted provider data:", decryptedProvider);
    } catch (err) {
      console.error(err);
      setError("Unable to retrieve necessary information.");
    }
  };

  // Define isDateUnavailable function
  const isDateUnavailable = (date) => {
    let now = today(getLocalTimeZone());

    let disabledRanges = [];

    // Use a default locale if `navigator` is not available (e.g., during SSR)
    const locale =
      typeof navigator !== "undefined" ? navigator.language : "en-US";

    return (
      isWeekend(date, locale) ||
      disabledRanges.some(
        (interval) =>
          date.compare(interval[0]) >= 0 && date.compare(interval[1]) <= 0
      )
    );
  };

  // Handle date selection
  const handleDateChange = (date) => {
    setSelectedDate(date); // Update the selected date state
    console.log("Selected date:", date);
  };

  // Handle time selection
  const handleTimeChange = (time) => {
    setSelectedTime(time); // Update the selected time state
    console.log("Selected time:", time);
  };

  // Handle appointment creation
  const handleCreateAppointment = async () => {
    if (!selectedDate) {
      alert("Please select a date before creating an appointment.");
      return;
    }

    if (!selectedTime) {
      alert("Please select a time before creating an appointment.");
      return;
    }

    if (!provider || !provider.doctor_id) {
      alert("Doctor information is missing. Please try again.");
      console.error("Provider is invalid:", provider);
      return;
    }

    if (!patient || !patient.patient_id) {
      alert("Patient information is missing. Please try again.");
      console.error("Patient is invalid:", patient);
      return;
    }

    if (!appointmentReason.trim()) {
      alert("Please provide a reason for the appointment.");
      return;
    }

    // Combine the selected date and time into a single JavaScript Date object
    const selectedDateObj = new Date(
      selectedDate.year,
      selectedDate.month - 1,
      selectedDate.day,
      selectedTime.hour,
      selectedTime.minute
    );

    // Convert the JavaScript Date object to a Firestore Timestamp
    const timestamp = Timestamp.fromDate(selectedDateObj);

    console.log("Creating appointment with timestamp:", timestamp);

    try {
      // Reference the appointments collection
      const appointmentsRef = collection(db, "appointments");

      // Add a new document to the appointments collection
      const docRef = await addDoc(appointmentsRef, {
        doctor_id: provider.doctor_id, // Use the correct field name
        patient_id: patient.patient_id, // Use the correct field name
        appointment_date_time: timestamp, // Save the Firestore Timestamp
        reason_for_visit: appointmentReason, // Save the reason for the appointment
        created_at: Timestamp.now(), // Save the current timestamp for when the document was created
        status: "planned", // Set the initial status of the appointment
      });

      // Use the document ID as the appointment ID
      const appointmentId = docRef.id;

      console.log("Generated appointment ID (document ID):", appointmentId);

      // Update the document with the appointment ID
      await updateDoc(docRef, { appointment_id: appointmentId });

      console.log("Appointment successfully saved!");
      alert("Appointment successfully created!");

      // Redirect to the appointments page
      router.push("/appointments");
    } catch (error) {
      console.error("Error saving appointment:", error);
      alert("Failed to create appointment. Please try again.");
    }
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
            onChange={handleDateChange} // Handle date selection
          />
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-center mb-4">
          Select time of appointment
        </h2>
        <div className="flex justify-center items-center">
          <TimeInput
            label="Appointment Time"
            granularity="minute"
            onChange={handleTimeChange} // Handle time selection
            defaultValue={new Time(8)} // Default time set to 8:00 AM
            minValue={new Time(8)} // Minimum time set to 8:00 AM
            maxValue={new Time(17)} // Maximum time set to 5:00 PM
          />
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-center mb-4">
          Reason for Appointment
        </h2>
        <div className="flex justify-center items-center">
          <Input
            label="Reason"
            placeholder="Describe the reason for your appointment"
            fullWidth
            onChange={(e) => setAppointmentReason(e.target.value)} // Update reason state
          />
        </div>
      </div>
      <div className="flex justify-center mt-6 mb-4">
        <Button
          onPress={handleCreateAppointment}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600"
        >
          Create Appointment
        </Button>
      </div>
    </div>
  );
}

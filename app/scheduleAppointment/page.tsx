"use client";

import { useEffect, useState } from "react";
import { Calendar } from "@heroui/react";
import { Button } from "@heroui/button";
import { TimeInput } from "@heroui/react";
import { Input } from "@heroui/input";
import { Time } from "@internationalized/date";
import { useRouter } from "next/navigation";
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
  updateDoc, // Add this import
} from "firebase/firestore";
import { today, getLocalTimeZone, isWeekend } from "@internationalized/date";
import { v4 as uuidv4 } from "uuid";

export default function ScheduleAppointmentsPage() {
  const [provider, setProvider] = useState(null);
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [appointmentReason, setAppointmentReason] = useState("");
  const router = useRouter();

  const fetchAndDecryptCookies = async () => {
    try {
      const keyDocRef = doc(db, "encryptionKey", "9Qy70YeM1e66czakvXGr");
      const keyDoc = await getDoc(keyDocRef);

      if (!keyDoc.exists()) {
        throw new Error("Encryption key document does not exist.");
      }

      const encryptionKey = keyDoc.data().key;

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

      if (decryptedUser?.uid) {
        const patientsRef = collection(db, "patients");
        const patientQuery = query(
          patientsRef,
          where("uid", "==", decryptedUser.uid)
        );
        const patientSnapshot = await getDocs(patientQuery);

        if (!patientSnapshot.empty) {
          const patientData = patientSnapshot.docs[0].data();
          setPatient(patientData);
        } else {
          setPatient(null);
        }
      }

      setProvider(decryptedProvider);
    } catch (err) {
      console.error(err);
      setError("Unable to retrieve necessary information. Please try again.");
    }
  };

  const isDateUnavailable = (date) => {
    const now = today(getLocalTimeZone());
    const locale =
      typeof navigator !== "undefined" ? navigator.language : "en-US";

    return isWeekend(date, locale);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

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
      return;
    }

    if (!patient || !patient.patient_id) {
      alert("Patient information is missing. Please try again.");
      return;
    }

    if (!appointmentReason.trim()) {
      alert("Please provide a reason for the appointment.");
      return;
    }

    const selectedDateObj = new Date(
      selectedDate.year,
      selectedDate.month - 1,
      selectedDate.day,
      selectedTime.hour,
      selectedTime.minute
    );

    const timestamp = Timestamp.fromDate(selectedDateObj);

    try {
      const appointmentsRef = collection(db, "appointments");

      const docRef = await addDoc(appointmentsRef, {
        doctor_id: provider.doctor_id,
        patient_id: patient.patient_id,
        appointment_date_time: timestamp,
        reason_for_visit: appointmentReason,
        created_at: Timestamp.now(),
        status: "planned",
      });

      // Use updateDoc to update the document with the appointment_id
      await updateDoc(docRef, { appointment_id: docRef.id });

      alert("Appointment successfully created!");
      router.push("/appointments");
    } catch (error) {
      console.error("Error saving appointment:", error);
      alert("Failed to create appointment. Please try again.");
    }
  };

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
            onChange={handleDateChange}
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
            onChange={handleTimeChange}
            defaultValue={new Time(8)}
            minValue={new Time(8)}
            maxValue={new Time(17)}
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
            onChange={(e) => setAppointmentReason(e.target.value)}
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

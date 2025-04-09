"use client";
import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { db } from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Button } from "@heroui/button";

export default function AppointmentsPage() {
  const [patient, setPatient] = useState<any>(null); // State to store patient data
  const [providers, setProviders] = useState<any[]>([]); // State to store providers
  const [appointments, setAppointments] = useState<any[]>([]); // State to store appointments
  const [apptsLoading, setApptsLoading] = useState<boolean>(true); // State to manage appointment loading
  const [providersLoading, setProvidersLoading] = useState<boolean>(true); // State to manage loading

  // Function to fetch user data from local storage
  async function fetchUser() {
    try {
      const encryptedUser = document.cookie
        .split("; ")
        .find((row) => row.startsWith("user="))
        ?.split("=")[1];

      if (encryptedUser) {
        const bytes = CryptoJS.AES.decrypt(encryptedUser, "CSE499B");
        const decryptedUser = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        console.log("Decrypted user data:", decryptedUser);

        if (!decryptedUser || !decryptedUser.uid) {
          console.log("Invalid user data.");
          setPatient(null);
          return null;
        }

        console.log("User data found in local storage:", decryptedUser);

        // Fetch patient data
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

        return decryptedUser;
      } else {
        console.log("No user found.");
        setPatient(null);
        return null;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setPatient(null);
      return null;
    }
  }

  // Function that checks if the user has any appointments in the database
  async function checkUserAppointments() {
    try {
      if (!patient) {
        console.log("No valid patient data available.");
        setAppointments([]);
        return;
      }

      const appointmentsRef = collection(db, "appointments");
      const appointmentsQuery = query(
        appointmentsRef,
        where("patient_id", "==", patient.patient_id)
      );
      const appointmentsSnapshot = await getDocs(appointmentsQuery);

      if (!appointmentsSnapshot.empty) {
        const patientAppointments = appointmentsSnapshot.docs.map((doc) =>
          doc.data()
        );
        console.log("Appointments found:", patientAppointments);
        setAppointments(patientAppointments);
      } else {
        console.log("No appointments found for this user.");
        setAppointments([]);
      }
    } catch (error) {
      console.error("Error checking user appointments:", error);
      setAppointments([]);
    }
  }

  // Function that checks if the user has a provider in the database
  async function checkUserProvider() {
    try {
      if (!patient) {
        console.log("No valid patient data available.");
        setProviders([]);
        return;
      }

      const doctorIds = patient.providers || [];
      if (doctorIds.length === 0) {
        console.log("No providers found for this patient.");
        setProviders([]);
        return;
      }

      const doctorsRef = collection(db, "doctors");
      const doctorQuery = query(
        doctorsRef,
        where("doctor_id", "in", doctorIds)
      );
      const doctorSnapshot = await getDocs(doctorQuery);

      if (!doctorSnapshot.empty) {
        const providers = doctorSnapshot.docs.map((doc) => doc.data());
        console.log("Providers found:", providers);
        setProviders(providers);
      } else {
        console.log("No matching providers found in the doctors collection.");
        setProviders([]);
      }
    } catch (error) {
      console.error("Error checking user provider:", error);
      setProviders([]);
    }
  }

  // Use useEffect to fetch user data when the page loads
  useEffect(() => {
    async function initializeUser() {
      await fetchUser();
    }
    initializeUser();
  }, []);

  // Use useEffect to call checkUserAppointments when user data is available
  useEffect(() => {
    const fetchAppointments = async () => {
      if (patient) {
        setApptsLoading(true);
        await checkUserAppointments();
        setApptsLoading(false);
      }
    };

    if (patient !== null) {
      fetchAppointments();
    }
  }, [patient]);

  // Use useEffect to call checkUserProvider when user data is available
  useEffect(() => {
    if (patient) {
      const fetchProviders = async () => {
        setProvidersLoading(true);
        await checkUserProvider();
        setProvidersLoading(false);
      };
      fetchProviders();
    }
  }, [patient]);

  // Function to handle appointment scheduling
  const handleScheduleAppointment = (providerId: string) => {
    console.log("Scheduling appointment with provider ID:", providerId);
    // Go to scheduling appointment page
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center pb-6">
        MyChart Appointments
      </h1>

      {/* Body */}
      <div className="px-4 pb-4">
        {/* Appointments */}
        <div className="mb-5">
          <h2 className="pb-2 text-xl text-left">My Appointments</h2>
          {/* Display appointments */}
          {apptsLoading ? (
            <p className="text-center">Loading appointments...</p>
          ) : appointments.length > 0 ? (
            <ul className="px-4">
              {appointments.map((appointment, index) => (
                <Button key={index} className="mb-2">
                  {new Date(
                    appointment.appointment_date_time.seconds * 1000
                  ).toLocaleDateString()}{" "}
                  -{" "}
                  {new Date(
                    appointment.appointment_date_time.seconds * 1000
                  ).toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                  })}{" "}
                  with{" Dr. "}
                  {
                    providers.find(
                      (provider) => provider.doctor_id === appointment.doctor_id
                    )?.first_name
                  }{" "}
                  {providers.find(
                    (provider) => provider.doctor_id === appointment.doctor_id
                  )?.last_name || "Unknown Provider"}
                </Button>
              ))}
            </ul>
          ) : (
            <p className="text-center">No appointments found.</p>
          )}
        </div>

        {/* Providers */}
        <div>
          <h2 className="pb-2 text-xl text-left">Schedule an appointment</h2>
          {providersLoading ? (
            <p className="text-center">Loading providers...</p>
          ) : providers.length > 0 ? (
            <ul className="px-4">
              {providers.map((provider, index) => (
                <li key={index} className="mb-2">
                  <Button>
                    Dr. {provider.first_name} {provider.last_name} -{" "}
                    {provider.specialization}
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center">No providers found.</p>
          )}
        </div>
      </div>
    </>
  );
}

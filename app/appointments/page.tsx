"use client";
import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { db } from "@/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore"; // Add these imports
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { useRouter } from "next/navigation";

export default function AppointmentsPage() {
  const router = useRouter();
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
        // Fetch the encryption key from Firestore
        const keyDocRef = doc(db, "encryptionKey", "9Qy70YeM1e66czakvXGr");
        const keyDoc = await getDoc(keyDocRef);

        if (!keyDoc.exists()) {
          console.error("Encryption key document does not exist.");
          setPatient(null);
          return null;
        }

        const encryptionKey = keyDoc.data().key;

        // Decrypt the user data
        const bytes = CryptoJS.AES.decrypt(encryptedUser, encryptionKey);
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
          ) : appointments.filter(
              (appointment) => appointment.status === "planned"
            ).length > 0 ? (
            <ul className="px-4">
              {appointments
                .filter((appointment) => appointment.status === "planned")
                .map((appointment, index) => (
                  <div
                    key={index}
                    className="mb-4 p-6 border-2 border-black rounded-lg shadow-md bg-gray-100"
                  >
                    <p className="text-lg font-bold text-black">
                      {new Date(
                        appointment.appointment_date_time.seconds * 1000
                      ).toLocaleDateString()}{" "}
                      -{" "}
                      {new Date(
                        appointment.appointment_date_time.seconds * 1000
                      ).toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="text-sm text-gray-800">
                      with Dr.{" "}
                      {
                        providers.find(
                          (provider) =>
                            provider.doctor_id === appointment.doctor_id
                        )?.first_name
                      }{" "}
                      {providers.find(
                        (provider) =>
                          provider.doctor_id === appointment.doctor_id
                      )?.last_name || "Unknown Provider"}
                    </p>
                    <Button
                      className="mt-4 px-4 py-2 bg-indigo-950 text-white rounded hover:bg-gray-800"
                      onPress={async () => {
                        try {
                          // Fetch the encryption key from Firestore
                          const keyDocRef = doc(
                            db,
                            "encryptionKey",
                            "9Qy70YeM1e66czakvXGr"
                          );
                          const keyDoc = await getDoc(keyDocRef);

                          if (!keyDoc.exists()) {
                            console.error(
                              "Encryption key document does not exist."
                            );
                            return;
                          }

                          const encryptionKey = keyDoc.data().key;

                          // Encrypt the appointment object
                          const encryptedAppointment = CryptoJS.AES.encrypt(
                            JSON.stringify(appointment),
                            encryptionKey
                          ).toString();

                          // Set the encrypted appointment in a secure cookie
                          const expiryDate = new Date();
                          expiryDate.setMinutes(expiryDate.getMinutes() + 30); // Cookie expires in 30 minutes
                          document.cookie = `appointment=${encryptedAppointment}; path=/; secure; SameSite=Strict; expires=${expiryDate.toUTCString()}`;
                        } catch (error) {
                          console.error(
                            "Error setting appointment cookie:",
                            error
                          );
                        }
                        // Navigate to the manageAppointments page
                        router.push("/manageAppointments");
                      }}
                    >
                      Manage appointment
                    </Button>
                  </div>
                ))}
            </ul>
          ) : (
            <p className="text-center">No appointments scheduled!</p>
          )}
        </div>

        {/* Divider */}
        <hr className="my-6 border-gray-300" />

        {/* Providers */}
        <div>
          <h2 className="pb-2 text-xl text-left">Schedule an appointment</h2>
          {providersLoading ? (
            <p className="text-center">Loading providers...</p>
          ) : providers.length > 0 ? (
            <ul className="px-4">
              {providers.map((provider, index) => (
                <li key={index} className="mb-2">
                  <Button className="bg-indigo-950 text-white">
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

        {/* Divider */}
        <hr className="my-6 border-gray-300" />

        {/* Find a Provider */}
        <Link
          className="mt-6 text-center text-xl p-2"
          href="/providerSearch"
          showAnchorIcon
        >
          Find a Provider
        </Link>
      </div>
    </>
  );
}

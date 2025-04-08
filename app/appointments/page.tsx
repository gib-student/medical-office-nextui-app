"use client";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Button } from "@heroui/button";

export default function AppointmentsPage() {
  const [providers, setProviders] = useState<any[]>([]); // State to store providers
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading
  const [appointments, setAppointments] = useState<any[]>([]); // State to store appointments

  // Function that checks if the user has any appointments in the database
  async function checkUserAppointments() {
    try {
      // Step 1: Check if the user is in local storage
      const user = localStorage.getItem("user");
      if (!user) {
        console.log("No user found in local storage.");
        return null;
      }
      const userData = JSON.parse(user);
      if (!userData || !userData.uid) {
        console.log("Invalid user data found in local storage.");
        return null;
      }
      console.log("User data found in local storage:", userData);

      // Step 2: Query the "appointments" collection for matching patient_id
      const appointmentsRef = collection(db, "appointments");
      const appointmentsQuery = query(
        appointmentsRef,
        where("patient_id", "==", userData.uid)
      );
      const appointmentsSnapshot = await getDocs(appointmentsQuery);

      if (!appointmentsSnapshot.empty) {
        const userAppointments = appointmentsSnapshot.docs.map((doc) =>
          doc.data()
        );
        console.log("Appointments found:", userAppointments);
        setAppointments(userAppointments); // Save appointments in global state
      } else {
        console.log("No appointments found for this user.");
        setAppointments([]); // Set global state to an empty array
      }
    } catch (error) {
      console.error("Error checking user appointments:", error);
      setAppointments([]); // Handle errors by setting global state to an empty array
    }
  }

  // Function that checks if the user has a provider in the database
  async function checkUserProvider() {
    try {
      // Step 1: Check if the user is in local storage
      const user = localStorage.getItem("user");
      if (!user) {
        console.log("No user found in local storage.");
        return null;
      }
      const userData = JSON.parse(user);
      if (!userData || !userData.uid) {
        console.log("Invalid user data found in local storage.");
        return null;
      }
      console.log("User data found in local storage:", userData);

      // Step 2: Use the user ID to query the database for the patient info
      const patientsRef = collection(db, "patients");
      const patientQuery = query(patientsRef, where("uid", "==", userData.uid));
      const patientSnapshot = await getDocs(patientQuery);

      if (!patientSnapshot.empty) {
        const patientData = patientSnapshot.docs[0].data();
        console.log("Patient found:", patientData);

        // Step 3: Now that we have the patient, check for their provider
        const doctorIds = patientData.providers || [];
        if (doctorIds.length === 0) {
          console.log("No providers found for this patient.");
          return [];
        }

        // Step 4: Cross-reference the "doctors" collection with the provider IDs
        const doctorsRef = collection(db, "doctors");
        const doctorQuery = query(
          doctorsRef,
          where("doctor_id", "in", doctorIds)
        );
        const doctorSnapshot = await getDocs(doctorQuery);

        if (!doctorSnapshot.empty) {
          const providers = doctorSnapshot.docs.map((doc) => doc.data());
          console.log("Providers found:", providers);
          return providers; // Return the providers found in the doctors collection
        } else {
          console.log("No matching providers found in the doctors collection.");
          return [];
        }
      } else {
        console.log("No patient found with the given UID.");
        return [];
      }
    } catch (error) {
      console.error("Error checking user provider:", error);
      return [];
    }
  }

  // Use useEffect to call checkUserAppointments when the page loads
  useEffect(() => {
    async function fetchAppointments() {
      setLoading(true);
      const fetchedAppointments = await checkUserAppointments();
      setAppointments(fetchedAppointments || []);
      setLoading(false);
    }
    fetchAppointments();
  }, []);

  // Use useEffect to call checkUserProvider when the page loads
  useEffect(() => {
    // Function to fetch providers when the component mounts
    async function fetchProviders() {
      setLoading(true);
      const fetchedProviders = await checkUserProvider();
      setProviders(fetchedProviders || []);
      setLoading(false);
    }
    fetchProviders();
  }, []);

  // Function to handle appointment scheduling
  const handleScheduleAppointment = (providerId: string) => {
    console.log("Scheduling appointment with provider ID:", providerId);
    // Go to scheduling appointment page
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center">MyChart Appointments</h1>

      <div>
        {/* Appointments */}
        <div className="mb-5">
          <h2 className="text-xl text-left">My Appointments</h2>
          {/* Display appointments */}
          {loading ? (
            <p className="text-center">Loading appointments...</p>
          ) : appointments.length > 0 ? (
            <ul className="px-4">
              {appointments.map((appointment, index) => (
                <li key={index} className="mb-2">
                  {appointment.date} - {appointment.time} with{" "}
                  {appointment.provider_name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center">No appointments found.</p>
          )}
        </div>

        {/* Providers */}
        <div>
          <h2 className="text-xl text-left">Schedule an appointment</h2>
          {loading ? (
            <p className="text-center">Loading providers...</p>
          ) : providers.length > 0 ? (
            <ul className="px-4">
              {providers.map((provider, index) => (
                <li key={index} className="mb-2">
                  <Button>
                    {provider.first_name} {provider.last_name} -{" "}
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

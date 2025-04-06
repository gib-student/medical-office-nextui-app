"use client";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Button } from "@heroui/button";

export default function AppointmentsPage() {
  const [providers, setProviders] = useState<any[]>([]); // State to store providers
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading

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

  // Use useEffect to call checkUserProvider when the page loads
  useEffect(() => {
    async function fetchProviders() {
      setLoading(true);
      const fetchedProviders = await checkUserProvider();
      setProviders(fetchedProviders || []);
      setLoading(false);
    }
    fetchProviders();
  }, []);

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-5">
        MyChart Appointments
      </h1>
      <h2 className="text-xl text-left px-4">Schedule an appointment</h2>
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
    </>
  );
}

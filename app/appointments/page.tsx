"use client";
import { useEffect, useState } from "react";
import { db } from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Button } from "@heroui/button";

export default function AppointmentsPage() {
  const [user, setUser] = useState<any>(null); // Global state to store user data
  const [providers, setProviders] = useState<any[]>([]); // State to store providers
  const [appointments, setAppointments] = useState<any[]>([]); // State to store appointments
  const [apptsLoading, setApptsLoading] = useState<boolean>(true); // State to manage appointment loading
  const [providersLoading, setProvidersLoading] = useState<boolean>(true); // State to manage loading

  // Function to fetch user data from local storage
  async function fetchUser() {
    try {
      const user = localStorage.getItem("user");
      if (!user) {
        console.log("No user found in local storage.");
        setUser(null);
        return null;
      }
      const userData = JSON.parse(user);
      if (!userData || !userData.uid) {
        console.log("Invalid user data found in local storage.");
        setUser(null);
        return null;
      }
      console.log("User data found in local storage:", userData);
      setUser(userData);
      return userData;
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser(null);
      return null;
    }
  }

  // Function that checks if the user has any appointments in the database
  async function checkUserAppointments() {
    try {
      if (!user || !user.uid) {
        console.log("No valid user data available.");
        setAppointments([]);
        return;
      }

      const appointmentsRef = collection(db, "appointments");
      const appointmentsQuery = query(
        appointmentsRef,
        where("patient_id", "==", user.uid)
      );
      const appointmentsSnapshot = await getDocs(appointmentsQuery);

      if (!appointmentsSnapshot.empty) {
        const userAppointments = appointmentsSnapshot.docs.map((doc) =>
          doc.data()
        );
        console.log("Appointments found:", userAppointments);
        setAppointments(userAppointments);
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
      if (!user || !user.uid) {
        console.log("No valid user data available.");
        setProviders([]);
        return;
      }

      const patientsRef = collection(db, "patients");
      const patientQuery = query(patientsRef, where("uid", "==", user.uid));
      const patientSnapshot = await getDocs(patientQuery);

      if (!patientSnapshot.empty) {
        const patientData = patientSnapshot.docs[0].data();
        console.log("Patient found:", patientData);

        const doctorIds = patientData.providers || [];
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
      } else {
        console.log("No patient found with the given UID.");
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
    if (user) {
      async function fetchAppointments() {
        setApptsLoading(true);
        await checkUserAppointments();
        setApptsLoading(false);
      }
      fetchAppointments();
    }
  }, [user]);

  // Use useEffect to call checkUserProvider when user data is available
  useEffect(() => {
    if (user) {
      async function fetchProviders() {
        setProvidersLoading(true);
        await checkUserProvider();
        setProvidersLoading(false);
      }
      fetchProviders();
    }
  }, [user]);

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
          <h2 className="pb-2 text-xl text-left">Schedule an appointment</h2>
          {providersLoading ? (
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

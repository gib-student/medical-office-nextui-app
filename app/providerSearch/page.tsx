"use client";
import { useState, useEffect } from "react";
import { db } from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Input } from "@heroui/input";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";

export default function ProviderSearchPage() {
  const [doctorName, setDoctorName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [specialties] = useState([
    "Family Medicine",
    "Urology",
    "Pulmonology",
    "Endocrinology",
    "Cardiology",
    "Oncology",
    "Psychiatry",
    "Radiology",
    "Neurology",
    "Ophthalmology",
    "Dermatology",
    "Surgery",
    "Orthopedics",
    "Nephrology",
    "Pathology",
    "Rheumatology",
    "Anesthesiology",
    "Pediatrics",
    "Obstretrics & Gynecology",
    "Gastroenterology",
  ]);
  const [doctors, setDoctors] = useState([]);

  const searchDoctors = async () => {
    try {
      console.log("Search button pressed"); // Debugging log
      const doctorsRef = collection(db, "doctors");
      const allDocsSnapshot = await getDocs(doctorsRef);
      // allDocsSnapshot.forEach((doc) => {
      //   console.log("Document data:", doc.data()); // Log each document's data
      // });
      let doctorList = [];

      // Apply filters based on user input
      if (doctorName) {
        console.log(`Filtering by doctor name: ${doctorName}`); // Debugging log

        // Query for first_name
        const firstNameQuery = query(
          doctorsRef,
          where("first_name", "==", doctorName)
        );
        const firstNameSnapshot = await getDocs(firstNameQuery);

        // Query for last_name
        const lastNameQuery = query(
          doctorsRef,
          where("last_name", "==", doctorName)
        );
        const lastNameSnapshot = await getDocs(lastNameQuery);

        // Combine results from both queries
        doctorList = [
          ...firstNameSnapshot.docs.map((doc) => doc.data()),
          ...lastNameSnapshot.docs.map((doc) => doc.data()),
        ];
      }

      if (specialty) {
        console.log(`Filtering by specialty: ${specialty}`); // Debugging log

        // Filter the combined list by specialty
        doctorList = doctorList.filter(
          (doctor) => doctor.specialty === specialty
        );
      }

      // Ensure valid data and combine first_name and last_name into a single name field
      doctorList = doctorList
        .filter(
          (doctor) => doctor.first_name && doctor.last_name && doctor.specialty
        )
        .map((doctor) => ({
          ...doctor,
          name: `${doctor.first_name} ${doctor.last_name}`, // Combine first_name and last_name
        }));

      console.log("Doctors found:", doctorList); // Debugging log
      setDoctors(doctorList); // Update the state with the filtered doctors
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    // Optionally, fetch all doctors on initial load
    searchDoctors();
  }, []);

  return (
    <div style={{ paddingLeft: "20px" }}>
      {" "}
      {/* Add padding to the left */}
      <h1 className="text-3xl font-bold text-center mb-5">
        Search for Providers
      </h1>
      <div className="mb-4">
        <Input
          label="Doctor Name"
          placeholder="Enter doctor's name"
          value={doctorName}
          onChange={(e) => setDoctorName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <Dropdown portal="true" placement="bottom">
          <DropdownTrigger>
            <Button variant="bordered">
              {specialty || "Select a Specialty"}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Specialty Selection"
            onAction={(key) => setSpecialty(key)}
            style={{ maxHeight: "200px", overflowY: "auto" }}
          >
            {specialties.map((specialty) => (
              <DropdownItem key={specialty}>{specialty}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="mb-4">
        <Button
          variant="solid"
          color="primary"
          onPress={searchDoctors} // Use `onPress` for HeroUI buttons
        >
          Search
        </Button>
      </div>
      <div className="mt-5">
        <h2 className="text-xl font-bold">Results:</h2>
        {doctors.length > 0 ? (
          <ul>
            {doctors.map((doctor, index) => (
              <li key={index} className="mb-2">
                {doctor.name} - {doctor.specialty}
              </li>
            ))}
          </ul>
        ) : (
          <p>No doctors found.</p>
        )}
      </div>
    </div>
  );
}

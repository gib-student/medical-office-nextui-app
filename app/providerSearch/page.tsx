"use client";
import { useState, useEffect } from "react";
import { db } from "@/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { Input } from "@heroui/input";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import CryptoJS from "crypto-js";
import Cookies from "js-cookie";

export default function ProviderSearchPage() {
  const [doctorName, setDoctorName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [specializations] = useState([
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
  const router = useRouter();

  const searchDoctors = async () => {
    try {
      console.log("Search button pressed");
      const doctorsRef = collection(db, "doctors");
      let doctorList = [];

      if (doctorName) {
        const firstNameQuery = query(
          doctorsRef,
          where("first_name", "==", doctorName)
        );
        const firstNameSnapshot = await getDocs(firstNameQuery);

        const lastNameQuery = query(
          doctorsRef,
          where("last_name", "==", doctorName)
        );
        const lastNameSnapshot = await getDocs(lastNameQuery);

        doctorList = [
          ...firstNameSnapshot.docs.map((doc) => doc.data()),
          ...lastNameSnapshot.docs.map((doc) => doc.data()),
        ];
      }

      if (specialization) {
        if (doctorList.length > 0) {
          // Filter existing results by specialization
          doctorList = doctorList.filter(
            (doctor) => doctor.specialization === specialization
          );
        } else {
          // Query directly by specialization if no name is provided
          const specializationQuery = query(
            doctorsRef,
            where("specialization", "==", specialization)
          );
          const specializationSnapshot = await getDocs(specializationQuery);
          doctorList = specializationSnapshot.docs.map((doc) => doc.data());
        }
      }

      doctorList = doctorList
        .filter(
          (doctor) =>
            doctor.first_name && doctor.last_name && doctor.specialization
        )
        .map((doctor) => ({
          ...doctor,
          name: `${doctor.first_name} ${doctor.last_name}`,
        }));

      setDoctors(doctorList);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleSelectDoctor = async (doctor) => {
    try {
      // Fetch the encryption key from Firestore
      const keyDocRef = doc(db, "encryptionKey", "9Qy70YeM1e66czakvXGr");
      const keyDoc = await getDoc(keyDocRef);

      if (!keyDoc.exists()) {
        throw new Error("Encryption key document does not exist.");
      }

      const encryptionKey = keyDoc.data().key;

      // Decrypt the "user" secure cookie to get the uid
      const encryptedUser = document.cookie
        .split("; ")
        .find((row) => row.startsWith("user="))
        ?.split("=")[1];

      if (!encryptedUser) {
        throw new Error("User cookie not found.");
      }

      const decryptedUser = JSON.parse(
        CryptoJS.AES.decrypt(encryptedUser, encryptionKey).toString(
          CryptoJS.enc.Utf8
        )
      );

      const uid = decryptedUser.uid;
      if (!uid) {
        throw new Error("UID not found in decrypted user data.");
      }

      // Query the "patients" collection to find the patient document with the matching uid
      const patientsRef = collection(db, "patients");
      const patientQuery = query(patientsRef, where("uid", "==", uid));
      const patientSnapshot = await getDocs(patientQuery);

      if (patientSnapshot.empty) {
        throw new Error("No patient document found for the given UID.");
      }

      // Get the patient_id from the matching document
      const patientDoc = patientSnapshot.docs[0];
      const patientId = patientDoc.data().patient_id;

      if (!patientId) {
        throw new Error("Patient ID not found in the patient document.");
      }

      // Add the doctor's doctor_id to the patient's providers array
      const patientDocRef = doc(db, "patients", patientId);
      await updateDoc(patientDocRef, {
        providers: arrayUnion(doctor.doctor_id),
      });

      // Encrypt the provider object
      const encryptedProvider = CryptoJS.AES.encrypt(
        JSON.stringify(doctor),
        encryptionKey
      ).toString();

      // Set the encrypted provider as a secure cookie
      const expiryDate = new Date();
      expiryDate.setMinutes(expiryDate.getMinutes() + 30);

      document.cookie = `provider=${encryptedProvider}; path=/; secure; SameSite=Strict; expires=${expiryDate.toUTCString()}`;

      // Navigate to the scheduleAppointment page
      router.push("/scheduleAppointment");
    } catch (error) {
      console.error("Error handling doctor selection:", error);
    }
  };

  useEffect(() => {
    searchDoctors();
  }, []);

  return (
    <div style={{ paddingLeft: "20px" }}>
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
              {specialization || "Select a Specialization"}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Specialization Selection"
            onAction={(key) => setSpecialization(key)}
            style={{ maxHeight: "200px", overflowY: "auto" }}
          >
            {specializations.map((specialization) => (
              <DropdownItem key={specialization}>{specialization}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
      <div className="mb-4">
        <Button variant="solid" color="primary" onPress={searchDoctors}>
          Search
        </Button>
      </div>
      <div className="mt-5">
        <h2 className="text-xl font-bold">Results:</h2>
        {doctors.length > 0 ? (
          <ul>
            {doctors.map((doctor, index) => (
              <li key={index} className="mb-2">
                <Button
                  className="bg-indigo-950 text-white"
                  variant="solid"
                  onPress={() => handleSelectDoctor(doctor)}
                >
                  {doctor.name} - {doctor.specialization}
                </Button>
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

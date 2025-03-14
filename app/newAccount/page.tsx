"use client";

import { useState } from "react";
import NewAccountForm from "@/components/NewAccountForm";
import { db } from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";

function handleSubmit(formData: any) {
  // Handle form submission
  console.log("Form submitted");
}

export default function NewAccountPage() {
  const [formData, setFormData] = useState({
    ssn: "",
    dob: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
  });

  return (
    <>
      {/* Please identify yourself */}
      <h1 className="text-3xl font-bold text-center mt-4">
        Create a new account
      </h1>
      <div className="m-2">
        <h2 className="text-2xl mt-5">Please identify yourself</h2>
        <h3 className="my-4">All fields are required.</h3>
        <div>
          <NewAccountForm handleSubmit={handleSubmit} />
        </div>
      </div>
    </>
  );
}

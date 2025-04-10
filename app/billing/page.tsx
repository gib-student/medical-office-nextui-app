"use client";

import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { Button } from "@heroui/button";

export default function BillingPage() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const billingCollection = collection(db, "billing");
        const q = query(
          billingCollection,
          where("payment_status", "==", "pending")
        );
        const querySnapshot = await getDocs(q);
        const billsData = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            due_date: data.due_date?.toDate().toLocaleDateString(), // Convert Firestore timestamp to a readable date
          };
        });
        setBills(billsData);
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    };

    fetchBills();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mb-5">MyChart Billing</h1>
      <p className="text-center">
        This is the billing page. You can view and manage your billing
        information here.
      </p>
      <div className="mt-5">
        {bills.length > 0 ? (
          bills.map((bill) => (
            <div key={bill.id} className="border p-4 mb-4 rounded shadow">
              <h2 className="text-xl font-semibold">
                Amount Owed: ${bill.amount}
              </h2>
              <p>Due Date: {bill.due_date}</p>
              <Button
                className="bg-primary mt-2 text-white"
                // style={{
                //   backgroundColor: "blue",
                //   color: "white",
                //   marginTop: "10px",
                // }}
              >
                Pay Bill
              </Button>
            </div>
          ))
        ) : (
          <p className="text-center">No pending bills found.</p>
        )}
      </div>
    </div>
  );
}

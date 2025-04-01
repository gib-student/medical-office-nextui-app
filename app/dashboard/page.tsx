"use client";
import { Button } from "@heroui/button";

export default function DashboardPage() {
  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-5">MyChart Dashboard</h1>
      <div className="mb-5">
        {/* Buttons: Appointments, Billing, Provider search */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Button className="block bg-indigo-950 text-white">
            Appointments
          </Button>
          <Button className="block bg-indigo-950 text-white">Billing</Button>
          {/* <Button className="block bg-indigo-950 text-white">
            Provider Search
          </Button> */}
        </div>
      </div>
    </>
  );
}
// This is the main dashboard page for the application.
// It will display the user's dashboard after they log in.

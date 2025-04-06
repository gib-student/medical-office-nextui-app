"use client";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  // Function that navigates when they press appointments button
  const navigateToAppointments = () => {
    router.push("/appointments");
  };

  // Function that navigates to billing page
  const navigateToBilling = () => {
    router.push("/billing");
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-5">MyChart Dashboard</h1>
      <div className="px-3 mb-5">
        {/* Buttons: Appointments, Billing, Provider search */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Button
            className="block bg-indigo-950 text-white"
            onPress={navigateToAppointments} // This will navigate to the appointments page when clicked
          >
            Appointments
          </Button>
          <Button
            className="block bg-indigo-950 text-white"
            onPress={navigateToBilling} // This will navigate to the billing page when clicked
          >
            Billing
          </Button>
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

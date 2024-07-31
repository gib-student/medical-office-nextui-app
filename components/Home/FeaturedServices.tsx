import FeaturedServicesCard from "./FeaturedServicesCard";
import { PT_Serif } from "next/font/google";

const pt_serif = PT_Serif({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function FeaturedServices() {
  return (
    <>
      <h1
        className={`text-blue-1000 text-2xl font-semibold text-center my-11 ${pt_serif.className}`}
      >
        Featured Services
      </h1>
      <FeaturedServicesCard />
    </>
  );
}

"use client";

import { Button } from "@nextui-org/button";

import FeaturedServices from "./home/featuredServices/FeaturedServices";
import GetCareNow from "./home/GetCareNow";
import AwardsAndStatistics from "./home/AwardsAndStatistics";
import Hero from "./home/Hero";
import MyChartInfo from "./home/MyChartInfo";
import SecondNav from "./home/SecondNav";
import ServicesAndSupportInfo from "./home/ServicesAndSupportInfo";

// import path from "path";

export default function Home() {
  // const appRoot = path.resolve(__dirname, "..");
  // console.log(appRoot);
  return (
    <>
      <Hero />
      <SecondNav />
      <FeaturedServices />
      <GetCareNow />
      <ServicesAndSupportInfo />
      <MyChartInfo />
      <AwardsAndStatistics />

      {/* Get Care Now button (fixed to the bottom) */}
      <div className="h-14" />
      <div className="fixed bottom-0 right-0 left-0 bg-white p-2 z-50">
        <Button className="rounded-md bg-blue-900 text-white w-full">
          Get Care Now
        </Button>
      </div>
    </>
  );
}

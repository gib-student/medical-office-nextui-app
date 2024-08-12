"use client";

import { Button } from "@nextui-org/button";
import { NextUIProvider } from "@nextui-org/system";

import FeaturedServices from "./Home/FeaturedServices/FeaturedServices";
import GetCareNow from "./Home/GetCareNow";
import AwardsAndStatistics from "./Home/AwardsAndStatistics";
import Hero from "./Home/Hero";
import MyChartInfo from "./Home/MyChartInfo";
import SecondNav from "./Home/SecondNav";
import ServicesAndSupportInfo from "./Home/ServicesAndSupportInfo";

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
      <div className="h-14" />
      <div className="fixed bottom-0 right-0 left-0 bg-white p-2 z-50">
        <Button className="rounded-md bg-blue-900 text-white w-full">
          Get Care Now
        </Button>
      </div>
    </>
  );
}

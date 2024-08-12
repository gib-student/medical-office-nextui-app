"use client";
import { Button } from "@nextui-org/button";
import FeaturedServices from "@/components/Home/FeaturedServices";
import GetCareNow from "@/components/Home/GetCareNow";
import AwardsAndStatistics from "@/components/Home/AwardsAndStatistics";
import Hero from "@/components/Home/Hero";
import MyChartInfo from "@/components/Home/MyChartInfo";
import SecondNav from "@/components/Home/SecondNav";
import ServicesAndSupportInfo from "@/components/Home/ServicesAndSupportInfo";

export default function Home() {
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

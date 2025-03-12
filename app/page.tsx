"use client";

import { Button } from "@heroui/button";

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
    </>
  );
}

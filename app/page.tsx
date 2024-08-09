"use client";
import FeaturedServices from "@/components/Home/FeaturedServices";
import Hero from "@/components/Home/Hero";
import SecondNav from "@/components/Home/SecondNav";
import GetCareNow from "@/components/Home/GetCareNow";
import ServicesAndSupportInfo from "@/components/Home/ServicesAndSupportInfo";
import MyChartInfo from "@/components/Home/MyChartInfo";

export default function Home() {
  return (
    <>
      <Hero />
      <SecondNav />
      <FeaturedServices />
      <GetCareNow />
      <ServicesAndSupportInfo />
      <MyChartInfo />
    </>
  );
}

"use client";
import FeaturedServices from "@/components/Home/FeaturedServices";
import Hero from "@/components/Home/Hero";
import SecondNav from "@/components/Home/SecondNav";
import GetCareNow from "@/components/Home/GetCareNow";

export default function Home() {
  return (
    <>
      <Hero />
      <SecondNav />
      <FeaturedServices />
      <GetCareNow />
    </>
  );
}

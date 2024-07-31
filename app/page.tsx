"use client";
import FeaturedServices from "@/components/Home/FeaturedServices";
import Hero from "@/components/Home/Hero";
import SecondNav from "@/components/SecondNav";

export default function Home() {
  return (
    <>
      <Hero />
      <SecondNav />
      <FeaturedServices />
    </>
  );
}

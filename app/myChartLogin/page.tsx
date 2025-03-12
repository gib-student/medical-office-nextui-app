"use client";

import { Button } from "@nextui-org/button";
import { pt_serif_font } from "../../components/styles";
import { useRouter } from "next/navigation";

export default function MyChartLoginPage() {
  function handler(): void {
    const router = useRouter();
    
  }

  return (
    <>
      <header
        className="relative bg-cover bg-no-repeat bg-right
      bg-[url(https://cd.trihealth.com/-/media/trihealth-new/hero-banners/my-chart-portal-hero.png?h=350&iar=0&w=1440&hash=F4E9CA8381C7E665832EAF72C8744898)]"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-950 from-40% to-transparent"></div>
        <div className="relative z-10">
          <h2
            className={`${pt_serif_font.className} ${"text-yellow-400 text-3xl pt-6 pl-4"}`}
            style={{ fontWeight: 700 }}
          >
            Patient Portal
          </h2>
          {/* For medium and large views, combine these two headers in a single line */}
          <h2
            className={`${pt_serif_font.className} ${"text-yellow-400 text-3xl pl-4 pb-6"}`}
            style={{ fontWeight: 700 }}
          >
            (MyChart)
          </h2>
        </div>
      </header>
      <div className="ml-4 my-6">
        <Button
          className="bg-indigo-950 text-white rounded-lg text-lg mb-5"
          size="lg"
          onPress={handler}
        >
          Log into MyChart
        </Button>
        <Button
          className="bg-indigo-950 text-white rounded-lg text-lg"
          size="lg"
        >
          Create a New Account
        </Button>
      </div>
    </>
  );
}

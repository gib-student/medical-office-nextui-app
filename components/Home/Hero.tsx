import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { PT_Serif } from "next/font/google";

const pt_serif = PT_Serif({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function Hero() {
  const h1Style = `${"text-4xl font-bold px-3"} + ${pt_serif.className}`;
  return (
    <>
      <div className="relative">
        <div className="h-8 w-full top-0 absolute z-10 bg-gradient-to-b from-white" />
        <Image
          className="z-0"
          alt="Hero photo"
          src="https://github.com/gib-student/medical-office-nextui-app/blob/main/public/family-practice-sm.jpg?raw=truej∑"
          radius="none"
        />
        <div className="mb-[-3] h-64 w-full bottom-0 absolute z-10 bg-gradient-to-t from-black" />
      </div>
      {/* Headings and "find a doctor" button */}
      <div className="text-white row-start-6 row-span-5 bg-black">
        <h1 className={`${h1Style} ${"text-yellow-400"}`}>
          A healthy life begins
        </h1>
        <h1 className={`${h1Style} ${"text-yellow-400"}`}>with</h1>
        <h1 className={`${h1Style} ${"text-white mb-4"}`}>truly human care</h1>
        <h4 className="px-3 mb-5">
          We at Four Seasons Medical listen to your challenges and consider your
          true needs to help you enjoy your highest quality of life.
        </h4>
        <Button
          className="ml-3 mb-24 text-xl bg-gradient-to-tr from-blue-800 to-cyan-500"
          size="lg"
          radius="md"
          color="primary"
        >
          Find a Doctor
        </Button>
      </div>
    </>
  );
}

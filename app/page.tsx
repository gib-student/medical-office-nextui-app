"use client";
import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
} from "@nextui-org/dropdown";
import { Image } from "@nextui-org/image";
import { PT_Serif } from "next/font/google";
import { useState, useMemo } from "react";

const pt_serif = PT_Serif({
  weight: ["400", "700"],
  subsets: ["latin"],
});
const h1Style = `${"text-4xl font-bold px-3"} + ${pt_serif.className}`;

export default function Home() {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["for_patients"]));
  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  return (
    <>
      {/* hero */}
      <div className="relative">
        <div className="h-8 w-full top-0 absolute z-10 bg-gradient-to-b from-white" />
        <Image
          className="z-0"
          alt="Hero photo"
          src="https://github.com/gib-student/medical-office-nextui-app/blob/main/public/family-practice-sm.jpg?raw=truej∑"
          radius="none"
        />
        <div className="h-64 w-full bottom-0 absolute z-10 bg-gradient-to-t from-black" />
      </div>
      {/* Headings and "find a doctor" button */}
      <div className="text-white row-start-6 row-span-5 bg-black">
        <h1 className={`${h1Style} ${"text-yellow-400"}`}>
          A healthy life begins
        </h1>
        <h1 className={`${h1Style} ${"text-yellow-400"}`}>with</h1>
        <h1 className={`${h1Style} ${"text-white mb-4"}`}>truly human care</h1>
        <h4 className="px-3 mb-5">
          We at Four Seasons Health listen to your challenges and consider your
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
      {/* Secondary nav */}
      <div className="h-52 border-slate-300 border-2 rounded-lg m-5 p-2 bg-white mt-[-8vh]">
        <div className="flex justify-center">
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="bordered"
                className="capitalize text-xl border-2 border-gray-500 justify-items-start"
                size="lg"
                disableRipple
                fullWidth
              >
                {selectedValue}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Single selection example"
              variant="flat"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedKeys}
              onSelectionChange={setSelectedKeys}
              defaultSelectedKeys="for_patients"
              className="text-md"
            >
              <DropdownItem key="for_patients">For Patients</DropdownItem>
              <DropdownItem key="for_medical_professionals">
                For Medical Professionals
              </DropdownItem>
              <DropdownItem key="for_team_members">
                For Team Members
              </DropdownItem>
              <DropdownItem key="for_the_community">
                For the Community
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </>
  );
}

import { Button } from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
} from "@nextui-org/dropdown";

import { useState, useMemo } from "react";

import { SecondNavIcon } from "../icons";

import { ChevronDownIcon } from "@/components/Home/ChevronDownIcon";

export default function SecondNav() {
  const [selectedKey, setSelectedKeys] = useState("for_patients");
  const selectedValue = useMemo(
    () => selectedKey.toString().replace("_", " "),
    [selectedKey]
  );

  const selectionChanged = (arg: any) => {
    if (typeof arg === "object") {
      const newKey = Array.from(arg).join(", ").replaceAll("_", " ");
      setSelectedKeys(newKey);

      return;
    }
    setSelectedKeys(arg);
  };

  const for_patients_Obj = [
    { id: 0, name: "Make an Appointment" },
    { id: 1, name: "MyChart Patient Portal" },
    { id: 2, name: "Pay a Bill", icon: "pay_a_bill" },
    { id: 3, name: "Services and Conditions" },
  ];
  const for_medical_professionals_Obj = [
    { id: 4, name: "Transfer a Patient" },
    { id: 5, name: "Continuing Education" },
    { id: 6, name: "Careers" },
    { id: 7, name: "Research & Education" },
  ];
  const for_team_members_Obj = [
    { id: 8, name: "Employment Resources" },
    { id: 9, name: "Physician Access" },
    { id: 10, name: "Shop Merchandise" },
    { id: 11, name: "Current Job Listings" },
  ];
  const for_the_community_Obj = [
    { id: 12, name: "Classes and Events" },
    { id: 13, name: "Health & Fitness Pavilion" },
    { id: 14, name: "Corporate Health" },
    { id: 15, name: "TriHealth Foundation" },
  ];

  const buttonList =
    selectedKey === "for patients"
      ? for_patients_Obj
      : selectedKey === "for medical professionals"
        ? for_medical_professionals_Obj
        : selectedKey === "for team members"
          ? for_team_members_Obj
          : for_the_community_Obj;

  return (
    <div className="border-slate-300 border-1 rounded-lg m-5 p-2 bg-white mt-[-8vh]">
      <div className="flex justify-center">
        <Dropdown>
          <div className="border-1 mt-2 mx-2 rounded-lg border-gray-700 w-full">
            <DropdownTrigger>
              <Button
                fullWidth
                className="p-8 rounded-lg relative capitalize text-xl"
                style={{ justifyContent: "flex-start" }}
                variant="light"
              >
                {selectedValue}
                <div className="absolute right-6">
                  <ChevronDownIcon />
                </div>
              </Button>
            </DropdownTrigger>
          </div>
          <DropdownMenu
            onSelectionChange={selectionChanged}
            aria-label="Second Nav Dropdown"
            className="text-md"
            defaultSelectedKeys="for_patients"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selectedKey}
            variant="flat"
          >
            <DropdownItem key="for_patients">For Patients</DropdownItem>
            <DropdownItem key="for_medical_professionals">
              For Medical Professionals
            </DropdownItem>
            <DropdownItem key="for_team_members">For Team Members</DropdownItem>
            <DropdownItem key="for_the_community">
              For the Community
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      {buttonList.map((item) => (
        <div
          key={item.id}
          className={"my-4 mx-2 border-1 shadow-lg rounded-lg border-gray-300"}
        >
          <Button
            fullWidth
            className="p-11 rounded-lg relative capitalize text-md font-bold text-blue-700"
            variant="light"
          >
            <SecondNavIcon iconName={item.id.toString()} />
            <p>{item.name}</p>
          </Button>
        </div>
      ))}
    </div>
  );
}

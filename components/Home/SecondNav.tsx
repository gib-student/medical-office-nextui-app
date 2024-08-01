import { Button } from "@nextui-org/button";
import { ChevronDownIcon } from "@/components/Home/ChevronDownIcon";
import {
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
} from "@nextui-org/dropdown";
import { useState, useMemo } from "react";
import { Styles } from "../styles";

export default function SecondNav() {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["for_patients"]));
  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );
  const buttonStrings = [
    "Make an Appointment",
    "MyChart Patient Portal",
    "Pay a Bill",
    "Services and Conditions",
  ];

  return (
    <div className="border-slate-300 border-1 rounded-lg m-5 p-2 bg-white mt-[-8vh]">
      <div className="flex justify-center">
        <Dropdown>
          <div className="border-1 mt-2 mx-2 rounded-lg border-gray-700 w-full">
            <DropdownTrigger>
              <Button
                variant="light"
                className="p-8 rounded-lg relative capitalize text-xl"
                fullWidth
                style={{ justifyContent: "flex-start" }}
              >
                {selectedValue}
                <div className="absolute right-6">
                  <ChevronDownIcon />
                </div>
              </Button>
            </DropdownTrigger>
          </div>
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
            <DropdownItem key="for_team_members">For Team Members</DropdownItem>
            <DropdownItem key="for_the_community">
              For the Community
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      {buttonStrings.map((text) => (
        <div className={Styles.secondaryNavDiv}>
          <Button
            variant="light"
            className={Styles.secondaryNavButton}
            fullWidth
          >
            {text}
          </Button>
        </div>
      ))}
    </div>
  );
}

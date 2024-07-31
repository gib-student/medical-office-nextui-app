import { Button, ButtonGroup } from "@nextui-org/button";
import { ChevronDownIcon } from "@/components/ChevronDownIcon";
import {
  Dropdown,
  DropdownItem,
  DropdownTrigger,
  DropdownMenu,
} from "@nextui-org/dropdown";
import { useState, useMemo } from "react";

export default function SecondNav() {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["for_patients"]));
  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );
  const secondaryNavDiv =
    "my-4 mx-2 border-1 shadow-lg rounded-lg border-gray-300";
  const secondaryNavButton =
    "p-11 rounded-lg relative capitalize text-lg font-bold text-blue-700";

  return (
    <div className="border-slate-300 border-1 rounded-lg m-5 p-2 bg-white mt-[-8vh] gap-4">
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
      <div className={secondaryNavDiv}>
        <Button variant="light" className={secondaryNavButton} fullWidth>
          Make an Appointment
        </Button>
      </div>
      <div className={secondaryNavDiv}>
        <Button variant="light" className={secondaryNavButton} fullWidth>
          MyChart Patient Portal
        </Button>
      </div>
      <div className={secondaryNavDiv}>
        <Button variant="light" className={secondaryNavButton} fullWidth>
          Pay a Bill
        </Button>
      </div>
      <div className={secondaryNavDiv}>
        <Button variant="light" className={secondaryNavButton} fullWidth>
          Services and Conditions
        </Button>
      </div>
    </div>
  );
}

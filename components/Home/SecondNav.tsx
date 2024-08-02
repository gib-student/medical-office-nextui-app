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
  const [selectedKey, setSelectedKeys] = useState("for_patients");
  const selectedValue = useMemo(
    () => selectedKey.toString().replace("_", " "),
    [selectedKey]
  );

  const selectionChanged = (arg: any) => {
    if (typeof arg === "object") {
      let print = Array.from(arg).join(", ").replaceAll("_", " ");

      console.log(print);
      // console.log(typeof arg);
      setSelectedKeys(print);
      return;
    }
    setSelectedKeys(arg);
  };

  const for_patients_Obj = [
    { id: 0, name: "Make an Appointment", icon: "" },
    { id: 1, name: "MyChart Patient Portal", icon: "" },
    { id: 2, name: "Pay a Bill", icon: "" },
    { id: 3, name: "Services and Conditions", icon: "" },
  ];
  const for_medical_professionals_Obj = [
    { id: 0, name: "Transfer a Patient", icon: "" },
    { id: 1, name: "Continuing Medical Education", icon: "" },
    { id: 2, name: "Careers", icon: "" },
    { id: 3, name: "Research and Education", icon: "" },
  ];
  const for_team_members_Obj = [
    { id: 0, name: "Team Member Resources", icon: "" },
    { id: 1, name: "Physician Access", icon: "" },
    { id: 2, name: "Shop TriHealth Merchandise", icon: "" },
    { id: 3, name: "Current Job Listings", icon: "" },
  ];
  const for_the_community_Obj = [
    { id: 0, name: "Classes and Events", icon: "" },
    { id: 1, name: "Health and Fitness Pavilion", icon: "" },
    { id: 2, name: "TriHealth Corporate Health", icon: "" },
    { id: 3, name: "TriHealth Foundation", icon: "" },
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
            aria-label="Second Nav Dropdown"
            variant="flat"
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selectedKey}
            onSelectionChange={selectionChanged}
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
      {buttonList.map((item) => (
        <div className={Styles.secondaryNavDiv} key={item.id}>
          <Button
            variant="light"
            className={Styles.secondaryNavButton}
            fullWidth
          >
            {item.name}
          </Button>
        </div>
      ))}
    </div>
  );
}

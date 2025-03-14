import { Button, Form, Input } from "@heroui/react";
import { useState } from "react";

export default function NewAccountForm({ handleSubmit }) {
  const [formData, setFormData] = useState({
    ssn: "",
    dob: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  return (
    <>
      <Form onSubmit={handleFormSubmit}>
        <div className="flex flex-col gap-4 max-w-md">
          <Input
            isRequired
            errorMessage="Please enter a valid SSN"
            label="Social Security Number"
            labelPlacement="outside"
            name="ssn"
            placeholder="Enter your SSN"
            type="text"
            value={formData.ssn}
            onValueChange={(value) => setFormData({ ...formData, ssn: value })}
            className=""
          />
          <div>
            <Input isRequired errorMessage="" />
            <Input isRequired errorMessage="" />
            <Input isRequired errorMessage="" />
          </div>
          <Button type="submit">Submit</Button>
        </div>
      </Form>
    </>
  );
}

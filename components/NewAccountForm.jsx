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

  const [dobDay, setDobDay] = useState("");
  const [dobMonth, setDobMonth] = useState("");
  const [dobYear, setDobYear] = useState("");
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  const updateDob = (day, month, year) => {
    if (day && month && year) {
      const date = new Date(year, month - 1, day); // month is 0-indexed
      const timestampInSeconds = Math.floor(date.getTime() / 1000);

      setFormData({
        ...formData,
        dob: timestampInSeconds,
      });
      console.log("DOB in seconds:", timestampInSeconds);
    }
  };

  return (
    <>
      <Form onSubmit={handleFormSubmit}>
        <div className="flex flex-col gap-4 max-w-md">
          <div></div>
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
            className="w-4/6 border-solid border-2 border-gray-500 rounded-md"
          />
          <h3>
            Date of Birth<span className="text-red-500">*</span>
          </h3>
          <div className="flex gap-3 w-4/6 text-center">
            <Input
              className=" border-solid border-2 border-gray-500 rounded-md text-center"
              label="dd"
              labelPlacement="outside"
              name="dobDay"
              placeholder="dd"
              type="number"
              value={dobDay}
              onValueChange={(value) => {
                setDobDay(value);
                updateDob(value, dobMonth, dobYear);
              }}
            />
            <Input
              className=" border-solid border-2 border-gray-500 rounded-md"
              label="mm"
              labelPlacement="outside"
              name="dobMonth"
              placeholder="mm"
              type="number"
              value={dobMonth}
              onValueChange={(value) => {
                setDobMonth(value);
                updateDob(dobDay, value, dobYear);
              }}
            />
            <Input
              className=" border-solid border-2 border-gray-500 rounded-md"
              label="yyyy"
              labelPlacement="outside"
              name="dobYear"
              placeholder="yyyy"
              type="number"
              value={dobYear}
              onValueChange={(value) => {
                setDobYear(value);
                updateDob(dobDay, dobMonth, value);
              }}
            />
          </div>
          <Input
            className="border-solid border-2 border-gray-500 rounded-md w-1/2"
            label="First Name"
            labelPlacement="outside"
            name="firstName"
            placeholder="Enter your first name"
            type="text"
            value={formData.firstName}
            onValueChange={(value) =>
              setFormData({ ...formData, firstName: value })
            }
          />
          <Input
            className="border-solid border-2 border-gray-500 rounded-md w-1/2"
            label="Last Name"
            labelPlacement="outside"
            name="lastName"
            placeholder="Enter your last name"
            type="text"
            value={formData.lastName}
            onValueChange={(value) =>
              setFormData({ ...formData, lastName: value })
            }
          />
          <Input
            className="border-solid border-2 border-gray-500 rounded-md w-1/2"
            label="Email"
            labelPlacement="outside"
            name="email"
            placeholder="Enter your email"
            type="email"
            value={formData.email}
            onValueChange={(value) =>
              setFormData({ ...formData, email: value })
            }
          />
          <Input
            className="border-solid border-2 border-gray-500 rounded-md w-1/2"
            label="Phone"
            labelPlacement="outside"
            name="phone"
            placeholder="Enter your phone number"
            type="tel"
            value={formData.phone}
            onValueChange={(value) =>
              setFormData({ ...formData, phone: value })
            }
          />
          <Input
            className="border-solid border-2 border-gray-500 rounded-md w-1/2"
            label="Address"
            labelPlacement="outside"
            name="address"
            placeholder="Enter your address"
            type="text"
            value={formData.address}
            onValueChange={(value) =>
              setFormData({ ...formData, address: value })
            }
          />
          <Button className="w-1/2" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
}

"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";

import { EyeFilledIcon } from "@/components/icons";
import { EyeSlashFilledIcon } from "@/components/icons";

export default function MyChartLoginPage() {
  return (
    <div>
      <h1>MyChart Login</h1>
      <Button>
        <Link>Log into MyChart</Link>
      </Button>
      <Button>
        <Link>Create a New Account</Link>
      </Button>

      {/* Enter username */}
      <Input
        isClearable
        type="username"
        label="Email"
        placeholder="Enter your email"
      />
      {/* Enter password */}
      <Input
        className="max-w-xs"
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
            aria-label="toggle password visibility"
          >
            {isVisible ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        label="Password"
        onValueChange={setPasswordInput}
        placeholder="Enter your password"
        type={isVisible ? "text" : "password"}
        variant="bordered"
      />
      {/* Confirm password */}
      <Input
        className="max-w-xs"
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility2}
            aria-label="toggle password visibility"
          >
            {isVisible2 ? (
              <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            ) : (
              <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
            )}
          </button>
        }
        errorMessage="Please ensure your passwords match"
        // Only check if the password is invalid if they have tried to
        // sign in at least once before
        isInvalid={loginAttempted ? !passwordConfirmed : false}
        label="Confirm password"
        onValueChange={setPasswordConfirmInput}
        placeholder="Enter your password again"
        type={isVisible2 ? "text" : "password"}
        variant="bordered"
      />
      <Button onPress={signIn}>Sign In</Button>
    </div>
  );
}

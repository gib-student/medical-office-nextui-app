"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";

import { EyeFilledIcon } from "@/components/icons";
import { EyeSlashFilledIcon } from "@/components/icons";

import { useEffect, useState } from "react";

import { initializeApp } from "firebase/app";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyA4mz3wNmt3e5wMtI-UHFeghxIseHHNbnM",
  authDomain: "medical-office-nextui-app.firebaseapp.com",
  projectId: "medical-office-nextui-app",
  storageBucket: "medical-office-nextui-app.appspot.com",
  messagingSenderId: "948530169418",
  appId: "1:948530169418:web:5ab24c380ee069c1c988b3",
  measurementId: "G-EDBBS02E7T",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default function MyChartLoginPage() {
  const [password, setPassword] = useState("");

  const [passwordInput, setPasswordInput] = useState("");
  const [passwordConfirmInput, setPasswordConfirmInput] = useState("");
  // Different from having officially confirmed passwords; simply meant to track
  // if the passwords match for ease of use

  const [passwordEntered, setPasswordEntered] = useState(false);
  const [passwordConfirmed, setPasswordConfirmed] = useState(false);
  const [newPassword, setNewPassword] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibility2 = () => setIsVisible2(!isVisible2);

  // Compare passwords and update the error status at every change
  const passwordChanged = (text: string) => {
    setPasswordInput(text);
    comparePasswords();
  };
  const confirmPasswordChanged = (text: string) => {
    setPasswordConfirmInput(text);
    comparePasswords();
  };
  const comparePasswords = () => {
    const isMatch = passwordInput === passwordConfirmInput;
    setNewPassword(isMatch);
  };

  const signIn = () => {
    setPasswordEntered(true);
    // If the two passwords match, proceed to sign in
    if (passwordInput === passwordConfirmInput) {
      setPasswordConfirmed(true);

      setPassword(passwordInput);
    } else {
      // Otherwise stop and let them try again
      setPasswordConfirmed(false);
    }
  };

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
        // Check if the passwords match only after they've entered them and
        // tried to sign in at least once.
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
        isInvalid={passwordEntered ? !passwordConfirmed : false}
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

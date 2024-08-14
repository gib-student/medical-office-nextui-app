"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";

import { EyeFilledIcon } from "@/components/icons";
import { EyeSlashFilledIcon } from "@/components/icons";

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { useState } from "react";

// Initialize Firebase
// const app = initializeApp(firebaseConfig);

// Ensure password meets requirements
const ensureComplexPassword = (testPassword: string) => {
  /* Regex:
  Has minimum 8 characters in length. Adjust it by modifying {8,}
  * At least one uppercase English letter. 
    You can remove this condition by removing (?=.*?[A-Z])
  * At least one lowercase English letter.  
    You can remove this condition by removing (?=.*?[a-z])
  * At least one digit. 
    You can remove this condition by removing (?=.*?[0-9])
  * At least one special character,  
    You can remove this condition by removing (?=.*?[#?!@$%^&*-]) */
  const regex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  return regex.test(testPassword);
};

const ensureValidEmailFormat = (testEmail: string) => {
  /* One or more characters that can be letters (a-z, A-Z), digits (0-9), 
  underscores (_), dots (.), plus signs (+), or hyphens (-).
  @	The at symbol, which is required in all valid email addresses.
  [a-zA-Z0-9-]+	One or more characters that can be letters (a-z, A-Z), 
  digits (0-9), or hyphens (-). This represents the domain name.
  .	The dot character, which is used to separate the domain name from 
  the top-level domain (TLD).
  [a-zA-Z0-9-.]+	One or more characters that can be letters (a-z, A-Z), 
  digits (0-9), hyphens (-), or dots (.). This represents the TLD. */

  const regex = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
  return regex.test(testEmail);
};

const passwordErrorMessages = {
  default: "default message",
  emptyPasswordField: "Please enter a password.",
  emptyConfirmPasswordField: "Please confirm your password.",
  simplePassword:
    "Password does not meet requirements. It must be at contain at least 8 characters, a lower-case letter, an upper-case letter, and 1 special character.",
  differentPasswords: "Confirmation password does not match.",
};

const emailErrorMessages = {
  default: "Please enter your email.",
  emptyEmailField: "Please enter your email.",
  wrongFormat:
    "Invalid email format. Please enter an email address like 'johndoe@gmail.com'.",
  invalidEmail: "Please enter a valid email address.",
};

export default function MyChartLoginPage() {
  // Email values
  const [email, setEmail] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [emailMatchesFormat, setEmailMatchesFormat] = useState(false);
  const [emailConfirmed, setEmailConfirmed] = useState(false);

  // Password values
  const [password, setPassword] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordIsComplex, setpasswordIsComplex] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [passwordConfirmed, setPasswordConfirmed] = useState(false);

  // Confirm password values
  const [passwordConfirmInput, setPasswordConfirmInput] = useState("");

  // Login attempted
  const [loginAttempted, setLoginAttempted] = useState(false);

  // Password visibility
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibility2 = () => setIsVisible2(!isVisible2);

  /***** Sign in with Google Authentication *****/
  const signIn = () => {
    // Record that a sign-in was attemped
    setLoginAttempted(true);

    // Confirm password
    // Test 1: Password meets complexity requirements
    const complex = ensureComplexPassword(passwordInput);
    // Test 2: Confirmation password matches original one
    const match = passwordInput === passwordConfirmInput;
    // Record results
    const isPasswordValid = match && complex;
    setPasswordsMatch(match);
    setpasswordIsComplex(complex);
    setPasswordConfirmed(isPasswordValid);

    // Confirm email
    // Test 1: Ensure email matches the correct format
    const correctEmailFormat = ensureValidEmailFormat(emailInput);
    setEmailMatchesFormat(correctEmailFormat);
    setEmailConfirmed(correctEmailFormat);

    if (isPasswordValid && emailConfirmed) {
      setPassword(passwordInput); // set official password
      setEmail(emailInput); // set official email

      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("Logged In. User: " + user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          console.log("Sign-in failed.");
          console.log("Error Code: " + errorCode);
          console.log("Error Message: " + errorMessage);
        });
    }
  };
  /***** End Authentication *****/

  // Get error messages
  const getEmailFieldErrorMessage = () => {
    let message = emailErrorMessages.default; // Set code to default
    // Case 1: Empty email field
    if (emailInput === "") {
      message = emailErrorMessages.emptyEmailField;
    } else if (!emailMatchesFormat) {
      // Case 2: wrong format
      message = emailErrorMessages.wrongFormat;
    } else if (!emailConfirmed) {
      // Case 3: invalid email
      message = emailErrorMessages.invalidEmail;
    }

    return message;
  };
  const getPasswordFieldErrorMessage = () => {
    let message = passwordErrorMessages.default; // Set code to default
    // Case 1: Empty email field
    if (passwordInput === "") {
      message = passwordErrorMessages.emptyPasswordField;
    } else if (!passwordIsComplex) {
      // Case 2: Password is simple
      message = passwordErrorMessages.simplePassword;
    } else if (!passwordsMatch) {
      // Case 3: Passwords don't match
      message = passwordErrorMessages.differentPasswords;
    }

    return message;
  };
  const getConfirmPasswordErrorMessage = () => {
    let message = passwordErrorMessages.default; // Set code to default
    if (!passwordsMatch) {
      // Case 1: Two passwords don't match
      message = passwordErrorMessages.differentPasswords;
    }

    return message;
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

      {/* Enter email */}
      <Input
        isClearable
        className="max-w-xs"
        errorMessage={getEmailFieldErrorMessage()}
        isInvalid={loginAttempted ? !emailConfirmed : false}
        label="Email"
        onValueChange={setEmailInput}
        placeholder="Enter your email"
        type="text"
        variant="bordered"
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
        errorMessage={getPasswordFieldErrorMessage()}
        isInvalid={loginAttempted ? !passwordConfirmed : false}
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
        errorMessage={getConfirmPasswordErrorMessage()}
        isInvalid={loginAttempted ? !passwordsMatch : false}
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

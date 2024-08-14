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

// Error messages list has 1-1 relationship with codes. Use code as index to access the message.
const passwordErrorCodes = {
  default: 0,
  emptyEmailField: 1,
  emptyPasswordField: 2,
  emptyConfirmPasswordField: 3,
  simplePassword: 4,
};
const passwordErrorMessages = [
  // Default message
  "Please enter your your desired password.",
  // Email not entered first
  "Please enter an email first.",
  // Password field empty
  "Password field is empty. Please enter a password.",
  // Confirm password field is empty
  "Please confirm your password.",
  // Password doesn't match complexity requirements
  "Password does not meet requirements. It must be at contain at least 8 characters, a lower-case letter, an upper-case letter, and 1 special character.",
  // Confirmation password does not match
  "Confirmation password does not match.",
];

const confirmPasswordErrorCodes = {
  default: 0,
  differentPasswords: 1,
};
const confirmPasswordErrorMessages = [
  // Default message
  "Please re-enter your password.",
  // Different passwords
  "Passwords do not match.",
];

// Email error codes and messages; use code as index to get its corresponding message.
const emailErrorCodes = {
  default: 0,
  emptyEmailField: 1,
  wrongFormat: 2,
  invalidEmail: 3,
};
const emailErrorMessages = [
  // Default message
  "Please enter your email.",
  // Empty email field
  "Please enter your email.",
  // Wrong email format
  "Invalid email format. Please enter an email address like 'johndoe@gmail.com'.",
  // Invalid email
  "Please enter a valid email address.",
];

export default function MyChartLoginPage() {
  // Email values
  const [email, setEmail] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [emailMatchesFormat, setEmailMatchesFormat] = useState(false);
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const [emailErrorCode, setEmailErrorCode] = useState(0);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  // Password values
  const [password, setPassword] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordIsComplex, setpasswordIsComplex] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [passwordConfirmed, setPasswordConfirmed] = useState(false);
  const [passwordErrorCode, setPasswordErrorCode] = useState(0);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  // Confirm password values
  const [passwordConfirmInput, setPasswordConfirmInput] = useState("");
  const [confirmPasswordErrorCode, setConfirmPasswordErrorCode] = useState(0);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState("");

  // Login attempted
  const [loginAttempted, setLoginAttempted] = useState(false);

  // Password visibility
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibility2 = () => setIsVisible2(!isVisible2);

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

  const checkEmailInputValid = () => {
    // If a login has been attempted, simplly return the status of email
    // confirmation. Otherwise, the input is valid.
    return loginAttempted ? emailConfirmed : false;
  };
  const checkPasswordInputValid = () => {
    return loginAttempted ? emailConfirmed : false;
  };
  const checkConfirmPasswordInputValid = () => {};

  const checkEmailFieldError = () => {
    let code = 0; // Set code to default
    // Case 1: Empty email field
    if (emailInput === "") {
      code = emailErrorCodes.emptyEmailField;
    } else if (!emailMatchesFormat) {
      // Case 2: wrong format
      code = emailErrorCodes.wrongFormat;
    } else if (!emailConfirmed) {
      // Case 3: invalid email
      code = emailErrorCodes.invalidEmail;
    }

    // Set error code and message
    const message = emailErrorMessages[code];
    setEmailErrorCode(code);
    setEmailErrorMessage(message);

    return message;
  };

  const checkPasswordFieldError = () => {
    let code = 0; // Set code to default
    // Case 1: Empty email field
    if (passwordInput === "") {
      code = passwordErrorCodes.emptyEmailField;
    } else if (!passwordIsComplex) {
      // Case 2: Password is simple
      code = passwordErrorCodes.simplePassword;
    }

    const message = passwordErrorMessages[code];
    setPasswordErrorCode(code);
    setPasswordErrorMessage(message);

    return message;
  };
  const checkConfirmPasswordFieldError = () => {
    let code = 0; // Set code to default
    if (!passwordsMatch) {
      // Case 1: Two passwords don't match
      code = confirmPasswordErrorCodes.differentPasswords;
    }
    const message = confirmPasswordErrorMessages[code];
    setConfirmPasswordErrorCode(code);
    setConfirmPasswordErrorMessage(message);
  };

  const signIn = () => {
    // Record that a sign-in was attemped
    setLoginAttempted(true);

    // Ensure passwords match and it passes the password requirements,
    // and ensure email passes complexity requirements
    const match = passwordInput === passwordConfirmInput;
    const complex = ensureComplexPassword(passwordInput);
    // Record password match
    setPasswordsMatch(match);
    // Record password complexity
    setpasswordIsComplex(complex);
    // Record password confirmation
    const isPasswordValid = match && complex;
    setPasswordConfirmed(isPasswordValid);
    if (isPasswordValid) setPassword(passwordInput); // set official password

    // Ensure email matches the correct format
    const emailFormat = ensureValidEmailFormat(emailInput);

    // If password is valid then proceed to sign-in
    if (isPasswordValid) {
      setPassword(passwordInput);
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
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

      {/* Enter email */}
      <Input
        isClearable
        className="max-w-xs"
        errorMessage={}
        isInvalid={!checkEmailInputValid()}
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
        errorMessage={checkPasswordFieldError}
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
        errorMessage={checkConfirmPasswordFieldError}
        isInvalid={!checkPasswordInputValid()}
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

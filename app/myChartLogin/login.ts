import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { useState } from "react";

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

// Interfaces
interface PasswordInterface {
  password: string;
  passwordInput: string;
  passwordConfirmInput: string;
  loginAttempted: boolean;
  passwordConfirmed: boolean;
}

interface EmailInterface {
  email: string;
  emailInput: string;
  emailAttempted: boolean;
  emailConfirmed: boolean;
}

interface VisibilityInterface {
  isVisible: boolean;
  isVisible2: boolean;
  toggleVisibility: () => void;
  toggleVisibility2: () => void;
}

export const usePasswordState = () => {
  const [passwordState, setPasswordState] = useState<PasswordInterface>({
    password: '',
    passwordInput: '',
    passwordConfirmInput: '',
    loginAttempted: false,
    passwordConfirmed: false,
  });

  return passwordState;
};

export const useEmailState = () => {
  const [emailState, setEmailState] = useState<EmailInterface>({
    email: '',
    emailInput: '',
    emailAttempted: false,
    emailConfirmed: false,
  });

  return emailState;
};

export const useVisibilityState = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleVisibility2 = () => setIsVisible2(!isVisible2);

  return {
    isVisible,
    isVisible2,
    toggleVisibility,
    toggleVisibility2,
  };
};




// // Password values
// const [password, setPassword] = useState("");
// const [passwordInput, setPasswordInput] = useState("");
// const [passwordConfirmInput, setPasswordConfirmInput] = useState("");
// const [loginAttempted, setLoginAttempted] = useState(false);
// const [passwordConfirmed, setPasswordConfirmed] = useState(false);

// // Email values
// const [email, setEmail] = useState("");
// const [emailInput, setEmailInput] = useState("");
// const [emailAttempted, setEmailAttempted] = useState(false);
// const [emailConfirmed, setEmailConfirmed] = useState(false);

// // Password visibility
// const [isVisible, setIsVisible] = useState(false);
// const [isVisible2, setIsVisible2] = useState(false);
// const toggleVisibility = () => setIsVisible(!isVisible);
// const toggleVisibility2 = () => setIsVisible2(!isVisible2);

// Ensure password meets requirements
const validatePassword = (testPassword: string) => {
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

// Sign-in user with Google Authentication
const signIn = () => {
  // Record that a sign-in was attemped
  setLoginAttempted(true);

  // Ensure passwords match and it passes the password requirements
  const isPasswordValid =
    passwordInput === passwordConfirmInput && validatePassword(passwordInput);
  // Record password confirmation
  setPasswordConfirmed(isPasswordValid);

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
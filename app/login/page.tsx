"use client";

import LoginForm from "@/components/LoginForm";
import { db } from "@/firebase";

export default function LoginPage() {
  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-5">MyChart Login</h1>
      <div className="mb-5">
        <LoginForm />
      </div>
    </>
  );
}

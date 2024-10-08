"use client";
import Image from "next/image";
import { useState } from "react";

const RegisterPage = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
      }),
    });
  }
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Register</h1>
      <form className="max-w-xs mx-auto" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          value={userEmail}
          required
          onChange={(ev) => {
            setUserEmail(ev.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          value={userPassword}
          required
          onChange={(ev) => {
            setUserPassword(ev.target.value);
          }}
        />
        <button type="submit">Register</button>
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button className="flex gap-4 justify-center">
          <Image src={"/google.png"} alt={""} width={24} height={24} />
          Login with google
        </button>
      </form>
    </section>
  );
};

export default RegisterPage;

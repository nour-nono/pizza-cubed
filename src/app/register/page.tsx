"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const RegisterPage = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);
  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setCreatingUser(true);
    setUserCreated(false);
    setError(false);
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email: userEmail, password: userPassword }),
      headers: { "Content-Type": "application/json" },
    });
    response.ok ? setUserCreated(true) : setError(true);
    setCreatingUser(false);
  }
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4">Register</h1>
      <form className="max-w-xs mx-auto" onSubmit={handleSubmit}>
        {userCreated && (
          <div className="my-4 text-center">
            User created.
            <br />
            Now you can
            <Link className="underline" href={"/login"}>
              Login &raquo;
            </Link>
          </div>
        )}
        {error && (
          <div className="my-4 text-center">
            An error has occurred.
            <br />
            Please try again later
          </div>
        )}
        <input
          type="email"
          placeholder="email"
          value={userEmail}
          required
          disabled={creatingUser}
          onChange={(ev) => {
            setUserEmail(ev.target.value);
          }}
        />
        <input
          type="password"
          placeholder="password"
          value={userPassword}
          required
          disabled={creatingUser}
          onChange={(ev) => {
            setUserPassword(ev.target.value);
          }}
        />
        <button type="submit" disabled={creatingUser}>
          Register
        </button>
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <button className="flex gap-4 justify-center">
          <Image src={"/google.png"} alt={""} width={24} height={24} />
          Login with google
        </button>
        <div className="text-center my-4 text-gray-500 border-t pt-4">
          Existing account?
          <Link className="underline" href={"/login"}>
            Login here &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
};

export default RegisterPage;

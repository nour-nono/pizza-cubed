'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const RegisterPage = () => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPassword, setUserPassword] = useState<string>("");
  const [userConfirmPassword, setUserConfirmPassword] = useState<string>("");
  const [creatingUser, setCreatingUser] = useState<boolean>(false);
  const [userCreated, setUserCreated] = useState<boolean>(false);
  const [error, setError] = useState<{ message: string }[]>();
  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setCreatingUser(true);
    setUserCreated(false);
    setError(undefined);
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
        confirmPassword: userConfirmPassword,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      setUserCreated(true);
    } else {
      const data = await response.json();
      setError(data.error);
    }
    setCreatingUser(false);
  }
  return (
    <section className="mt-8">
      <h1 className="text-center text-primary text-4xl mb-4 font-bold">
        Register
      </h1>
      <form className="max-w-xs mx-auto" onSubmit={handleSubmit}>
        {userCreated && (
          <div className='my-4 text-center'>
            User created.
            <br />
            Now you can
            <Link
              className='underline'
              href={'/login'}
            >
              Login &raquo;
            </Link>
          </div>
        )}
        {error && (
          <div className="my-4 text-center">
            {error.map(({ message }, index) => (
              <div key={`msg-err-${index}`}>{message}</div>
            ))}
          </div>
        )}
        <input
          type="email"
          placeholder="Email"
          value={userEmail}
          required
          disabled={creatingUser}
          onChange={(ev) => {
            setUserEmail(ev.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={userPassword}
          required
          disabled={creatingUser}
          onChange={(ev) => {
            setUserPassword(ev.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={userConfirmPassword}
          required
          disabled={creatingUser}
          onChange={(ev) => {
            setUserConfirmPassword(ev.target.value);
          }}
        />
        <button type="submit" disabled={creatingUser}>
          Register
        </button>
        <div className='my-4 text-center text-gray-500'>
          or login with provider
        </div>
        <button className='flex gap-4 justify-center'>
          <Image
            src={'/google.png'}
            alt={''}
            width={24}
            height={24}
          />
          Login with google
        </button>
        <div className='text-center my-4 text-gray-500 border-t pt-4'>
          Existing account?
          <Link
            className='underline'
            href={'/login'}
          >
            Login here &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
};

export default RegisterPage;

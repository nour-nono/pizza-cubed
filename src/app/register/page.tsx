'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';

const RegisterPage = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userConfirmPassword, setUserConfirmPassword] = useState('');
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setCreatingUser(true);
    setUserCreated(false);
    setError(null);
    if (userPassword !== userConfirmPassword) {
      setError('Passwords do not match');
      setCreatingUser(false);
      return;
    }
    const response = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
        confirmPassword: userConfirmPassword,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      setUserCreated(true);
    } else {
      const data = await response.json();
      setError(
        data.error[0]?.message || 'An error occurred. Please try again.',
      );
    }
    setCreatingUser(false);
  }
  return (
    <section className='mt-8'>
      <h1 className='text-center text-primary text-4xl mb-4 font-bold'>
        Register
      </h1>
      <form
        className='max-w-xs mx-auto'
        onSubmit={handleSubmit}
      >
        {userCreated && (
          <div className='my-4 text-center'>
            User created.
            <br />
            Now you can{' '}
            <Link
              className='underline'
              href='/login'
            >
              Login »
            </Link>
          </div>
        )}
        {error && <div className='my-4 text-center text-red-500'>{error}</div>}
        <input
          type='email'
          placeholder='Email'
          value={userEmail}
          required
          disabled={creatingUser}
          onChange={(ev) => setUserEmail(ev.target.value)}
          className='w-full p-2 mb-2 border rounded'
        />
        <input
          type='password'
          placeholder='Password'
          value={userPassword}
          required
          disabled={creatingUser}
          onChange={(ev) => setUserPassword(ev.target.value)}
          minLength={8}
          className='w-full p-2 mb-2 border rounded'
        />
        <input
          type='password'
          placeholder='Confirm password'
          value={userConfirmPassword}
          required
          disabled={creatingUser}
          onChange={(ev) => setUserConfirmPassword(ev.target.value)}
          minLength={8}
          className='w-full p-2 mb-2 border rounded'
        />
        <button
          type='submit'
          disabled={creatingUser}
        >
          {creatingUser ? 'Creating account...' : 'Register'}
        </button>
        <div className='my-4 text-center text-gray-500'>
          or login with provider
        </div>
        <button
          className='flex gap-4 justify-center'
          type='button'
          onClick={() => signIn('google', { callbackUrl: '/' })}
        >
          <Image
            src={'/google.png'}
            alt={'Google logo'}
            width={24}
            height={24}
          />
          Login with Google
        </button>
        <div className='text-center my-4 text-gray-500 border-t pt-4'>
          Existing account?{' '}
          <Link
            className='underline'
            href={'/login'}
          >
            Login here »
          </Link>
        </div>
      </form>
    </section>
  );
};

export default RegisterPage;

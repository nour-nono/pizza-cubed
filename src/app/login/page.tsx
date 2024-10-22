'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [loggingSuccess, setLoggingSuccess] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setLoginInProgress(true);
    setError('');

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    if (res?.ok) {
      setLoggingSuccess(true);
    } else {
      setError('Invalid email or password');
    }

    setLoginInProgress(false);
  }

  useEffect(() => {
    if (loggingSuccess) {
      router.push('/');
    }
  }, [loggingSuccess, router]);

  return (
    <section className='mt-8'>
      <h1 className='text-center text-primary text-4xl mb-4 font-bold'>
        Login
      </h1>
      <form
        className='max-w-xs mx-auto'
        onSubmit={handleSubmit}
      >
        <input
          type='email'
          name='email'
          placeholder='email'
          value={email}
          disabled={loginInProgress}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <input
          type='password'
          name='password'
          placeholder='password'
          value={password}
          disabled={loginInProgress}
          onChange={(ev) => setPassword(ev.target.value)}
        />
        <button
          disabled={loginInProgress}
          type='submit'
        >
          {loginInProgress ? 'Logging in...' : 'Login'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className='my-4 text-center text-gray-500'>
          or login with provider
        </div>
        <button
          type='button'
          onClick={() => signIn('google', { callbackUrl: '/' })}
          className='flex gap-4 justify-center'
        >
          <Image
            src={'/google.png'}
            alt={'Google logo'}
            width={24}
            height={24}
          />
          Login with google
        </button>
      </form>
    </section>
  );
}

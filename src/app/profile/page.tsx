'use client';
import Image from 'next/image';
import { User } from '../models/User';
import UserTabs from '@/components/layout/UserTabs';
import { useSession } from 'next-auth/react';
import UserForm from '@/components/layout/UserForm';
import { Session } from 'next-auth';
import { redirect } from 'next/navigation';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';

export default function ProfilePage() {
  const session = useSession();
  const status = session.status;
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);

  async function handleProfileInfoUpdate(ev, data) {
    ev.preventDefault();

    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      response.ok
        ? resolve(undefined)
        : reject(new Error('Failed to save profile'));
    });

    await toast.promise(savingPromise, {
      loading: 'Saving...',
      success: 'Profile saved!',
      error: 'Error',
    });
  }
  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    return redirect('/login'); // Redirect to login page
  }

  return (
    <section className='mt-8'>
      <UserTabs isAdmin={isAdmin} />
      <div className="max-w-2xl mx-auto mt-8">
        <UserForm user={user} onSave={handleProfileInfoUpdate} />
      {/* <h1 className='text-center text-primary text-4xl mb-4 font-bold'>
        Profile
      </h1>
      <div className='max-w-md mx-auto'>
        <div className='flex gap-4 items-center'>
          <form className='grow'>
            <input
              type='text'
              placeholder='NAME'
            />
            <input
              type='email'
              placeholder='EMAIL'
            />
            <button type='submit'>Save</button>
          </form>
        </div> */}
      </div>
    </section>
  );
}

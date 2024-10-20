'use client';
import UserTabs from '@/components/layout/UserTabs';
import { useSession } from 'next-auth/react';
import UserForm from '@/components/layout/UserForm';
import { redirect } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { useState, useEffect } from 'react';

export default function ProfilePage() {
  const session = useSession();
  const status = session.status;
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileFetched, setProfileFetched] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/profile').then((response) => {
        response.json().then((data) => {
          data = data[0];
          setUser(data);
          setIsAdmin(data?.userInfos?.admin);
          setProfileFetched(true);
        });
      });
    }
  }, [session, status]);

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

  if (status === 'unauthenticated') {
    return redirect('/login'); // Redirect to login page
  }

  if (status === 'loading' || !profileFetched) {
    return <p>Loading...</p>;
  }

  return (
    <section className='mt-8'>
      <Toaster />
      <UserTabs isAdmin={isAdmin} />
      <div className='max-w-2xl mx-auto mt-8'>
        <UserForm
          user={user}
          onSave={handleProfileInfoUpdate}
        />
      </div>
    </section>
  );
}

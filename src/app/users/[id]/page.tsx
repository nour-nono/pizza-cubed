'use client';
import UserForm from '@/components/layout/UserForm';
import UserTabs from '@/components/layout/UserTabs';
import { useProfile } from '@/components/UseProfile';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const EditUserPage = () => {
  const [user, setUser] = useState(null);
  const { loading: profileLoading, data: profileData } = useProfile();
  const { id } = useParams();

  useEffect(() => {
    fetch('/api/profile?_id=' + id).then((res) => {
      res.json().then((user) => {
        setUser(user[0]);
      });
    });
  }, []);

  async function handleSaveButtonClick(ev, data) {
    ev.preventDefault();
    const promise = new Promise(async (resolve, reject) => {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, _id: id }),
      });
      if (res.ok) resolve(null);
      else reject();
    });

    await toast.promise(promise, {
      loading: 'Saving...',
      success: 'User saved',
      error: 'An error has occurred while saving the user',
    });
  }

  if (profileLoading) {
    return 'Loading user info...';
  }

  if (!profileData?.userInfos?.admin) {
    return 'Not an admin';
  }

  return (
    <section className='mt-8 mx-auto max-w-2xl'>
      <UserTabs isAdmin={true} />
      <div className='mt-8'>
        <UserForm
          user={user}
          onSave={handleSaveButtonClick}
        />
      </div>
    </section>
  );
};

export default EditUserPage;

'use client';
import Left from '@/components/icons/Left';
import MenuItemForm from '@/components/layout/MenuItemForm';
import UserTabs from '@/components/layout/UserTabs';
import { useProfile } from '@/components/UseProfile';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

const NewMenuItemPage = () => {
  const [redirectToItems, setRedirectToItems] = useState(false);
  const { loading: profileLoading, data: profileData } = useProfile();

  if (profileLoading) {
    return 'Loading user info...';
  }

  if (!profileData?.userInfos?.admin) {
    return 'Not an admin';
  }

  async function handleFormSubmit(ev, data) {
    ev.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/menu-items', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
      response.ok ? resolve(null) : reject();
    });

    await toast.promise(savingPromise, {
      loading: 'Saving...',
      success: 'Saved',
      error: 'Error',
    });

    setRedirectToItems(true);
  }

  if (redirectToItems) {
    return redirect('/menu-items');
  }

  return (
    <section className='mt-8'>
      <UserTabs isAdmin={true} />
      <div className='max-w-2xl mx-auto mt-8'>
        <Link
          href={'/menu-items'}
          className='button'
        >
          <Left />
          <span>Show all menu items</span>
        </Link>
      </div>
      <MenuItemForm
        menuItem={null}
        onSubmit={handleFormSubmit}
      />
    </section>
  );
}

export default function NewMenuItemPage;

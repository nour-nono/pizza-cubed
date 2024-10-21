"use client";

import UserTabs from '@/components/layout/UserTabs';
import { useProfile } from '@/components/UseProfile';



const MenuItemPage = () => {

  const { loading: profileLoading, data: profileData } = useProfile();

  if (profileLoading) {
    return 'Loading user info...';
  }

  if (!profileData?.userInfos?.admin) {
    return 'Not an admin';
  }

  return (
    <section className='mt-8'>
      <UserTabs isAdmin={true} />
      <form className='mt-8 max-w-md mx-auto'>
        <div className='flex items-start gap-2'>
          <div className='grow'>
            <input type='text' />
            <label>Item name</label>

            <input type='text' />
            <label>Description</label>

            <input type='text' />
            <label>Base Price</label>

            <input type='text' />
            <button type='submit'>Save</button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default  MenuItemPage;
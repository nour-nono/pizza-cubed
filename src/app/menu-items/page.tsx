'use client';

import UserTabs from '@/components/layout/UserTabs';
import { useProfile } from '@/components/UseProfile';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Right from '@/components/icons/Right';

const MenuItemPage = () => {
  const { loading: profileLoading, data: profileData } = useProfile();
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetch('/api/menu-items').then((res) => {
      res.json().then((menus) => {
        setMenuItems(menus);
      });
    });
  }, []);

  if (profileLoading) {
    return 'Loading user info...';
  }

  if (!profileData?.userInfos?.admin) {
    return 'Not an admin';
  }

  return (
    <section className='mt-8 max-w-2xl mx-auto'>
      <UserTabs isAdmin={true} />
      <div className='mt-8'>
        <Link
          className='button flex'
          href={'/menu-items/new'}
        >
          <span>Crete new menu item</span>
          <Right />
        </Link>
      </div>
      <div>
        {menuItems?.length > 0 && (
          <>
            <h2 className='text-sm text-gray-500 mt-8'>Edit menu item:</h2>
            <div className='grid grid-cols-3 gap-2'>
              {menuItems.map((item) => (
                <Link
                  key={item._id}
                  href={'/menu-items/edit/' + item._id}
                  className='bg-gray-200 rounded-lg p-4'
                >
                  <div className='relative'>
                    <Image
                      className='rounded-md'
                      src={item.image}
                      alt={''}
                      width={200}
                      height={200}
                    />
                  </div>
                  <div className='text-center'>{item.name}</div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default MenuItemPage;

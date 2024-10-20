'use client';
import UserTabs from '@/components/layout/UserTabs';
import { useEffect, useState } from 'react';
import DeleteButton from '@/components/DeleteButton';
import { useProfile } from '@/components/UseProfile';
export default function CategoriesPage() {
  const [allCategories, setAllCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const {loading:profileLoading, data:profileData} = useProfile();

  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) => {
        setAllCategories(data);
      });
  }, []);

  if (profileLoading) {
    return 'Loading user info...';
  }

  if (!profileData?.userInfos?.admin) {
    return 'Not an admin';
  }

  return (
    <section className='mt-8 max-w-lg mx-auto'>
      <UserTabs isAdmin={true} />
      <form className='mt-8' onSubmit={handleCategorySubmit}>
        <div className='flex gap-2 items-end'>
          <div className='grow'>
            <label>New Category name</label>
            <input type='text' />
          </div>
          <div className='pb-2'>
            <button
              className='border border-primary'
              type='submit'
            >
              Create
            </button>
          </div>
        </div>
      </form>
      <div>
        <h2 className='mt-8 text-sm text-gray-500'>Edit Category:</h2>
        {allCategories?.length > 0 && allCategories.map(c => (
          <div
            key={c._id}
            className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center">
            <div className="grow">
              {c.name}
            </div>
            <div className="flex gap-1">
              <button type="button"
                      onClick={() => {
                        setEditedCategory(c);
                        setCategoryName(c.name);
                      }}
              >
                Edit
              </button>
              <DeleteButton
                label="Delete"
                onDelete={() => handleDeleteClick(c._id)} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

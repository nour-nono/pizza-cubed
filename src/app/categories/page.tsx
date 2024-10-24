'use client';
import UserTabs from '@/components/layout/UserTabs';
import { useEffect, useState } from 'react';
import DeleteButton from '@/components/DeleteButton';
import { useProfile } from '@/components/UseProfile';
import toast from 'react-hot-toast';
const CategoriesPage: React.FC = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const { loading: profileLoading, data: profileData } = useProfile();
  const [editedCategory, setEditedCategory] = useState(null);

  const getAllCategories = () => {
    fetch('/api/categories').then((res) => {
      res.json().then((categories) => {
        setAllCategories(categories);
      });
    });
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  async function handleCategorySubmit(ev) {
    ev.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: categoryName };
      editedCategory?._id && (data._id = editedCategory._id); // if editingCategory exist add _id to data
      const response = await fetch('/api/categories', {
        method: editedCategory ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setCategoryName('');
      getAllCategories();
      setEditedCategory(null);
      response.ok ? resolve(null) : reject();
    });
    await toast.promise(creationPromise, {
      loading: editedCategory
        ? 'Updating category...'
        : 'Creating your new category...',
      success: editedCategory ? 'Category updated' : 'Category created',
      error: 'Error, sorry...',
    });
  }

  const handleDeleteClick = async (_id) => {
    const deletePromise = new Promise(async (resolve, reject) => {
      const response = await fetch('/api/categories?_id=' + _id, {
        method: 'DELETE',
      });
      response.ok ? resolve(null) : reject();
    });

    await toast.promise(deletePromise, {
      loading: 'Deleting...',
      success: 'Deleted',
      error: 'Error',
    });

    getAllCategories();
  };

  if (profileLoading) {
    return 'Loading user info...';
  }

  if (!profileData?.userInfos?.admin) {
    return 'Not an admin';
  }

  return (
    <section className='mt-8 max-w-lg mx-auto'>
      <UserTabs isAdmin={true} />
      <form
        className='mt-8'
        onSubmit={handleCategorySubmit}
      >
        <div className='flex gap-2 items-end'>
          <div className='grow'>
            <label>
              {editedCategory ? (
                <>
                  {'Update category: '} <b>{editedCategory.name}</b>
                </>
              ) : (
                'New category name'
              )}
            </label>
            <input
              type='text'
              required
              value={categoryName}
              onChange={(ev) => setCategoryName(ev.target.value)}
            />
          </div>
          <div className='pb-2 flex gap-2'>
            <button
              className='border border-primary'
              type='submit'
            >
              {editedCategory ? 'Update' : 'Create'}
            </button>
            <button
              type='button'
              onClick={() => {
                setEditedCategory(null);
                setCategoryName('');
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      <div>
        {allCategories?.length > 0 && (
          <>
            <h2 className='mt-8 text-sm text-gray-500'>Edit Category:</h2>
            {allCategories.map((c) => (
              <div
                key={c._id}
                className='bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center'
              >
                <div className='grow'>{c.name}</div>
                <div className='flex gap-1'>
                  <button
                    type='button'
                    onClick={() => {
                      setEditedCategory(c);
                      setCategoryName(c.name);
                    }}
                  >
                    Edit
                  </button>
                  <DeleteButton
                    label='Delete'
                    onDelete={() => handleDeleteClick(c._id)}
                  />
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default CategoriesPage;

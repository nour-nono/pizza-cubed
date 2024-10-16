import UserTabs from '@/components/layout/UserTabs';

export default function MenuItemPage() {
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

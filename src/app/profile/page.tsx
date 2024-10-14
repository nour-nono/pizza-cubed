import Image from 'next/image';
import { User } from '../models/User';
import UserTabs from '@/components/layout/UserTabs';
export default function ProfilePage() {
  return (
    <section className='mt-8'>
      <h1 className='text-center text-primary text-4xl mb-4 font-bold'>
        Profile
      </h1>
      <UserTabs isAdmin={true} />
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
        </div>
      </div>
    </section>
  );
}

'use client';
import AddressInputs from '@/components/layout/AddressInputs';
import { useState, useEffect } from 'react';
import { CldUploadWidget, CldImage } from 'next-cloudinary';
import Image from 'next/image';
import { useProfile } from '@/components/UseProfile';
import ImageComponent from '@/components/layout/ImageComponent';

export default function UserForm({ user, onSave }) {
  const [userName, setUserName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.userInfos?.phone || '');
  const [streetAddress, setStreetAddress] = useState(
    user?.userInfos?.streetAddress || '',
  );
  const [postalCode, setPostalCode] = useState(
    user?.userInfos?.postalCode || '',
  );
  const [city, setCity] = useState(user?.userInfos?.city || '');
  const [country, setCountry] = useState(user?.userInfos?.country || '');
  const [admin, setAdmin] = useState(user?.userInfos?.admin || false);
  const [imageUrl, setImageUrl] = useState(
    user?.image || 'samples/man-portrait',
  );
  const { data: loggedInUserData } = useProfile();

  useEffect(() => {
    setUserName(user?.name || '');
    setPhone(user?.userInfos?.phone || '');
    setStreetAddress(user?.userInfos?.streetAddress || '');
    setPostalCode(user?.userInfos?.postalCode || '');
    setCity(user?.userInfos?.city || '');
    setCountry(user?.userInfos?.country || '');
    setAdmin(user?.userInfos?.admin || false);
    setImageUrl(user?.image || 'https://placehold.co/250x250/jpeg');
  }, [user]);

  function handleAddressChange(propName, value) {
    if (propName === 'phone') setPhone(value);
    if (propName === 'streetAddress') setStreetAddress(value);
    if (propName === 'postalCode') setPostalCode(value);
    if (propName === 'city') setCity(value);
    if (propName === 'country') setCountry(value);
  }

  return (
    <div className='md:flex gap-4'>
      <div>
        <div className='p-2 rounded-lg relative max-w-52'>
          <ImageComponent
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
          />
        </div>
      </div>
      <form
        className='grow'
        onSubmit={(ev) => {
          const Ins = {
            name: userName,
            phone,
            admin,
            streetAddress,
            city,
            country,
            postalCode,
          };
          for (let key in Ins) {
            if (
              Ins[key] === null ||
              Ins[key] === undefined ||
              Ins[key] === ''
            ) {
              delete Ins[key];
            }
          }
          onSave(ev, Ins);
        }}
      >
        <label>First and last name</label>
        <input
          type='text'
          placeholder='First and last name'
          value={userName}
          onChange={(ev) => setUserName(ev.target.value)}
        />
        <label htmlFor='emailInput'>Email</label>
        <input
          type='email'
          disabled={true}
          value={user?.email}
          placeholder={'email'}
          id='emailInput'
        />
        <AddressInputs
          addressProps={{ phone, streetAddress, postalCode, city, country }}
          setAddressProp={handleAddressChange}
        />
        {loggedInUserData?.userInfos?.admin && (
          <div>
            <label
              className='p-2 inline-flex items-center gap-2 mb-2'
              htmlFor='adminCheck'
            >
              <input
                id='adminCheck'
                type='checkbox'
                className=''
                value={1}
                checked={admin}
                onChange={(ev) => setAdmin(ev.target.checked)}
              />
              <span>Admin</span>
            </label>
          </div>
        )}
        <button type='submit'>Save</button>
      </form>
    </div>
  );
}

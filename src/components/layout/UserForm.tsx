'use client';
import AddressInputs from '@/components/layout/AddressInputs';
import { useState } from 'react';
import { CldUploadWidget, CldImage } from 'next-cloudinary';

export default function UserForm({ user, onSave }) {
  const [userName, setUserName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [streetAddress, setStreetAddress] = useState(user?.streetAddress || '');
  const [postalCode, setPostalCode] = useState(user?.postalCode || '');
  const [city, setCity] = useState(user?.city || '');
  const [country, setCountry] = useState(user?.country || '');
  const [admin, setAdmin] = useState(user?.admin || false);

  function handleAddressChange(propName, value) {
    if (propName === 'phone') setPhone(value);
    if (propName === 'streetAddress') setStreetAddress(value);
    if (propName === 'postalCode') setPostalCode(value);
    if (propName === 'city') setCity(value);
    if (propName === 'country') setCountry(value);
  }

  return (
    <div className='md:flex gap-4'>
      <form
        className='grow'
        onSubmit={(ev) =>
          onSave(ev, {
            name: userName,
            phone,
            admin,
            streetAddress,
            city,
            country,
            postalCode,
          })
        }
      >
        {/* <CldImage
          src='vluxuh1d58bd3g3tcowe' // Use this sample image or upload your own via the Media Explorer
          width='500' // Transform the image: auto-crop to square aspect_ratio
          height='500'
          alt='Profile Image'
          crop={{
            type: 'auto',
            source: true,
          }}
        />
        <CldUploadWidget
          signatureEndpoint='/api/sign-image'
          onSuccess={async (results) => {
            console.log("public_id", results.info.public_id);
            console.log("email", user);
            const res = await fetch('/api/upload', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                image: results.info.public_id,
                email: user?.email,
              }),
            });
            console.log(res);
          }}
          options={{ sources: ['local'] }}
        >
          {({ open }) => {
            return (
              <button
                type='button'
                onClick={() => open()}
              >
                Upload an Image
              </button>
            );
          }}
        </CldUploadWidget> */}
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

        <button type='submit'>Save</button>
      </form>
    </div>
  );
}

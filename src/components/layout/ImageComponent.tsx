import Image from 'next/image';
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import toast, {Toaster} from 'react-hot-toast';

const ImageComponent = ({ imageUrl, setImageUrl }) => {
  const isHttpUrl = imageUrl.startsWith('http');
  const ImageTag = isHttpUrl ? Image : CldImage;
  const handleUpload = async (results) => {
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: results.info.public_id,
      }),
    });
    if (res.ok) {
      toast.success('Image uploaded successfully');
      setImageUrl(results.info.secure_url);
    }
  }
  return (
    <>
      <Toaster />
      <ImageTag
        className='rounded-lg w-full h-full mb-1'
        src={imageUrl}
        width={250}
        height={250}
        alt='Profile Image'
        {...(isHttpUrl ? {} : { crop: { type: 'auto', source: true } })}
      />
      <CldUploadWidget
        signatureEndpoint='/api/sign-image'
        onSuccess={handleUpload}
        options={{ sources: ['local'], maxFiles: 1 }}
      >
        {({ open }) => {
          return (
            <button
              type='button'
              onClick={() => open()}
              className='block border border-gray-300 rounded-lg p-2 text-center cursor-pointer'
            >
              Upload an Image
            </button>
          );
        }}
      </CldUploadWidget>
    </>
  );
};

export default ImageComponent;

export default function MenuItem() {
  return (
    <div
      className='bg-gray-300 p-4 rounded-lg text-center
        group hover:bg-white hover:shadow-md hover:shadow-black/25
        transition-all'
    >
      <div>
        <img
          src='/pizza.png'
          alt='pizza'
          className='max-h-auto max-h-24
          block mx-auto'
        />
      </div>
      <h4 className='font-semibold my-3'>pepperoni pizza</h4>
      <p className='text-gray-500 text-sm'>
        Lorem ipsum dolor sit amet, consectetuc adipisicing elit
      </p>
      <button
        className='mt-4 bg-primary text-white rounded-full
          px-8 py-2'
      >
        Add to Cart 10$
      </button>
    </div>
  );
}

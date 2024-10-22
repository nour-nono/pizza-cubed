import ImageComponent from '@/components/layout/ImageComponent';
import MenuItemPriceProps from '@/components/layout/MenuItemPriceProps';
import { useEffect, useState } from 'react';

const MenuItemForm = ({ onSubmit, menuItem }) => {
  const [image, setImage] = useState(menuItem?.image || 'cld-sample-4');
  const [name, setName] = useState(menuItem?.name || '');
  const [description, setDescription] = useState(menuItem?.description || '');
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [category, setCategory] = useState(menuItem?.category || '');
  const [categories, setCategories] = useState([]);
  const [extraIngredientPrices, setExtraIngredientPrices] = useState(
    menuItem?.extraIngredientPrices || [],
  );

  useEffect(() => {
    fetch('/api/categories').then((res) => {
      res.json().then((categories) => {
        setCategories(categories);
      });
    });
  }, []);

  return (
    <form
      onSubmit={(ev) =>
        onSubmit(ev, {
          image,
          name,
          description,
          basePrice,
          sizes,
          extraIngredientPrices,
          category,
        })
      }
      className='mt-8 max-w-2xl mx-auto'
    >
      <div
        className='md:grid items-start gap-4'
        style={{ gridTemplateColumns: '.3fr .7fr' }}
      >
        <div>
          <ImageComponent
            imageUrl={image}
            setImageUrl={setImage}
          />
        </div>
        <div className='grow'>
          <label htmlFor='Item name'>Item name</label>
          <input
            id='Item name'
            type='text'
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <label htmlFor='Item description'>Description</label>
          <input
            id='Item description'
            type='text'
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
          <label>Category</label>
          <select
            value={category}
            onChange={(ev) => setCategory(ev.target.value)}
          >
            {categories?.length > 0 &&
              categories.map((c) => (
                <option
                  key={c._id}
                  value={c._id}
                >
                  {c.name}
                </option>
              ))}
          </select>
          <label htmlFor='Item Base price'>Base price</label>
          <input
            id='Item Base price'
            type='text'
            value={basePrice}
            onChange={(ev) => setBasePrice(ev.target.value)}
          />
          <MenuItemPriceProps
            name={'Sizes'}
            addLabel={'Add item size'}
            props={sizes}
            setProps={setSizes}
          />
          <MenuItemPriceProps
            name={'Extra ingredients'}
            addLabel={'Add ingredients prices'}
            props={extraIngredientPrices}
            setProps={setExtraIngredientPrices}
          />
          <button type='submit'>Save</button>
        </div>
      </div>
    </form>
  );
};

export default MenuItemForm;

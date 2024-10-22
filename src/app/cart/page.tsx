import React from "react";

interface CartProps {
  items: Array<{ id: string; name: string; price: number }>;
}

const CartPage: React.FC<CartProps> = ({ items }) => {
  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

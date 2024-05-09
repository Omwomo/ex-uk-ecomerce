import React from 'react';
import { useSelector } from 'react-redux';

const Cart = () => {
  const { cartItems } = useSelector((state) => state.app);

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            {item.quantity} - {item.subtotal_price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;

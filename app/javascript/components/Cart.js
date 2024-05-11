import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems } from '../redux/actions';

const Cart = () => {
  const { cartItems, loading } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  if (loading) {
    return <div>Loading cart items...</div>;
  }

  if (!cartItems || cartItems.length === 0) {
    return <div>No items in cart</div>;
  }

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            <div>
              {item.product?.image && <img src={item.product.image} alt={item.product.name} />}
              <div>{item.product?.name}</div>
              <div>Price: {item.product?.price}</div>
              <div>Quantity: {item.quantity}</div>
              <div>Subtotal: {item.subtotal_price}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;

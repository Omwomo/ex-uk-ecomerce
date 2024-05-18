import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems, updateCartItem, removeCartItem } from '../redux/actions';

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

  const handleQuantityChange = (itemId, quantity) => {
    dispatch(updateCartItem(itemId, quantity));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeCartItem(itemId));
  };

  const totalAmount = cartItems.reduce((total, item) => total + parseFloat(item.subtotal_price), 0).toFixed(2);

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
              <div>
                Quantity: 
                <input 
                  type="number" 
                  value={item.quantity} 
                  onChange={(e) => handleQuantityChange(item.id, Number(e.target.value))} 
                  min="1" 
                />
              </div>
              <div>Subtotal: {item.subtotal_price}</div>
              <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <div>Total Amount: {totalAmount}</div>
    </div>
  );
};

export default Cart;

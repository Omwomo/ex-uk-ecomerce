import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems, updateCartItem } from '../redux/actions';

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

  const handleQuantityChange = (product_id, quantity) => {
    dispatch(updateCartItem(product_id, quantity));
  };

  const totalAmount = cartItems.reduce((total, item) => total + item.subtotal_price, 0);

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
            </div>
          </li>
        ))}
      </ul>
      <div>Total Amount: {totalAmount}</div>
    </div>
  );
};

export default Cart;

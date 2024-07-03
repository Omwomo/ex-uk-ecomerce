import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems, updateCartItem, removeCartItem } from '../redux/actions';
import { Link } from 'react-router-dom';

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

  const handleQuantityChange = (itemId, quantity, maxQuantity) => {
    if (quantity > maxQuantity) {
      alert(`Only ${maxQuantity} items available in stock.`);
      return;
    }
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
              {item.product?.image_url && <img className='product_image' src={item.product.image_url} alt={item.product.name} />}
              <div>{item.product?.name}</div>
              <div>Quantity: <input type="number" value={item.quantity} onChange={(e) => handleQuantityChange(item.id, e.target.value, item.product?.inventory)} /></div>
              <div>Subtotal: {item.subtotal_price}</div>
              <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <div>Total Amount: {totalAmount}</div>
      <div><Link to="/checkout">Checkout</Link></div>
    </div>
  );
};

export default Cart;

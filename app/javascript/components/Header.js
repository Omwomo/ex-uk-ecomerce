import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const { cartItems, loading } = useSelector((state) => state.app);

  // Check if cartItems is undefined before accessing its length
  const cartItemsCount = cartItems ? cartItems.length : 0;

  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          {/* Display loading state or cart items count based on loading state */}
          <li><Link to="/cart">Cart ({loading ? 'Loading...' : cartItemsCount})</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

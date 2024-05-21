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
          <li><Link to="/cart">Cart ({loading ? 'Loading...' : cartItemsCount})</Link></li>
          {user ? (
            <>
              <li><Link to="/profile">Profile</Link></li>
              {user.role === 'admin' && <li><Link to="/admin">Admin Panel</Link></li>}
              <li><Link to="/logout">Logout</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/signin">Sign In</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

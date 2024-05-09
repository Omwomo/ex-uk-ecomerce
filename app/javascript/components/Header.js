import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const { cartItems } = useSelector((state) => state.app);

  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/cart">Cart ({cartItems.length})</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SignOut from './SignOut';
import { fetchCurrentUser } from '../redux/actions';

const Header = () => {
  const { cartItems, loading, user } = useSelector((state) => state.app);

  const cartItemsCount = cartItems ? cartItems.length : 0;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/cart">Cart ({loading ? 'Loading...' : cartItemsCount})</Link></li>
          {user ? (
            <>
              {user.role === "user" && <li><Link to="/profile">Profile</Link></li>}
              {user.role === "admin" && <li><Link to="/admin">Admin Panel</Link></li>}
              <li><SignOut /></li>
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

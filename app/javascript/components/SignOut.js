import React from 'react';
import { useDispatch } from 'react-redux';
import { signOut } from '../redux/slices/slices';
import { useNavigate } from 'react-router-dom';
import { fetchCartItems } from '../redux/actions';

const SignOut = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getCsrfToken = () => {
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    return token;
  };

  const handleSignOut = async () => {
    try {
      const csrfToken = getCsrfToken();
      await fetch('/users/sign_out', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
      });
      localStorage.removeItem('token');
      dispatch(signOut());
      navigate('/');
      dispatch(fetchCartItems());
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
};

export default SignOut;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentUser, setLoading } from '../redux/slices/slices';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getCsrfToken = () => {
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    return token;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const csrfToken = getCsrfToken();
      const response = await fetch('/users/sign_in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({ user: { email, password } }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        dispatch(setCurrentUser(data.user));
        navigate('/');
      } else {
        console.error('Sign-in error:', data);
      }
    } catch (error) {
      console.error('Sign-in error:', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit">Sign In</button>
    </form>
  );
};

export default SignIn;

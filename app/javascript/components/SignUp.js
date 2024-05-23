import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentUser, setLoading } from '../redux/slices/slices';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
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
      const response = await fetch('/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify({ user: { email, password, firstname, lastname } }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        dispatch(setCurrentUser(data.user));
        navigate('/');
      } else {
        console.error('Sign-up error:', data);
      }
    } catch (error) {
      console.error('Sign-up error:', error);
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
      <div>
        <label>First Name:</label>
        <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
      </div>
      <div>
        <label>Last Name:</label>
        <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;

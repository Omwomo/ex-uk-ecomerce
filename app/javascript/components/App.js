import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Category from './Category';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import AdminPanel from './AdminPanel';
import UserProfile from './profile';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Cart from './Cart';
import Checkout from './Checkout';
import MPESAPage from './MpesaPage';
import CardPayment from './CardPayment';
import WhatsApp from './WhatsApp';
import { fetchCartItems, fetchCurrentUser } from '../redux/actions';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch cart items and current user when the component mounts
    dispatch(fetchCurrentUser());
    dispatch(fetchCartItems());
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Category />} />
        <Route path="/category/:categoryId" element={<ProductList />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/mpesa" element={<MPESAPage />} />
        <Route path="/card_payment" element={<CardPayment />} />
        <Route path="/whatsapp" element={<WhatsApp />} />
      </Routes>
    </Router>
  );
};

export default App;

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Category from './Category';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import Cart from './Cart';
import { fetchCartItems } from '../redux/actions';

const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch cart items when the component mounts
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
      </Routes>
    </Router>
  );
};

export default App;

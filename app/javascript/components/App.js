import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Category from './Category';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';
import Cart from './Cart';

const App = () => {
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

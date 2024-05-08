import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Category from './Category';
import ProductList from './ProductList';
import ProductDetail from './ProductDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Category />} />
        <Route path='/category/:categoryId' element={<ProductList />} />
        <Route path='/product/:productId' element={<ProductDetail />} />
      </Routes>
    </Router>
  );
};

export default App;

import React from 'react'
import Product from './Product.js'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={ <Product />} />
      </Routes>
    </Router>
  )
}

export default App

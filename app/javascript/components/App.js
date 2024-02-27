import React from 'react'
import Greeting from './Greeting.js'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={ <Greeting />} />
      </Routes>
    </Router>
  )
}

export default App

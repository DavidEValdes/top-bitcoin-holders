import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CryptoDash from './components/CryptoDash'; // Adjust the path as needed
import './App.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CryptoDash />} />
       
      </Routes>
    </Router>
  );
};

export default App;
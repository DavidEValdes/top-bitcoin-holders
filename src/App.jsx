import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CryptoDash from './components/CryptoDash'; // Adjust the path as needed
import Layout from './routes/Layout'; // Ensure this path is correct
import './App.css';
import CompanyDetail from './components/CompanyDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<CryptoDash />} />
        <Route path="companies/:symbol" element={<CompanyDetail />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

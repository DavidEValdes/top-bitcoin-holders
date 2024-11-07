import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CryptoDash from './components/CryptoDash';
import Layout from './routes/Layout';
import './App.css';
import CompanyDetail from './components/CompanyDetail';

const MobileWarning = () => {
  return (
    <div className="mobile-warning-overlay">
      <div className="mobile-warning-content">
        <div className="bitcoin-icon">₿</div>
        <h2>Desktop Only</h2>
        <p>BitDash is currently optimized for desktop viewing only.</p>
        <p>Please access our platform from a desktop or laptop computer for the best experience.</p>
        <p>Mobile version coming soon!</p>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <>
      <MobileWarning />
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<CryptoDash />} />
            <Route path="companies/:symbol" element={<CompanyDetail />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
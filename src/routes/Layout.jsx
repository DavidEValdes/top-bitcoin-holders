import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar'; 
import '../App.css';

const Layout = () => {
  return (
    
    <div className="App">
      <Sidebar />
      <div className="App-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
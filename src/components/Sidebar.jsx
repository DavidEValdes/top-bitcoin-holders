// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Assuming your CSS file is named App.css

const Sidebar = () => {
  return (
    <div className="App-sidebar">
      <div className="Header">
        <img className="Logo" alt="crescent moon logo" src="https://pngimg.com/uploads/bitcoin/bitcoin_PNG48.png"/>
        <h3 className="Header-title">BitDash</h3>
      </div>
      <div className="Menu">
        <ul>
          <li className="Menu-item">
            <Link to="/" className="menu-link">
              <div>🏠 Dashboard</div>
            </Link>
          </li>
          <li className="Menu-item">
            <Link to="/" className="menu-link">
              <div>ℹ️ About</div>
            </Link>
          </li>
          {/* Repeat for other menu items */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
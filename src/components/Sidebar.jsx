// src/components/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Assuming your CSS file is named App.css

const Sidebar = () => {
  return (
    <div className="App-sidebar">
      <div className="Header">
        <img className="Logo" alt="crescent moon logo" src="https://img.icons8.com/fluency/344/full-moon.png"/>
        <h3 className="Header-title">AstroDash</h3>
      </div>
      <div className="Menu">
        <ul>
          <li className="Menu-item">
            <Link to="/" className="menu-link">
              <i className="menu-icon tf-icons bx bx-home-circle"></i>
              <div>🏠 Dashboard</div>
            </Link>
          </li>
          {/* Repeat for other menu items */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
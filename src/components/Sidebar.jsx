import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({
  setSearchTerm,
  filterCountry,
  setFilterCountry,
  minimumHoldings,
  setMinimumHoldings,
  bitcoinValue,
  setBitcoinValue,
  totalCompanies,
  totalPercentOwned,
  totalValueUsd,
  totalBitcoin,
  numberOfCompanies,
  averageProfitPercentage,
  marketCapDominance
}) => {
  return (
    <div className="App-sidebar">
      <div className="Header">
        <img className="Logo" alt="bitcoin logo" src="https://pngimg.com/uploads/bitcoin/bitcoin_PNG48.png"/>
        <h3 className="Header-title">BitDash</h3>
      </div>
      <div className="Menu">
        <div className="Menu-item">
          <Link to="/" className="menu-link">Dashboard</Link>
        </div>
        <div className="Menu-item">
          <input
            type="text"
            placeholder="Search companies..."
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field"
          />
        </div>
        <div className="Menu-item">
          <select 
            onChange={(e) => setFilterCountry(e.target.value)} 
            value={filterCountry} 
            className="select-field"
          >
            <option value="All">All Countries</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="JP">Japan</option>
            <option value="HK">Hong Kong</option>
            <option value="AU">Australia</option>
            <option value="TH">Thailand</option>
            <option value="DE">Denmark</option>
            <option value="GB">United Kingdom</option>
          </select>
        </div>
        <div className="Menu-item">
          <label className="slider-label">
            Amount of Bitcoin:
            <input
              type="range"
              min="0"
              max="19000"
              value={minimumHoldings}
              onChange={(e) => setMinimumHoldings(Number(e.target.value))}
              className="slider"
            />
            <span className="slider-value">{Number(minimumHoldings).toLocaleString('en-US')} Bitcoin</span>
          </label>
        </div>
        <div className="Menu-item">
          <label className="slider-label">
            Value of Bitcoin Held:
            <input
              type="range"
              min="0"
              max="1400000000"
              value={bitcoinValue}
              onChange={(e) => setBitcoinValue(Number(e.target.value))}
              className="slider"
            />
            <span className="slider-value">${Number(bitcoinValue).toLocaleString('en-US')}</span>
          </label>
        </div>
        <div className="Menu-item">
          <div className="crypto-stats-box">
            <p>Total Companies: {totalCompanies}</p>
            <p>Total % of Bitcoin Supply: {totalPercentOwned.toFixed(3)}%</p>
            <p>Total Value: ${totalValueUsd.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
            <p>Total Bitcoin: {totalBitcoin.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
            <p>Avg Profit: {averageProfitPercentage.toFixed(1)}%</p>
            <p>Market Cap Dominance: {marketCapDominance}%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
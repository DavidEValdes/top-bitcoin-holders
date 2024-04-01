import axios from 'axios';
import React, { useEffect, useState } from 'react';

const CryptoDash = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCountry, setFilterCountry] = useState('All');
  const [minimumHoldings, setMinimumHoldings] = useState(0);
  const [bitcoinValue, setBitcoinValue] = useState(0);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios('https://api.coingecko.com/api/v3/companies/public_treasury/bitcoin', {
          headers: {
            'x-cg-demo-api-key': import.meta.env.VITE_API_KEY
          }
        });
        setCompanies(result.data.companies);
      } catch (error) {
        console.error('Error fetching data from CoinGecko:', error);
      }
    };
    fetchData();
  }, []);


  

  const filteredCompanies = companies.filter(company =>
    (filterCountry === 'All' || company.country === filterCountry) &&
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    company.total_holdings >= minimumHoldings &&
    company.total_current_value_usd >= bitcoinValue 
  );


  
  const totalCompanies = filteredCompanies.length;
  
  const totalPercentOwned = filteredCompanies.reduce((acc, curr) => acc + parseFloat(curr.percentage_of_total_supply), 0);



  const handleCountryChange = (e) => {
    setFilterCountry(e.target.value);
  };




  return (
    <div>

    <div style={{
      display: 'flex',
      justifyContent: 'center', 
      alignItems: 'center' 
    }}>
      <img 
        src="https://1000logos.net/wp-content/uploads/2018/04/Color-Bitcoin-Logo-500x281.jpg" 
        alt="Bitcoin Logo" 
        style={{ width: '200px', }} 
      />
    </div>

      <h1>Top Public Bitcoin Holders </h1>
      

      <input
        type="text"
        placeholder="Search companies..."
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{margin: "20px 0", padding: "10px"}}
        className="input-field"
      />
  
      <select onChange={handleCountryChange} value={filterCountry} className="select-field">
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

      <br></br>

      <label>
        Amount of Bitcoin: 
        <input
          type="range"
          min="0"
          max="19000" 
          value={minimumHoldings}
          onChange={(e) => setMinimumHoldings(e.target.value)}
        />
         {Number(minimumHoldings).toLocaleString('en-US')} Bitcoin
      </label>

      <br></br>

      <label>
        Value of Bitcoin Held: 
        <input
          type="range"
          min="0"
          max="1400000000" 
          value={bitcoinValue}
          onChange={(e) => setBitcoinValue(e.target.value)}
        />
        ${Number(bitcoinValue).toLocaleString('en-US')}
      </label>
      <div>
      <p>Total Companies: {totalCompanies}</p>
      <p>Total Percentage of Total Supply: {totalPercentOwned.toFixed(3)}%</p>
      
      </div>
      <ul className="no-bullets">
        {filteredCompanies.map((company, index) => (
          <li key={index} className="card">
            <h1>{company.name}</h1>
              <p>
                Holds <span className="holdings">{company.total_holdings}</span> Bitcoins 
                valued at $<span className="value">{company.total_current_value_usd.toLocaleString()}</span>
              </p>
            <ul>
              <li>Symbol: {company.symbol}</li>
              <li>Country: {company.country}</li>
              <li>
                Total Entry Value (USD): 
                {company.total_entry_value_usd === 0 ? ' N/A' : `$${company.total_entry_value_usd.toLocaleString('en-US')}`}
              </li>
              <li>Percentage of Total Supply: {company.percentage_of_total_supply}%</li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CryptoDash;
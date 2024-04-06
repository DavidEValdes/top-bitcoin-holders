import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  ScatterChart,
  Scatter
} from 'recharts';



const CryptoDash = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCountry, setFilterCountry] = useState('All');
  const [minimumHoldings, setMinimumHoldings] = useState(0);
  const [bitcoinValue, setBitcoinValue] = useState(0);
  const [totalValueUsd, setTotalValueUsd] = useState(0);
  const [marketCapDominance, setMarketCapDominance] = useState(0);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios('https://api.coingecko.com/api/v3/companies/public_treasury/bitcoin', {
          headers: {
            'x-cg-demo-api-key': import.meta.env.VITE_API_KEY
          }
        });
        setMarketCapDominance(result.data.market_cap_dominance)
        setTotalValueUsd(result.data.total_value_usd);
        setCompanies(result.data.companies);
      } catch (error) {
        console.error('Error fetching data from CoinGecko:', error);
      }
    };
    fetchData();
  }, []);

  const calculateAverageProfitPercentage = (companies) => {
    // Filter out companies with no initial investment to avoid division by zero
    const companiesWithInvestment = companies.filter(company => company.total_entry_value_usd > 0);
  
    // Calculate total profit percentage
    const totalProfitPercentage = companiesWithInvestment.reduce((acc, company) => {
      // Calculate profit for each company
      const profitUSD = company.total_current_value_usd - company.total_entry_value_usd;
      // Calculate profit percentage for each company and add it to the accumulator
      const profitPercentage = (profitUSD / company.total_entry_value_usd) * 100;
      return acc + profitPercentage;
    }, 0);
  
    // Calculate average profit percentage
    const averageProfitPercentage = totalProfitPercentage / companiesWithInvestment.length;
  
    return averageProfitPercentage;
  };
  
  const averageProfitPercentage = calculateAverageProfitPercentage(companies);

  const numberOfCompanies = companies.length;



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
      <p>Total Value of $<span className="value">{totalValueUsd.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span> Owned by {numberOfCompanies} Companies</p>
      <p> Average profit made {averageProfitPercentage.toFixed(1)}%</p>
      <p>Total Companies: {totalCompanies}</p>
      <p>Total Percentage of Total Supply of Bitcoin: {totalPercentOwned.toFixed(3)}%</p>
      <p>Total Market Cap Dominance: {marketCapDominance} %</p>
      
      
      </div>
      
      <div style={{ marginLeft: '45px', marginRight: '100px', marginTop: '40px', marginBottom: '40px' }}> {/* Adjust the margin values as needed */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={companies.slice(0, 5)}
          margin={{
            top: 20, right: 30, left: 20, bottom: 25, 
          }}
          style={{
            backgroundColor: 'var(--card-bg-color)',
            borderRadius: 'var(--border-radius)',
            boxShadow: 'var(--box-shadow)',
            backdropFilter: 'var(--backdrop-filter)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            padding: '20px',
            fontFamily: 'var(--font-family)'
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--secondary-color)" />
          <XAxis
            dataKey="name"
            stroke="var(--primary-color)"
            angle={-45}
            textAnchor="end"
            height={70}
            tick={{ fontSize: '10px' }} 
          />
          <YAxis stroke="var(--primary-color)" />
          <Tooltip wrapperStyle={{ backgroundColor: 'var(--card-bg-color)', borderColor: 'var(--primary-color)', borderRadius: 'var(--border-radius)', color: 'black' }} cursor={{ fill: 'var(--secondary-color)' }}formatter={(value, name) => [<span style={{ color: 'black' }}>{`${value} Bitcoin`}</span>,name]}/>
          <Bar dataKey="total_holdings" fill="#f7931a"  name={<span style={{ color: 'black' }}>Total Bitcoin Holdings</span>}/>
        </BarChart>
      </ResponsiveContainer>
      </div>
      
      
      <br></br>
      <br></br>


      
      <ul className="no-bullets">
    {[...filteredCompanies].reverse().map((company, index) => (
      <Link 
        key={index} 
        to={`/companies/${company.symbol}`} 
        state={{ company }} 
        className="card-link"
      >
      <li className="card">
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
    </Link>
    ))}
  </ul>
    </div>
  );
};

export default CryptoDash;
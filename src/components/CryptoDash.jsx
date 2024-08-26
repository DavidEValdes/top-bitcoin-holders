import React from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const CryptoDash = () => {
  const {
    companies,
    totalValueUsd,
    totalBitcoin,
    numberOfCompanies,
    averageProfitPercentage,
    marketCapDominance
  } = useOutletContext();

  return (
    <div className="dashboard-content">
      <h1>Top Public Bitcoin Holders</h1>

      <div className="bar-chart-container">
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
            <YAxis 
              stroke="var(--primary-color)"
              tickFormatter={(value) => `${value.toLocaleString()} Bitcoin`} 
              tick={{ fontSize: 11 }} 
            />
            <Tooltip 
              wrapperStyle={{ 
                backgroundColor: 'var(--card-bg-color)', 
                borderColor: 'var(--primary-color)', 
                borderRadius: 'var(--border-radius)', 
                color: 'black' 
              }} 
              cursor={{ fill: 'var(--secondary-color)' }} 
              formatter={(value, name) => [
                <span style={{ color: 'black' }}>{`${value.toLocaleString()} Bitcoin`}</span>,
                name
              ]}
            />
            <Bar dataKey="total_holdings" fill="#f7931a" name={<span style={{ color: 'black' }}>Total Bitcoin Holdings</span>} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <ul className="no-bullets">
        {companies.map((company, index) => (
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
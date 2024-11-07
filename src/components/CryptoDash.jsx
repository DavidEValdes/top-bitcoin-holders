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
      <div className="crypto-stats">
  <p>Total Value of $<span className="value">{totalValueUsd.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span> Owned in <span className="value2">{totalBitcoin.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</span> Bitcoin by {numberOfCompanies} Companies</p>
  <p>Average Profit Made: {averageProfitPercentage.toFixed(1)}%</p>
  <p style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <span>Total Market Cap Dominance: {marketCapDominance}%</span>
    <span style={{
      color: '#f7931a',
      fontSize: '.9rem',
      fontStyle: 'italic',
      padding: '5px 10px',
      border: '1px solid rgba(247, 147, 26, 0.3)',
      borderRadius: '8px',
      background: 'rgba(255, 255, 255, .1)',
    }}>Updated Weekly</span>
  </p>
</div>

{companies.length > 0 && (
  <div className="bar-chart-container">
    <ResponsiveContainer width="100%" height={340}> {/* Increased height to 400 */}
      <BarChart
        data={companies.slice(0, 5)}
        margin={{
          top: 20,
          right: 30,
          left: 20, // Increased left margin for Y-axis labels
          bottom: 50, // Increased bottom margin for X-axis labels
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
          height={100} // Increased height for X-axis
          tick={{ 
            fontSize: '16px',
            fill: '#ffffff'
          }}
          interval={0} // Ensures all labels are shown
          dy={0} // Adjusts vertical position of labels
        />
        <YAxis 
          stroke="var(--primary-color)"
          tickFormatter={(value) => `${value.toLocaleString()} Bitcoin`} 
          tick={{ 
            fontSize: 16,
            fill: '#ffffff'
          }}
          width={120} // Added width for Y-axis to prevent text cutoff
        />
        <Tooltip 
          wrapperStyle={{
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            border: '1px solid #f7931a',
            borderRadius: '8px',
            padding: '10px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)',
          }}
          contentStyle={{
            backgroundColor: 'transparent',
            border: 'none',
            fontSize: '16px',
          }}
          labelStyle={{
            color: '#ffffff',
            fontWeight: 'bold',
            marginBottom: '5px',
            fontSize: '16px',
          }}
          cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}
          formatter={(value, name) => [
            <span style={{ 
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: '500',
              padding: '4px 0'
            }}>{`${value.toLocaleString()} Bitcoin`}</span>,
            <span style={{
              color: '#f7931a',
              fontSize: '14px',
              fontWeight: '500'
            }}>{name}</span>
          ]}
        />
        <Bar 
          dataKey="total_holdings" 
          fill="#f7931a" 
          name={<span style={{ color: 'white', fontSize: '14px' }}>Total Bitcoin Holdings</span>}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
)}

      {companies.length > 0 ? (
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
                  Holds <span className="holdings">{Number(company.total_holdings).toLocaleString()}</span> Bitcoins
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
      ) : (
        <div className="no-results">
          <p>No companies match the current filters. Try adjusting your search criteria.</p>
        </div>
      )}
    </div>
  );
};

export default CryptoDash;
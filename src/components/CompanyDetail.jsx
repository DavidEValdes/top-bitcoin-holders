import React from 'react';
import { useLocation } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const CompanyDetail = () => {
  let location = useLocation();
  const company = location.state.company;

  
  const initialValueAvailable = company.total_entry_value_usd > 0;

  const percentChange = initialValueAvailable
    ? ((company.total_current_value_usd - company.total_entry_value_usd) / company.total_entry_value_usd) * 100
    : null;

  
  const data = initialValueAvailable
    ? [
        { name: 'Buy In', value: company.total_entry_value_usd },
        { name: 'Current Price', value: company.total_current_value_usd },
      ]
    : [];

  return (
    <div className="detail-container">
      <div className="detail-info">
        <h1>{company.name}</h1>
        <p>Symbol: {company.symbol}</p>
        <p>Country: {company.country}</p>
        <p>Bitcoin Holdings: {company.total_holdings}</p>
        <p>Total Entry Value: {initialValueAvailable ? `$${company.total_entry_value_usd.toLocaleString()}` : 'N/A'}</p>
        <p>Current Value of Bitcoin Held: ${company.total_current_value_usd.toLocaleString()}</p>
        <p>Percentage of Total Supply Held: {company.percentage_of_total_supply}%</p>
        <p>Percent Change: {initialValueAvailable ? `${percentChange.toFixed(2)}%` : 'N/A'}</p>
        {!initialValueAvailable && <p>Entry Value / Current Value Chart is not Available: No Entry Value given by CoinGecko</p>}
      </div>
      {initialValueAvailable && (
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 25,
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
                tickFormatter={(value) => `$${value.toLocaleString()}`}
                tick={{ fontSize: 12 }} 
              />
              <Tooltip
                wrapperStyle={{
                  backgroundColor: 'var(--card-bg-color)',
                  borderColor: 'var(--primary-color)',
                  borderRadius: 'var(--border-radius)',
                  color: 'black',
                }}
                cursor={{ fill: 'var(--secondary-color)' }}
                formatter={(value, name) => [<span style={{ color: 'green' }}>{`$${value.toLocaleString()} USD`}</span>, name]}
              />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#f7931a" name={<span style={{ color: 'white' }}>Value</span>} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default CompanyDetail;

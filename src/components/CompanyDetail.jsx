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
        { 
          name: 'Buy In',
          value: company.total_entry_value_usd,
        },
        { 
          name: 'Current Price',
          value: company.total_current_value_usd,
        }
      ]
    : [];

  // Calculate domain with padding
  const minValue = Math.min(company.total_entry_value_usd, company.total_current_value_usd);
  const maxValue = Math.max(company.total_entry_value_usd, company.total_current_value_usd);
  const padding = (maxValue - minValue) * 0.1;

  return (
    <div className="detail-container">
      <div className="detail-info">
        <h1>{company.name}</h1>
        <p className="info-item">Symbol: <span className="info-value">{company.symbol}</span></p>
        <p className="info-item">Country: <span className="info-value">{company.country}</span></p>
        <p className="info-item">Bitcoin Holdings: <span className="holdings">{company.total_holdings.toLocaleString()}</span></p>
        <p className="info-item">
          Total Entry Value: 
          <span className="value2">
            {initialValueAvailable ? `$${company.total_entry_value_usd.toLocaleString()}` : 'N/A'}
          </span>
        </p>
        <p className="info-item">
          Current Value of Bitcoin Held: 
          <span className="value">${company.total_current_value_usd.toLocaleString()}</span>
        </p>
        <p className="info-item">
          Percentage of Total Supply Held: 
          <span className="info-value">{company.percentage_of_total_supply}%</span>
        </p>
        <p className="info-item">
          Percent Change: 
          <span className={percentChange >= 0 ? 'value' : 'value2'}>
            {initialValueAvailable ? `${percentChange.toFixed(2)}%` : 'N/A'}
          </span>
        </p>
        {!initialValueAvailable && (
          <p className="no-data-message">
            Entry Value / Current Value Chart is not Available: No Entry Value given by CoinGecko
          </p>
        )}
      </div>
      {initialValueAvailable && (
        <div className="chart-container value-chart">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis
                dataKey="name"
                stroke="#ffffff"
                angle={-45}
                textAnchor="end"
                height={70}
                tick={{ fontSize: '12px' }}
              />
              <YAxis
                stroke="#ffffff"
                tickFormatter={(value) => `$${value.toLocaleString()}`}
                domain={[minValue - padding, maxValue + padding]}
                tick={{ fontSize: '12px' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  backdropFilter: 'blur(10px)',
                }}
                labelStyle={{ color: '#ffffff' }}
                formatter={(value) => [`$${value.toLocaleString()}`, 'Value']}
              />
              <Legend />
              <Line
                type="linear"
                dataKey="value"
                stroke="#f7931a"
                strokeWidth={2}
                dot={{
                  r: 4,
                  fill: "#f7931a",
                  stroke: "#ffffff",
                  strokeWidth: 1
                }}
                activeDot={{
                  r: 6,
                  fill: "#f7931a",
                  stroke: "#ffffff",
                  strokeWidth: 2
                }}
                name="Value"
                className="value-line"
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default CompanyDetail;
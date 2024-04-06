import React from 'react';
import { useLocation } from 'react-router-dom';

const CompanyDetail = () => {
  let location = useLocation();
  const company = location.state.company;

  // Render the detailed view of the company using the company state passed through the link
  return (
    <div>
      <h1>{company.name}</h1>
      <p>Symbol: {company.symbol}</p>
      <p>Country: {company.country}</p>
      <p>Bitcoin Holdings: {company.total_holdings}</p>
      <p>Value of Bitcoin Held: ${company.total_current_value_usd.toLocaleString()}</p>
      <p>Total Entry Value USD: ${company.total_entry_value_usd.toLocaleString()}</p>
      <p>Percentage of Total Supply: {company.percentage_of_total_supply}%</p>
      {/* Include any other details you want to display */}
    </div>
  );
};

export default CompanyDetail;
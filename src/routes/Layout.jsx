import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import '../App.css';

const Layout = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCountry, setFilterCountry] = useState('All');
  const [minimumHoldings, setMinimumHoldings] = useState(0);
  const [bitcoinValue, setBitcoinValue] = useState(0);
  const [totalValueUsd, setTotalValueUsd] = useState(0);
  const [marketCapDominance, setMarketCapDominance] = useState(0);
  const [totalBitcoin, setTotalBitcoin] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios('https://api.coingecko.com/api/v3/companies/public_treasury/bitcoin', {
          headers: {
            'x-cg-demo-api-key': import.meta.env.VITE_API_KEY
          }
        });
        setTotalBitcoin(result.data.total_holdings);
        setMarketCapDominance(result.data.market_cap_dominance);
        setTotalValueUsd(result.data.total_value_usd);
        setCompanies(result.data.companies);
      } catch (error) {
        console.error('Error fetching data from CoinGecko:', error);
      }
    };
    fetchData();
  }, []);

  const calculateAverageProfitPercentage = (companies) => {
    const companiesWithInvestment = companies.filter(company => company.total_entry_value_usd > 0);
    const totalProfitPercentage = companiesWithInvestment.reduce((acc, company) => {
      const profitUSD = company.total_current_value_usd - company.total_entry_value_usd;
      const profitPercentage = (profitUSD / company.total_entry_value_usd) * 100;
      return acc + profitPercentage;
    }, 0);
    return companiesWithInvestment.length > 0 ? totalProfitPercentage / companiesWithInvestment.length : 0;
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
    <div className="App">
      <Sidebar
        setSearchTerm={setSearchTerm}
        filterCountry={filterCountry}
        handleCountryChange={handleCountryChange}
        minimumHoldings={minimumHoldings}
        setMinimumHoldings={setMinimumHoldings}
        bitcoinValue={bitcoinValue}
        setBitcoinValue={setBitcoinValue}
        totalCompanies={totalCompanies}
        totalPercentOwned={totalPercentOwned}
        totalValueUsd={totalValueUsd}
        totalBitcoin={totalBitcoin}
        numberOfCompanies={numberOfCompanies}
        averageProfitPercentage={averageProfitPercentage}
        marketCapDominance={marketCapDominance}
      />
      <div className="App-content">
        <Outlet context={{
          companies: filteredCompanies,
          totalValueUsd,
          totalBitcoin,
          numberOfCompanies,
          averageProfitPercentage,
          marketCapDominance
        }} />
      </div>
    </div>
  );
};

export default Layout;
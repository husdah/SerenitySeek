import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PackageBanner from '../components/PackagesBanner';
import PackagesBody from '../components/PackagesBody';
import Footer from '../components/Footer/Footer';
import Navbar from '../components/navbar/Navbar';

export default function Packages() {
  // Initialize useState
  const [packages, setPackages]           = useState([]);
  const [countryFilter, setCountryFilter] = useState('');
  const [selectedDate, setSelectedDate]   = useState('');
  const [maxPrice, setMaxPrice]           = useState(2000);

  // To filter packages for this country
  const location=useLocation();
  const country=location.state;

  // Fetch Packages 
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/packages');
        const json = await response.json();
        if (response.ok) {
          setPackages(json);
        }
      } 
      catch (error) {
        console.error('An error occurred while fetching data', error);
      }
    };
    fetchPackages();
  }, []);

  // Function to check if the selected date is exactly in mongodb 
  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  // Filter Packages
  const filteredPackages = packages.filter((packageItem) => {
    const packagePriceWithDiscount = packageItem.discount
      ? packageItem.pricePerOne - (packageItem.pricePerOne * packageItem.discount) / 100
      : packageItem.pricePerOne;
  
    const packageStartDate = new Date(packageItem.startDate);
    const selectedDateObj = selectedDate ? new Date(selectedDate) : null;
  
    return (
      packageItem.country.toLowerCase().includes(countryFilter.toLowerCase()) &&
      packagePriceWithDiscount <= maxPrice &&
      (!selectedDateObj || isSameDay(packageStartDate, selectedDateObj))
    );
  });

  return (
    <div className='container'>
      <Navbar nothome= 'true' />
      <PackageBanner 
        countryFilter={countryFilter}
        selectedDate={selectedDate}
        maxPrice={maxPrice}
        country={country}
        setCountryFilter={setCountryFilter}
        setSelectedDate={setSelectedDate}
        setMaxPrice={setMaxPrice}
      />
      <PackagesBody
        packages={packages}
        filteredPackages={filteredPackages}
        countryFilter={countryFilter}
        selectedDate={selectedDate}
        maxPrice={maxPrice}
        setCountryFilter={setCountryFilter}
        setSelectedDate={setSelectedDate}
        setMaxPrice={setMaxPrice}
      />
      <Footer />
    </div>
  );
}
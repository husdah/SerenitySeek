import React, { useState, useEffect } from 'react';
import '../assets/Packages.css';
import { Link } from 'react-router-dom';
import { IoLocationSharp } from "react-icons/io5";

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [countryFilter, setCountryFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/packages');
        const json = await response.json();
        console.log(json);
        if (response.ok) {
          setPackages(json);
        }
      } catch (error) {
        console.error('An error occurred while fetching data', error);
      }
    };

    fetchPackages();
  }, []);

  const filteredPackages = packages.filter((packageItem) => {
    return (
      packageItem.country.toLowerCase().includes(countryFilter.toLowerCase()) &&
      packageItem.type.toLowerCase().includes(typeFilter.toLowerCase()) &&
      packageItem.pricePerOne.toString().toLowerCase().includes(priceFilter.toLowerCase())
    );
  });

  /* Function to display description only in 2 lines*/
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  };
  
  return (
    <div className="container">
      <div className='package-banner'>
        <div className='package-titles'>
          <h1 className='title'>A heaven of earth just for you</h1>
        </div>
      </div>
      <div className='filter-input'>
        <label>Country:</label>
        <input
          type="text"
          className="form-controller"
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
        />
        <label>Type:</label>
        <input
          type="text"
          className="form-controller"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        />
        <label>Price:</label>
        <input
          type="text"
          className="form-controller"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        />
      </div>
      
      <div className='package-body'>
        {filteredPackages.map((packageItem) => {
          let imageUrl = `http://localhost:4000/uploads/${packageItem.coverImg}`;
          return(
            <div key={packageItem._id} className='package-card'>
              <h1>{packageItem.name}</h1>
              <div className='packageImg'>
                <img src={imageUrl} className='Package-Img' alt={packageItem.name + 'image'} crossOrigin="anonymous" />
              </div>
              <div className='packageDetails'>

                <h2><IoLocationSharp /> {packageItem.country}</h2>
                {/*{packageItem.destination.map((destination) => (
                  <div key={destination._id}>
                    <p>{destination.name}</p>
                  </div>
                ))}*/}
                <p>{truncateText(packageItem.description, 100)}</p>
                <hr />
                <div className='details'>
                  <span className='package-type'>{packageItem.type}</span>
                  <span className='package-price'>{packageItem.pricePerOne} $</span>
                </div>
                <Link to={`/SinglePackage/${packageItem._id}`}>
                  <button className='package-btn'>More Details</button>
                </Link>
              </div>
            </div>
          )
        })}
      </div>
      
    </div>
  );
}
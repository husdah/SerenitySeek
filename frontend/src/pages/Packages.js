import React, { useState, useEffect } from 'react';
import '../assets/css/Packages.css';
import { Link } from 'react-router-dom';
import { IoLocationSharp } from "react-icons/io5";
import { HiOutlineClipboardCheck } from "react-icons/hi";
import video from '../assets/videos/splash.mp4';

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [countryFilter, setCountryFilter] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [maxPrice, setMaxPrice] = useState(5000);

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
      packageItem.pricePerOne <= maxPrice &&
      (!selectedDate || new Date(packageItem.startDate) >= new Date(selectedDate))
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
      <section className='package-banner'>
        <div className='overlay'></div>
        <video src={video} muted autoPlay loop type='video/mp4'></video>

        <div className='homeContent container'>
          <div className='textDiv'>
            <span className='smallText'>
              Our Packages
            </span>
            <h1 className='homeTitle'>
              Search Your Holiday
            </h1>
          </div>

          <div className='cardDiv grid'>

            <div className='destinationInput'>
              <label htmlFor='city'>Search Your Destination:</label>
              <div className='input flex'>
                <input type="text" placeholder='Enter name here....' value={countryFilter}
                  onChange={(e) => setCountryFilter(e.target.value)} />
                <IoLocationSharp className='locationIcon' />
              </div>
            </div>

            <div className='dateInput'>
              <label htmlFor='date'>Select Your Date:</label>
              <div className='input flex'>
                <input type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
            </div>

            <div className='priceInput'>
              <div className='label_total flex'>
                <label htmlFor='price'> Max price: </label>
                <span className='total'>$ {maxPrice}</span>
              </div>
              <div className='input flex'>
                <input
                  type='range'
                  max='1000'
                  min='200'
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                />
              </div>
            </div>

          </div>
        </div>
      </section>
      <div className='package-body'>
        {filteredPackages.map((packageItem) => {
          let imageUrl = `http://localhost:4000/uploads/${packageItem.coverImg}`;
          return (
            <div key={packageItem._id} className='package-card'>
              {packageItem.discount &&   
                <div className='discount'><span className='discountText'>{packageItem.discount}%</span></div>
              }
              <div className='packageImg'>
              
                <img src={imageUrl} className='Package-Img' alt={packageItem.name + 'image'} crossOrigin="anonymous" />
              </div>
              <div className='packageDetails'>
                <div className='packageDestination'>
                  <h1>{packageItem.name}</h1>
                  <h2><IoLocationSharp /> {packageItem.country}</h2>
                </div>
                <div className='fees'>
                  <div className='package-type'>
                    <span>{packageItem.type}</span>
                  </div>
                  {packageItem.discount ?
                    <div className='package-price'>
                      <span className='package-price-del'>{packageItem.pricePerOne}$</span>
                      <span>{(packageItem.pricePerOne - (packageItem.pricePerOne * packageItem.discount) / 100)}$</span>
                    </div>
                    :
                    <div className='package-price'>
                      <span>{packageItem.pricePerOne}$</span>
                    </div>
                  }
                </div>
                <div className='package-desc'>
                  <p>{truncateText(packageItem.description, 100)}</p>
                </div>
                <Link to={`/SinglePackage/${packageItem._id}`}>
                  <button className='package-btn'>Details <HiOutlineClipboardCheck /></button>
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
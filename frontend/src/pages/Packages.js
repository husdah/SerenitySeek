import React, { useState, useEffect } from 'react'
import Styles from '../assets/css/Packages.module.css'
import video from '../assets/videos/splash.mp4'
import { FaLocationDot } from "react-icons/fa6"
import { HiOutlineClipboardCheck } from "react-icons/hi"
import { Link } from 'react-router-dom'


export default function Packages() {
  const [packages, setPackages]           = useState([]);
  const [countryFilter, setCountryFilter] = useState('');
  const [selectedDate, setSelectedDate]   = useState('');
  const [maxPrice, setMaxPrice]           = useState(5000);
 

  /* Fetch Packages */
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

  /* Function to check if the selected date is exactly in mongodb */
  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  /* Filter Packages*/
  const filteredPackages = packages.filter((packageItem) => {
    const packageStartDate = new Date(packageItem.startDate);
    const selectedDateObj = selectedDate ? new Date(selectedDate) : null;
    
    return (
      packageItem.country.toLowerCase().includes(countryFilter.toLowerCase()) &&
      packageItem.pricePerOne <= maxPrice &&
      (!selectedDateObj || isSameDay(packageStartDate, selectedDateObj))
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
    <div className={Styles.container}>
      <section className={Styles.package_banner}>
        <div className={Styles.overlay}></div>
        <video src={video} muted autoPlay loop type='video/mp4'></video>

        <div className={`${Styles.homeContent} ${Styles.container}`}>
          <div className={Styles.textDiv}>
            <span className={Styles.smallText}>
              Our Packages
            </span>
            <h1 className={Styles.homeTitle}>
              Search Your Holiday
            </h1>
          </div>

          <div className={`${Styles.cardDiv} ${Styles.grid}`}>

            <div className={Styles.destinationInput}>
              <label htmlFor='city'>Search Your Destination:</label>
              <div className={`${Styles.input} ${Styles.flex}`}>
                <input 
                  type="text" 
                  placeholder='Enter name here....' 
                  value={countryFilter}
                  onChange={(e) => setCountryFilter(e.target.value)} 
                />
                <FaLocationDot className={Styles.locationIcon} />
              </div>
            </div>

            <div className={Styles.dateInput}>
              <label htmlFor='date'>Select Your Date:</label>
              <div className={`${Styles.input} ${Styles.flex}`}>
                <input 
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
            </div>

            <div className={Styles.priceInput}>
              <div className={`${Styles.label_total} ${Styles.flex}`}>
                <label htmlFor='price'> Max price: </label>
                <span className={Styles.total}>$ {maxPrice}</span>
              </div>
              <div className={`${Styles.input} ${Styles.flex}`}>
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

      <div className={Styles.package_body}>
        {filteredPackages && filteredPackages.map((packageItem) => {
          let imageUrl = `http://localhost:4000/uploads/${packageItem.coverImg}`;
          return (
            <div key={packageItem._id} className={Styles.package_card}>
              {packageItem.discount &&   
                <div className={Styles.discount}><span className={Styles.discountText}>{packageItem.discount}%</span></div>
              }
              <div className={Styles.packageImg}>
              
                <img src={imageUrl} className={Styles.Package_Img} alt={packageItem.name + 'image'} crossOrigin="anonymous" />
              </div>
              <div className={Styles.packageDetails}>
                <div className={Styles.packageDestination}>
                  <h1>{packageItem.name}</h1>
                  <h2><FaLocationDot /> {packageItem.country}</h2>
                </div>
                <div className={Styles.fees}>
                  <div className={Styles.package_type}>
                    <span>{packageItem.type}</span>
                  </div>
                  {packageItem.discount ?
                    <div className={Styles.package_price}>
                      <span className={Styles.package_price_del}>{packageItem.pricePerOne}$</span>
                      <span>{(packageItem.pricePerOne - (packageItem.pricePerOne * packageItem.discount) / 100)}$</span>
                    </div>
                    :
                    <div className={Styles.package_price}>
                      <span>{packageItem.pricePerOne}$</span>
                    </div>
                  }
                </div>
                <div className={Styles.package_desc}>
                  <p>{truncateText(packageItem.description, 100)}</p>
                </div>
                <Link to={`/SinglePackage/${packageItem._id}`}>
                  <button className={Styles.package_btn}>Details <HiOutlineClipboardCheck /></button>
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
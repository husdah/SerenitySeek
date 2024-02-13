// PackagesBody.js
import React from 'react';
import Styles from './PackagesBody.module.css';
import { Link } from 'react-router-dom';
import { FaLocationDot } from "react-icons/fa6";
import { HiOutlineClipboardCheck } from "react-icons/hi"
import { MdFavoriteBorder } from "react-icons/md";


export default function PackagesBody({ packages, filteredPackages, countryFilter, selectedDate, maxPrice, setCountryFilter, setSelectedDate, setMaxPrice }) {
    /* Function to display description only in 2 lines*/
    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
        return text;
        }
        return text.slice(0, maxLength) + '...';
    };
  
  
    return (
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
              <Link to={`/SinglePackage/${packageItem._id}`}>
                <MdFavoriteBorder className={Styles.favoriteIcon}/>
              </Link>
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
                      <span>{Math.ceil(packageItem.pricePerOne - (packageItem.pricePerOne * packageItem.discount) / 100)}$</span>
                    </div>
                    :
                    <div className={Styles.package_price}>
                      <span>{packageItem.pricePerOne}$</span>
                    </div>
                  }
                </div>
                <div className={Styles.package_desc}>
                  <p>{truncateText(packageItem.description, 95)}</p>
                </div>
                <Link to={`/SinglePackage/${packageItem._id}`}>
                  <button className={Styles.package_btn}>Details <HiOutlineClipboardCheck /></button>
                </Link>
              </div>
            </div>
          )
        })}
    </div>
  );
}

import React from 'react';
import Styles from './PackagesBanner.module.css';
import video from '../../assets/videos/splash.mp4';
import { FaLocationDot } from "react-icons/fa6";

export default function PackagesBanner({ countryFilter, selectedDate, maxPrice, country,setCountryFilter, setSelectedDate, setMaxPrice }) {
    if(country)
    {
        setCountryFilter(country)
    }

    return (
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
                    max='2000'
                    min='200'
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                    />
                </div>
                </div>
            </div>
            </div>
        </section>
    );
}

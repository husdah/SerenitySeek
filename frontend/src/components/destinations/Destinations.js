import React, { useEffect, useState } from 'react'
import axios from 'axios';
import londonImage from '../../images/london.jpg';
import dubaiImage from '../../images/dubai.jpg';
import styles from './destinations.module.css';
import { Link } from 'react-router-dom'

export default function Destinations() {
    const [packages,setPackages]=useState([]);
    useEffect(()=>{
        const fetchPackages=async()=>{
            const response=await fetch("http://localhost:4000/api/homePackage");
            const data=await response.json();
            console.log(data);
            if(response.ok)
            {
                setPackages(data);
            }
        }
        fetchPackages();
    },[])
    // const getCompanyName = async (companyId) => {
    //     try {
    //         const response = await fetch(`http://localhost:4000/api/company/${companyId}`);
    //         const data=response.json();
    //         return data.name;
    //     } catch (error) {
    //         console.error('Error fetching company details:', error);
    //         return '';
    //     }
    // };

  return (

    <div className={styles.destinations}>
        <h1>Most Visited Destinations</h1>
        <div className={styles.cards}>
          {packages && packages.map(packageItem=>(
              <div className={styles.card} key={packageItem._id}>
              <div className={styles.card__img}>
                
                  <img src= {`http://localhost:4000/uploads/${packageItem.coverImg}`} crossOrigin="anonymous" alt=""/>
              </div>
              <div className={styles.card__body}>
              <h1>{packageItem.country}</h1>
                  <div className={styles.info}>
                  <p className={styles.info__highlight}>{packageItem.pricePerOne} $</p>
                  <Link to={`/SinglePackage/${packageItem._id}`}>
                     <button>Book Now</button>
                  </Link>
                  </div>
              </div>
              <div className={styles.card__footer}>
                  <p>Shared by <span>{packageItem.companyId.name}</span></p>
              </div>
          </div>
          ))}

        </div>
        
    </div>
  )
}

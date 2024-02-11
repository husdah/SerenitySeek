import React, { useEffect, useState } from 'react'
import axios from 'axios';
import londonImage from '../../images/london.jpg';
import dubaiImage from '../../images/dubai.jpg';
import './destinations.css';

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
    <div className="destinations">
        <h1>Most Visited Destinations</h1>
        <div className="cards">
          {packages && packages.map(packageItem=>(
              <div className="card">
              <div className="card__img">
                  <img src={londonImage} alt=""/>
              </div>
              <div className="card__body">
                  <h1>{packageItem.country}</h1>
                  <p>Lorem ipsum dolorsit, amet consectetur adipisicing elit corrupti delectus rep rehenderit.</p>
                  <div className="info">
                  {/* <p className="info__highlight">{new Date(packageItem.startDate).toLocaleDateString("en-US")}</p> */}
                  <p className="info__highlight">{packageItem.pricePerOne} $</p>
                  <button>Book Now</button>
                  </div>
              </div>
              <div className="card__footer">
                  <p>Shared by <span>{packageItem.companyId}</span></p>
              </div>
          </div>
          ))}

        </div>
        
    </div>
  )
}

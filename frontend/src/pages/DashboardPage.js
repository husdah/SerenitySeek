import React, { useState, useEffect } from 'react';
import Styles from '../assets/css/Dashboard.module.css';
import imageURL from '../assets/images/airplane.png';
import imageBg from '../assets/images/dashboardImg.png'
import { useAuthContext } from '../hooks/useAuthContext';
import {jwtDecode} from 'jwt-decode';
import DashboardWidget from '../components/DashboardWidget';

export default function DashboardPage() {
  const [packages, setPackages] = useState([]);
  const [bookPackages, setBookPackages] = useState([]);
  const [customerNumber, setCustomerNumber] = useState([]);
  const { user, dispatch } = useAuthContext();
  let companyId    = jwtDecode(user.accessToken).user.id;
  console.log(companyId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCompanyInfo = await fetch(`http://localhost:4000/api/company/${companyId}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.accessToken}`
          },
          credentials: 'include'
        });

        const jsonCompanyInfo = await responseCompanyInfo.json();
        console.log('company record', jsonCompanyInfo);
        if (responseCompanyInfo.ok) {
          const numberOfCustomers = jsonCompanyInfo.customers.length; // Get the number of customers
          setCustomerNumber(numberOfCustomers); 
          //console.log('number of customers:', numberOfCustomers);
        } 
        else {
          console.log('Error fetching company info');
        }

        const responsePackages = await fetch(`http://localhost:4000/api/packageForCompany`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.accessToken}`
          },
          credentials: 'include'
        });

        const jsonPackages = await responsePackages.json();
        console.log('package record:', jsonPackages);
        if (responsePackages.ok) {
          setPackages(jsonPackages);
          //console.log('number of packages:', jsonPackages.length);
        } 
        else {
          console.log('No Available Package');
        }

        //Function to get the countries of this company from the packages documents
        const createPackageIdToCountryMapping = (jsonPackages) => {
          const mapping = {};
          jsonPackages.forEach((packagee) => {
            const countryName = packagee.country;
            if (!mapping[countryName]) {
              mapping[countryName] = packagee._id;
            }
          }); 
          return mapping;
        };
        
        // Function to calculate statistics
        const calculateStatistics = (bookPackages) => {
          const statistics = {};

          bookPackages.forEach((booking) => {
            const { packageId, nbPeople } = booking;
            const country = createPackageIdToCountryMapping(jsonPackages);

            if (!statistics[country]) {
              statistics[country] = 0;
            }

            statistics[country] += nbPeople;
          });

          return statistics;
        };

        const responseBookPackages = await fetch(`http://localhost:4000/package/bookPackage/forcompany/${companyId}`);
        const jsonBookPackages = await responseBookPackages.json();
        //console.log('book package record:', jsonBookPackages);
        if (responseBookPackages.ok) {
          setBookPackages(jsonBookPackages);
          const statistics = calculateStatistics(jsonBookPackages);
          console.log('Statistics for company:', statistics);
          //console.log('number of booking', jsonBookPackages.length);
        } 
        else {
          console.log('No Available Book Packages');
        }

      } catch (error) {
        console.error('An error occurred while fetching data', error);
      }
    };

    fetchData();
  }, [companyId, user.accessToken, dispatch]);

 

  
  return (
    <div className={Styles.dashbaord_content}>
      <div className={Styles.dashboard_header}>
        <span className={Styles.dashbaord_pageTitle}> Dashboard </span>     
      </div>
      
      <div className={Styles.dashbaord_widgets}>
        <DashboardWidget title="Packages" number={packages.length} imageSrc={imageURL} className={Styles.widget1}/>
        <DashboardWidget title="Customers" number={customerNumber} imageSrc={imageURL} className={Styles.widget2}/>
        <DashboardWidget title="Booking Packages" number={bookPackages.length} imageSrc={imageURL} className={Styles.widget3}/>
      </div>

      <div className={Styles.statistic_banner}>

        <div className={Styles.statistic_banner_left}>
          <div className={Styles.statistic_section}>
            <span className={Styles.statistic_head}>Last Trips</span>
            <span className={Styles.statistic_subTitle}>Overview of latest month</span>
          </div>

          <div className={Styles.statistic_table}>
            <div className={Styles.statistic_heading}>
              <span>Flight</span>
              <span>Total Members</span>
              <span>Min Price</span>
              <span>Max Price</span>
            </div>

            <div className={Styles.statistic_values}>
              <span>France</span>
              <span>500</span>
              <span>500</span>
              <span>1200</span>
            </div>
            <div className={Styles.statistic_values}>
              <span>Maldive</span>
              <span>200</span>
              <span>1300</span>
              <span>2000</span>
            </div>
            <div className={Styles.statistic_values}>
              <span>Switzerland</span>
              <span>250</span>
              <span>600</span>
              <span>1100</span>
            </div>
            <div className={Styles.statistic_values}>
              <span>Bali</span>
              <span>100</span>
              <span>1800</span>
              <span>2000</span>
            </div>
          </div>
        </div>

        <div className={Styles.statistic_banner_right}>
          <img src={imageBg} alt='banner-img' className={Styles.dashboardBanner_image}/>
        </div>

      </div>

  </div>
  )
}


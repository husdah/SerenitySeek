import React, { useState, useEffect } from 'react';
import Calendarr from '../components/Calendarr';
import Styles from '../assets/css/Dashboard.module.css';
import imageURL from '../assets/images/airplane.png';
import { useAuthContext } from '../hooks/useAuthContext';
import {jwtDecode} from 'jwt-decode';
import DashboardWidget from '../components/DashboardWidget'

export default function DashboardPage() {
  const [packages, setPackages] = useState([]);
  const [bookPackages, setBookPackages] = useState([]);
  const [customerNumber, setCustomerNumber] = useState([]);
  const { user, dispatch } = useAuthContext();
  let companyId = jwtDecode(user.accessToken).user.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsePackages = await fetch(`http://localhost:4000/api/packageForCompany`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.accessToken}`
          },
          credentials: 'include'
        });

        const jsonPackages = await responsePackages.json();
        if (responsePackages.ok) {
          setPackages(jsonPackages);
          //console.log('number of packages:', jsonPackages.length);
        } 
        else {
          console.log('No Available Package');
        }

        const responseBookPackages = await fetch(`http://localhost:4000/package/bookPackage/forcompany/${companyId}`);
        const jsonBookPackages = await responseBookPackages.json();
        if (responseBookPackages.ok) {
          setBookPackages(jsonBookPackages);
          //console.log('number of booking', jsonBookPackages.length);
        } 
        else {
          console.log('No Available Book Packages');
        }

        const responseCompanyInfo = await fetch(`http://localhost:4000/api/company/${companyId}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.accessToken}`
          },
          credentials: 'include'
        });

        const jsonCompanyInfo = await responseCompanyInfo.json();
        if (responseCompanyInfo.ok) {
          const numberOfCustomers = jsonCompanyInfo.customers.length; // Get the number of customers
          setCustomerNumber(numberOfCustomers); // Set the number of customers in the state
          console.log('number of customers:', numberOfCustomers);
        } 
        else {
          console.log('Error fetching company info');
        }

      } catch (error) {
        console.error('An error occurred while fetching data', error);
      }
    };

    fetchData();
  }, [companyId, user.accessToken, dispatch]);
  
  return (
    <div className={Styles.dashbaord_content}>
      <h1 className={Styles.dashbaord_pageTitle}> Dashboard </h1>
      <div className={Styles.dashbaord_widgets}>
        <DashboardWidget title="Packages" number={packages.length} imageSrc={imageURL} className={Styles.widget1}/>
        <DashboardWidget title="Customers" number={customerNumber} imageSrc={imageURL} className={Styles.widget2}/>
        <DashboardWidget title="Booking Packages" number={bookPackages.length} imageSrc={imageURL} className={Styles.widget3}/>
      </div>
      

      <Calendarr />
  </div>
  )
}


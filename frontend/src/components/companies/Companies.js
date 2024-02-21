import React, { useEffect,useState} from 'react'
import {Link} from 'react-router-dom';
import londonImage from '../../images/london.jpg';
import styles from '../companies/companies.module.css'
export default function Companies() {
    const [companies,setCompanies]=useState([]);
    useEffect(()=>{
       const fetchCompanies=async()=>{
        const response=await fetch("http://localhost:4000/api/homeCompanies")
        const data=await response.json();
        if(response.ok)
        {
            setCompanies(data);
        }
       }
       fetchCompanies();
    },[])
  return (
    <div className={styles.companies}>
        <h1>Our Companies</h1>
        <div className={styles.companies_cards}>
          
        {companies && companies.map(company=>(
          <div className={styles.company_card} key={company.name}>
              <div className={styles.company_img}>
                <img src={ company.logo ?`http://localhost:4000/uploads/${company.logo}`:londonImage} alt="" crossOrigin='anonymous'/>
            </div>
            <div className={styles.company_info}>
              <h4>{company.name}</h4>
              <Link to={`/companyInfo?companyName=${encodeURIComponent(company.name)}`}>
                 <button>View Details</button>
              </Link>
            </div>
          </div>
        ))}
            
          
       </div>
   </div>
  )
}

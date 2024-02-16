import React, { useEffect,useState} from 'react'
import styles from '../companies/companies.module.css'
export default function Companies() {
    const [companies,setCompanies]=useState([]);
    useEffect(()=>{
       const fetchCompanies=async()=>{
        const response=await fetch("http://localhost:4000/api/companies")
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
    </div>
  )
}

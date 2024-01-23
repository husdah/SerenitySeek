import React from 'react'
import {useState,useEffect} from 'react'

export default function Companies() {
    const [companies,setCompanies]=useState([]);

useEffect(()=>{
    const fetchCompanies=async()=>{
        const response=await fetch("http://localhost:4000/api/companies")
        const json=await response.json();
        console.log(json)
        if(response.ok)
        {
            setCompanies(json);
          
        }
    }
    fetchCompanies();
   },[])

 console.log(companies)
  return (
    <div className="container">
    {companies.map(company => (
        <div key={company._id}>
            <p>Name: {company.name}</p>
            <p>Description: {company.description}</p>
            <p>Location: {company.location}</p>
            <img  alt={company.name +" logo"}></img>
        </div>
    ))}
    </div>
  )
}

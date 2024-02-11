import React from 'react'
import {useState,useEffect} from 'react'

export default function Companies() {
    const [companies,setCompanies]=useState([]);

useEffect(()=>{
    const fetchCompanies=async()=>{
        const response=await fetch("http://localhost:4000/api/companies")

        const newAccessToken = response.headers.get('New-Access-Token');

        // Check if a new access token is present
        if (newAccessToken) {
            // Update the access token in LocalStorage
            localStorage.setItem('accessToken', newAccessToken);

            // Now you can use the new access token for future requests
            console.log('New access token saved:', newAccessToken);
        }
        
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
            <img  alt={company.name +" logo"} src='' crossOrigin="anonymous"></img>
        </div>
    ))}
    </div>
  )
}

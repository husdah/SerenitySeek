import React, { useState, useEffect } from 'react';
import '../assets/Table.css'
import { BsFillPencilFill, BsFillTrashFill} from 'react-icons/bs'

export default function Table() {
    
    const [packages, setPackages] = useState([]);
    useEffect(() => {
        const fetchPackages = async () => {
          try {
            const response = await fetch('http://localhost:4000/api/packages');
            const json = await response.json();
            console.log(json);
            if (response.ok) {
              setPackages(json);
            }
          } catch (error) {
            console.error('An error occurred while fetching data', error);
          }
        };
    
        fetchPackages();
      }, []);
    return (
        <div className='Table-wrapper'>
            
                <table className='table' >
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Country</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Start Date</th>
                        <th>Duration</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        { packages.map((packageItem, idx) => {
                          return <tr key={idx}>
                              <td>{packageItem.name}</td>
                              <td>{packageItem.country}</td>
                              <td>{packageItem.type}</td>
                              <td>{packageItem.pricePerOne}</td>
                              <td>{new Date(packageItem.startDate).toLocaleDateString("en-US")}</td>
                              <td>{packageItem.duration}</td>
                              <td><span className='actions'><BsFillTrashFill className='delete-btn' /><BsFillPencilFill /></span></td>
                          </tr>
                        })}
                    </tbody>
                </table>
        </div>
    ) 
}
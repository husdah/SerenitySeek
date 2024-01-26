import React, { useState, useEffect } from 'react';

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [filter, setFilter] = useState('');
  const [selectedField, setSelectedField] = useState('name');

  const fields = ['destination', 'type', 'name'];

  const searchText = (event) => {
    setFilter(event.target.value);
  };

  const selectField = (event) => {
    setSelectedField(event.target.value);
  };

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

  

  const filteredPackages = packages.filter((packageItem) => {
  const destinations = packageItem.destination || [];
  
    // Check if any of the criteria match
  return (
      packageItem.name.toLowerCase().includes(filter.toLowerCase()) ||
      packageItem.type.toLowerCase().includes(filter.toLowerCase()) ||
      destinations.some(
        (destination) =>
          destination.name.toLowerCase().includes(filter.toLowerCase())
      )
    );
  });
  
  return (
    <div className="container">
      <div>
        <h1>Search filter</h1>
        <select value={selectedField} onChange={selectField}>
          {fields.map((field) => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </select>
        <input
          type="text"
          className="form-controller"
          value={filter}
          onChange={searchText}
        />
      </div>
      {filteredPackages.map((packageItem) => (
        <div key={packageItem._id}>
          <p>Name: {packageItem.name}</p>
          <p>Country: {packageItem.country}</p>
          <p>Price: {packageItem.pricePerOne}</p>
          <p>Description: {packageItem.description}</p>
          <p>Type: {packageItem.type}</p>
          <p>Start Date: {packageItem.startDate}</p>
          <p>Duration: {packageItem.duration}</p>

          {/* Displaying destinations */}
          <h3>Destinations:</h3>
          {packageItem.destination.map((destination) => (
            <div key={destination._id}>
              <p>Destination Name: {destination.name}</p>

              {/* Displaying activities */}
              <h4>Activities:</h4>
              {destination.activities.map((activity) => (
                <div key={activity._id}>
                  <p>Activity Name: {activity.name}</p>
                  <p>Activity Description: {activity.description}</p>
                </div>
              ))}
            </div>
          ))}

          {/* Displaying cover image */}
          <img
            src={`http://localhost:4000/uploads/${packageItem.coverImg}`}
            alt={packageItem.name}
          />
          <br />
          <br />
          <br />
          <br />
        </div>
      ))}
    </div>
  );
}
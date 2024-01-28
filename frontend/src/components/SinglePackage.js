import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function SinglePackage() {
    // useParams(): It is used to access the parameters from the URL in a React component.
    const { packageId } = useParams();
    const [ packageData, setPackageData] = useState([]);

    useEffect(() => {
      const fetchPackageData = async () => {
          try {
              const response = await fetch(`http://localhost:4000/api/package/${packageId}`);
              const json = await response.json();
              console.log(json);
  
              if (response.ok) {
                  if (Array.isArray(json)) {
                    setPackageData(json);
                  } else {
                    setPackageData([json]);
                  }
              }
          } catch (error) {
              console.error('An error occurred while fetching data', error);
          }
      };
  
      fetchPackageData();
  }, [packageId]);

  return (
    <div className="container">
      {packageData.map((packageItem) => (
        <div key={packageItem._id}>
          <p>Name: {packageItem.name}</p>
          <p>Country: {packageItem.country}</p>
          <p>Price: {packageItem.pricePerOne}</p>
          <p>Description: {packageItem.description}</p>
          <p>Type: {packageItem.type}</p>
          {/* To format the date to display only the date part (year, month, day) We use: The toLocaleDateString method will format the date according to the specified locale. */}
          <p>Start Date: {new Date(packageItem.startDate).toLocaleDateString("en-US")}</p>
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
          {/* Displaying hotels */}
          <h3>Hotels:</h3>
          {packageItem.hotels.map((hotel) => (
            <div key={hotel._id}>
              <p>Hotel Name: {hotel.name}</p>
              <p>Hotel Address: {hotel.location}</p>
              {/* Add other hotel details as needed */}
            </div>
          ))}
          <br />
          <br />
          <br />
          <br />
        </div>
      ))}
    </div>
  );
}
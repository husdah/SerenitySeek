import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../assets/SinglePackage.css'
import { FaStar, FaRegCalendarAlt, FaHotel, FaLayerGroup } from 'react-icons/fa'
import { IoMdTime } from "react-icons/io";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

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

  // Function to generate star icons based on the rating
  function generateStars(rating) {
    const starCount = Math.round(rating); // Round the rating to the nearest integer
    return Array.from({ length: starCount }, (_, index) => <FaStar key={index} className='hotel-star' />);
  }

  
  return (
    <div className="container">
        {packageData.map((packageItem) => {
          let imageUrl = `http://localhost:4000/uploads/${packageItem.coverImg}`;
          return(
            
          <div className='singlePackage-container'>
            <div className='container-image'>
              <img src={imageUrl} className='singlePackage-Img' alt={packageItem.name + 'image'} crossOrigin="anonymous" />
            </div>
            <div className='container-details' key={packageItem._id}>
              <RiMoneyDollarCircleFill className='singlePackage-priceIcon'/><span className='singlePackage-price'> { packageItem.pricePerOne }</span>
              <h3 className='singlePackage-title'> { packageItem.name } </h3>
              <h1 className='singlePackage-country'> { packageItem.country } </h1>
              <p className='singlePackage-description'> { packageItem.description } </p> 
              <div className='singlePackage-group'>
                <p><FaLayerGroup className='singlePackage-typeIcon' /> {packageItem.type}</p>
                {/* To format the date to display only the date part (year, month, day) We use: The toLocaleDateString method will format the date according to the specified locale. */}
                <p><FaRegCalendarAlt className='singlePackage-dateIcon' /> {new Date(packageItem.startDate).toLocaleDateString("en-US")}</p>
                <p><IoMdTime className='singlePackage-durationIcon'/> {packageItem.duration}</p>
              </div>
              <h2 className='singlePackage-tourTitle'> Tours </h2>
              {packageItem.destination.map((destination, index) => (
                <div className='singlePackage-tour' key={destination._id}>
                  <p>{index + 1}- {destination.name}</p>
                  {/* Displaying activities */}
                  <h4>Available activities:</h4>
                  {destination.activities.map((activity, index) => (
                    <div key={activity._id}>
                      <span> Activity {index + 1}</span>
                      <p> {activity.name}: {activity.description}</p>
                    </div>
                  ))}
                </div>
              ))}
              <p>Company Name: {packageItem.companyId.name}</p>
              <h3><FaHotel className='singlePackage-hotel'/> Hotels:</h3>
              
                {packageItem.hotels.map((hotel, index) => (
                  <div key={hotel._id}>
                  <br />
                  <p>Hotel Name {index + 1}: {hotel.name}</p>
                  <p>Hotel Address {index + 1}: {hotel.location}</p>
                  
                  {/* Displaying the gallery images */}
                  {hotel.gallery && hotel.gallery.length > 0 && (
                    <div>
                      <p>Hotel Gallery:</p>
                      <div className="gallery-container">
                        {hotel.gallery.map((imageObject, imageIndex) => (
                          <img
                            key={imageIndex}
                            src={`http://localhost:4000/uploads/${imageObject.filename}`}//hotel gallery: array of objects to access it [{hotel.gallery}].filename
                            alt={`Hotel Gallery - Image ${imageIndex + 1}`}
                            className="gallery-image"
                            crossOrigin="anonymous"
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  <p> {generateStars(hotel.rating)}</p>
                  </div>
                ))}
            </div> 
          </div>
        )  
      })}
    </div>
  );
}
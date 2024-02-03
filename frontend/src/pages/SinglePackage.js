import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { FaStar, FaRegCalendarAlt, FaHotel, FaLayerGroup } from 'react-icons/fa'
import { IoMdTime } from "react-icons/io";
import { IoLocationSharp } from "react-icons/io5";
import { RiMoneyDollarCircleFill } from "react-icons/ri"
import Styles from '../assets/css/SinglePackage.module.css'

import SliderHotel from '../components/SliderHotel'

export default function SinglePackage() {
    // useParams(): It is used to access the parameters from the URL in a React component.
    const { packageId } = useParams();
    const [ packageData, setPackageData] = useState([]);

    useEffect(() => {
      /* Byn3mla render lal function kel ma yt8yar dependency */
      const fetchPackageData = async () => {
          try {
              const response = await fetch(`http://localhost:4000/api/package/${packageId}`, { withCredentials: true });
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
    return Array.from({ length: starCount }, (_, index) => <FaStar key={index} className={Styles.hotel_star} />);
  }

  
  return (
    <div className={Styles.container}>
      {packageData.map((packageItem) => {
          let imageUrl = `http://localhost:4000/uploads/${packageItem.coverImg}`;
          console.log(imageUrl);
          const divStyle = {
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover', 
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }; 
          const getHotelContainerClass = (numberOfHotels) => {
            switch (numberOfHotels) {
              case 2:
                return Styles.twoHotels;
              case 3:
                return Styles.threeHotels;
              case 4:
                return Styles.FourHotels;
              default:
                return Styles.defaultHotels;
            }
          };
          const getDestinationContainerClass = (numberOfdestination) => {
            switch (numberOfdestination) {
              case 2:
                return Styles.twoDestinations;
              case 3:
                return Styles.threeDestinations;
              case 4:
                return Styles.FourDestinations;
              default:
                return Styles.defaultDestination;
            }
          };
          return(
            <div className={Styles.singlePackageDiv} key={packageItem._id} >
              
              <div className={Styles.singlePackage_banner} style={divStyle}>
                {/*<img src={imageUrl} alt={packageItem.name + 'image'} crossOrigin="anonymous" />*/}
                <span className={Styles.singlePackage_country}> { packageItem.country } </span>
                <span className={Styles.singlePackage_title}> { packageItem.name } </span>
                <div className={Styles.singlePackage_group}>
                  <p><FaLayerGroup className={Styles.singlePackage_typeIcon} /> {packageItem.type}</p>
                  {/* To format the date to display only the date part (year, month, day) We use: The toLocaleDateString method will format the date according to the specified locale. */}
                  <p><FaRegCalendarAlt className={Styles.singlePackage_dateIcon} /> {new Date(packageItem.startDate).toLocaleDateString("en-US")}</p>
                  <p><IoMdTime className={Styles.singlePackage_durationIcon}/> {packageItem.duration}</p>
                  <p><RiMoneyDollarCircleFill className={Styles.singlePackage_priceIcon}/> { packageItem.pricePerOne }</p>
              </div>
              </div>

              <div className={Styles.singlePackageHeading}>
                <h1 className={Styles.dest_title}> Our Destination</h1>
                <span className={Styles.dest_subTitle}>Join The Adventure</span>
              </div>

              <div className={Styles.dest_Container}>
                <div className={Styles.dest_desc}>
                  <span className={Styles.singlePackage_description}> { packageItem.description } </span>
                </div>
                <div className={`${Styles.destination} ${getDestinationContainerClass(packageItem.destination.length)}`}>
                  { packageItem.destination.map((destination, index) => (
                    <div key={destination._id} className={Styles.singlePackage_destinationBox}>
                      <div className={Styles.singlePackage_destinationBoxNum}><span className={Styles.singlePackage_destinationBoxNumText}>{index + 1 }</span></div>
                      <p>{destination.name}</p>
                      { destination.activities.map((activity, index) => (
                        <div key={activity._id} >
                          <p> <b> {activity.name}: </b> {activity.description} </p>
                        </div>
                      ))}
                      <br />
                    </div>
                  ))}
                </div>
              </div>

              <div className={Styles.singlePackageHeading}>
                <h1 className={Styles.hotel_title}> Our Hotel</h1>
                <span className={Styles.hotel_subTitle} >Exquisite Comfort in Every Stay</span>            
              </div>
              
              <div className={`${Styles.hotel_Container} ${getHotelContainerClass(packageItem.hotels.length)}`}>
                {packageItem.hotels.map((hotel, index) => (
                  <div key={hotel._id}>
                    {hotel.gallery && hotel.gallery.length > 0 && (
                        <SliderHotel galleryImages={hotel.gallery} hotels={packageItem.hotels.length} />
                    )}
                    <div className={Styles.hotelDetails}>
                      <div className={Styles.hotelInfo}>
                        <p> <FaHotel className={Styles.singlePackage_hotelIcon}/> <span> {hotel.name} </span> </p>
                        <p> <IoLocationSharp className={Styles.singlePackage_addressIcon}/> <span> {hotel.location} </span> </p>
                      </div>
                      <div className={Styles.hotelRating}>
                        <p> {generateStars(hotel.rating)}</p>
                      </div>
                    </div>
                    
                  </div>
                ))}          
              </div>

            </div>
          )
      })}
    </div>
  );
}
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Styles from '../assets/css/SinglePackage.module.css'
import { FaStar, FaRegCalendarAlt, FaHotel, FaLayerGroup } from 'react-icons/fa'
import { IoMdTime } from 'react-icons/io'
import { FaBookmark } from "react-icons/fa6";
import { IoLocationSharp } from 'react-icons/io5';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';
import SliderHotel from '../components/SliderHotel';
import { Link } from 'react-router-dom'; 
import Navbar from '../components/navbar//Navbar';
import Footer from '../components/Footer/Footer';
import PopUpPay from '../components/popUpPay/PopUpPay'
import bookImg from '../assets/images/booking.png'

export default function SinglePackage() {
    // useParams(): It is used to access the parameters from the URL in a React component.
    const { packageId } = useParams();
    const [ packageData, setPackageData] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
      /* Byn3mla render lal function kel ma yt8yar dependency */
      const fetchPackageData = async () => {
          try {
              const response = await fetch(`http://localhost:4000/api/package/${packageId}`, { withCredentials: true });
              const json = await response.json();
              console.log("Package Details", json); 
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

  /* Function to generate star icons based on the rating */
  function generateStars(rating) {
    const starCount = Math.round(rating); 
    return Array.from({ length: starCount }, (_, index) => <FaStar key={index} className={Styles.hotel_star} />);
  }
  const handleBook = () => {
    setIsPopupOpen(true);
  };

  /* Function to generate class name based on the type of the package */
  const getBannerClassName = (packageType) => {
    switch (packageType) {
      case 'Adventure':
        return Styles.adventureBanner;
      case 'Beach':
        return Styles.beachBanner;
      case 'Combination':
        return Styles.combinationBanner;  
      case 'Romantic':
        return Styles.romanticBanner;
      case 'Family':
        return Styles.familyBanner;
      case 'History':
        return Styles.historyBanner;
      case 'Nature':
        return Styles.natureBanner;
      case 'Relax':
        return Styles.relaxBanner;
      default:
        return ''; // Default classname if type doesn't match
    }
  };

  /* Function to generate class name based on the number of hotels */
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

  /* Function to generate class name based on the number of destinations */
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

  return (
    <div className={Styles.singlePackagePage}>
      <Navbar nothome='true' />
      {packageData.map((packageItem) => {
          let imageUrl = `http://localhost:4000/uploads/${packageItem.coverImg}`;
          return(
            <div className={Styles.singlePackageDiv} key={packageItem._id} >
              <div className={`${Styles.singlePackage_banner} ${getBannerClassName(packageItem.type)}`} >
                <span className={Styles.singlePackage_country}> { packageItem.country } </span>
                <span className={Styles.singlePackage_title}> { packageItem.name } </span>
              </div>

              <div className={Styles.singlePackage_group}>
                  <p><FaLayerGroup className={Styles.singlePackage_typeIcon} /> {packageItem.type}</p>
                  {/* To format the date to display only the date part (year, month, day) We use: The toLocaleDateString method will format the date according to the specified locale. */}
                  <p><FaRegCalendarAlt className={Styles.singlePackage_dateIcon} />{new Date(packageItem.startDate).toLocaleDateString("en-US")}</p>
                  <p><IoMdTime className={Styles.singlePackage_durationIcon}/> {packageItem.duration}</p>
                  {packageItem.discount ?
                    <p><RiMoneyDollarCircleFill className={Styles.singlePackage_priceIcon}/> {Math.ceil(packageItem.pricePerOne - (packageItem.pricePerOne * packageItem.discount) / 100)} </p>
                    :
                    <p><RiMoneyDollarCircleFill className={Styles.singlePackage_priceIcon}/> { packageItem.pricePerOne }</p>
                  }
              </div>
              
              <div className={Styles.singlePackage_BtnDiv}>
        

                <button className={Styles.singlePackage_button} onClick={handleBook}><img src={bookImg} alt="booking" /></button>
                {packageItem.discount ?
                    <PopUpPay isOpen={isPopupOpen} price={Math.ceil(packageItem.pricePerOne - (packageItem.pricePerOne * packageItem.discount) / 100)} packageId={packageItem._id}  companyId={packageItem.companyId} onClose={() => setIsPopupOpen(false)} />
                    :
                    <PopUpPay isOpen={isPopupOpen} price={packageItem.pricePerOne } packageId={packageItem._id}  companyId={packageItem.companyId} onClose={() => setIsPopupOpen(false)} />
                  }
                
              </div> 

              <div className={Styles.singlePackage_container_1}>
                <div className={Styles.dest_img}>
                  <img src={imageUrl} alt={packageItem.name + 'image'} crossOrigin="anonymous" />
                </div>
                <div className={Styles.dest_desc}>

                  {/*<span className={Styles.singlePackage_description}> { packageItem.description } <p><b>Shared By:</b> </p>
                    <span>
                      <Link to={`/companyInfo?companyName=${encodeURIComponent(packageItem.companyId.name)}`}>
                        {packageItem.companyId.name}
                      </Link>
                    </span>
                  </span>*/}
                  <span className={Styles.singlePackage_description}> { packageItem.description } <p><b>Shared By:</b> </p>
                    <span>
                    {packageItem.companyId.name} <Link to={`/companyInfo?companyName=${encodeURIComponent(packageItem.companyId.name)}`}>
                        <button className={Styles.discoverCompanyBtn}>Discover</button>
                      </Link>
                    </span>
                  </span>
                  
                </div>
              </div>

              <div className={Styles.singlePackageHeadingDest}>
                <h1 className={Styles.dest_title}> Our Destination</h1>
                <span className={Styles.dest_subTitle}>Join The Adventure</span>
              </div>

              <div className={Styles.singlePackage_container_2}>
                <div></div>
                <div className={Styles.dest_Container}>
                  <div className={`${Styles.destination} ${getDestinationContainerClass(packageItem.destination.length)}`}>
                    { packageItem.destination.map((destination, index) => (
                      <div key={destination._id} className={Styles.singlePackage_destinationBox}>
                        <div className={Styles.singlePackage_destinationBoxNum}><span className={Styles.singlePackage_destinationBoxNumText}>{index + 1 }</span></div>
                        <p className={Styles.destName} >{destination.name}</p>
                        { destination.activities.map((activity, index) => (
                          <div key={activity._id} >
                            <span className={Styles.singlePackage_destinationActivity}> <b> {activity.name}: </b> {activity.description} </span>
                          </div>
                        ))}
                        <br />
                      </div>
                    ))} 
                  </div>
              </div>
              </div> 

              <div className={Styles.singlePackageHeadingHotel}>
                <h1 className={Styles.hotel_title}> Our Hotel</h1>
                <span className={Styles.hotel_subTitle} >Exquisite Comfort in Every Stay</span>            
              </div>

              <div className={Styles.singlePackage_container_3}>
                <div className={`${Styles.hotel_Container} ${getHotelContainerClass(packageItem.hotels.length)}`}>
                  {packageItem.hotels.map((hotel) => (
                    <div key={hotel._id}>
                      {hotel.gallery && hotel.gallery.length > 0 && (
                          <SliderHotel galleryImages={hotel.gallery} />
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
            </div>
          )
      })}
      <Footer />
    </div>
  );
}
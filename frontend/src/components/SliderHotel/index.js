import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './sliderHotel.css';
import { Pagination } from 'swiper/modules';

export default function sliderHotel({ galleryImages, hotels }) {
  // Function to generate class name based on the number of hotels
  const getHotelContainerClass = () => {
    const numberOfHotels = hotels;

    if (numberOfHotels === 2) {
      return 'twoHotels';
    } else if (numberOfHotels === 3) {
      return 'threeHotels';
    } 
    else if (numberOfHotels === 4) {
      return 'fourHotels';
    }
    else {
      // Add more conditions as needed
      return 'defaultHotels';
    }
  };

  return (
    <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
      {galleryImages.map((imageObject, imageIndex) => (
        <SwiperSlide key={imageIndex} className='slider_slide'>
          <img
            src={`http://localhost:4000/uploads/${imageObject.filename}`}
            alt={`Hotel Gallery - number ${imageIndex + 1}`}
            crossOrigin="anonymous"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import './sliderHotel.css'


export default function sliderHotel({ galleryImages}) {
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
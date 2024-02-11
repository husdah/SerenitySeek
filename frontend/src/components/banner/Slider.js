import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';


const Slider = ({ sliderData,onImageClick, onSlideChange }) => {
  

  return (
    <Swiper
      effect={'coverflow'}
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={'auto'}
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      pagination={true}
      modules={[EffectCoverflow, Pagination]}
      className="mySwiper"
      onSlideChange={(swiper) => onSlideChange(swiper)}
    >
      {sliderData.map((slide, index) => (
        <SwiperSlide key={index}>
          <img
            src={slide.src}
            onClick={() => onImageClick(slide.src, { title: slide.title, description: slide.description })}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;

import React, { useRef, useState,useEffect } from 'react';
import styles from './travelersSwiper.module.css'
import londonImage from '../../images/london.jpg';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

export default function TravelersSwiper() {
    const [blogs,setBlogs]=useState([]);
    useEffect(()=>{
        const fetchBlogs=async()=>{
            const response=await fetch("http://localhost:4000/blogs/blog");
            const data=await response.json();
            if(response.ok)
            {
                setBlogs(data);
            }
        }
        console.log(blogs);

        fetchBlogs()
    },[])
  return (
    <div className={styles.travelersSwiper}>
    <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {/* <SwiperSlide className={styles.forimg}><img src={londonImage} alt="" /></SwiperSlide> */}
        {blogs && blogs.map(blog => (
        blog.gallery && blog.gallery.length > 0 && 
        blog.gallery.map((imageObject, imageIndex) => (
           
            <SwiperSlide className={styles.forimg}> <img src={`http://localhost:4000/uploads/${imageObject.filename}`} alt="" crossOrigin='anonymous'/></SwiperSlide>
               
          
        ))
    ))}
       
      </Swiper>
    </div>
  )
}

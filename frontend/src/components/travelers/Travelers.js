import React, { useState,useEffect } from 'react';
import styles from './travelers.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import londonImage from '../../images/london.jpg'
import dubaiImage from '../../images/dubai.jpg';
import airplane from '../../images/airplaneshadow.png';
import TravelersSwiper from './TravelersSwiper';

export default function Travelers() {
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
    <div className={styles.travelers}>
        <h1>Our travelers memories</h1>
        <TravelersSwiper/>
        <div className={styles.airplane}>
          <img src={airplane} alt="" />
        </div>
    </div>
  )
}

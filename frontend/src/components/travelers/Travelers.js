import React, { useState,useEffect } from 'react';
import styles from './travelers.module.css';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import londonImage from '../../images/london.jpg';
import dubaiImage from '../../images/dubai.jpg';
import airplane from '../../images/airplaneshadow.png';

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
        <div className={styles.travelers_photos}>
        {blogs && blogs.map(blog => (
        blog.gallery && blog.gallery.length > 0 && 
        blog.gallery.map((imageObject, imageIndex) => (
           
          <img src={`http://localhost:4000/uploads/${imageObject.filename}`} alt="" crossOrigin='anonymous'/>
               
          
        ))
    ))}
          {/* <img src={londonImage} alt="" /> */}
        </div>
        <div className={styles.airplane}>
          <img src={airplane} alt="" />
        </div>
    </div>
  )
}

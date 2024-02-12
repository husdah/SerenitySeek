import React, { useState } from 'react';
import Slider from './Slider';
import Navbar from '../navbar/Navbar'
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import styles from './banner.module.css';

import greeceImage from '../../images/greece.jpg';
import franceImage from '../../images/france.avif';
import londonImage from '../../images/london.jpg';
import dubaiImage from '../../images/dubai.jpg';


const Banner = () => {
  const [backgroundImage, setBackgroundImage] = useState(
    londonImage
  );
  const [selectedData, setSelectedData] = useState({ title: 'Explore Britain', description: 'Britain, a tapestry of tradition and innovation, boasts iconic landmarks, rich history, and diverse culture. From historic sites like Stonehenge to the bustling streets of London, every corner tells a story of heritage and modernity intertwining seamlessly.' });
  const sliderData = [
    { src: londonImage, title: 'Explore Britain', description: 'Britain, a tapestry of tradition and innovation, boasts iconic landmarks, rich history, and diverse culture. From historic sites like Stonehenge to the bustling streets of London, every corner tells a story of heritage and modernity intertwining seamlessly.' },
    { src: dubaiImage, title: 'Explore Dubai', description: 'Description for Slider 2' },
    { src: franceImage, title: 'Explore France', description: 'Description for Slider 4' },
    { src: greeceImage, title: 'Explore Greece', description: 'Description for Slider 1' },
    { src: dubaiImage, title: 'Explore Dubai', description: 'Description for Slider 2' },
    { src: franceImage, title: 'Explore France', description: 'Description for Slider 4' }
  
  ];

  const handleImageClick = (imageSrc, imageData) => {
    setBackgroundImage(imageSrc);
    setSelectedData(imageData);
  };
  const handleSlideChange = (swiper) => {
    const activeIndex = swiper.activeIndex;
    const newBackgroundImage = sliderData[activeIndex].src;
    const newData = {
      title: sliderData[activeIndex].title,
      description: sliderData[activeIndex].description,
    };
  
    setBackgroundImage(newBackgroundImage);
    setSelectedData(newData);
  };
  


  return (
    <div className={styles.banner} style={{ backgroundImage: `url(${backgroundImage})` }}>
          <Navbar></Navbar>
          <div className={styles.banner_section2}>
            <div>
                {selectedData && (
                <>
                    <p>{selectedData.title}</p>
                    <p className={styles.desc}>{selectedData.description}</p>
                    <button className={styles.explore}>Explore</button>
                </>
                )}
            </div>
            <div>
            <Slider sliderData={sliderData} onImageClick={handleImageClick} onSlideChange={handleSlideChange}/>

            </div>
      </div>
    </div>
  );
};



export default Banner;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from './Slider';
import Navbar from '../navbar/Navbar'
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import styles from './banner.module.css';

import greeceImage from '../../images/greece2.jpg';
import franceImage from '../../images/france.avif';
import londonImage from '../../images/london.jpg';
import dubaiImage from '../../images/dubai.jpg';
import japanImage from '../../images/Japan.webp';
import turkeyImage from '../../images/turkey.jpg';


const Banner = () => {
  const [backgroundImage, setBackgroundImage] = useState(
    londonImage
  );
  const [selectedData, setSelectedData] = useState({ title: 'Explore England',countryName:'england', description: 'Britain, a tapestry of tradition and innovation, boasts iconic landmarks, rich history, and diverse culture. From historic sites like Stonehenge to the bustling streets of London, every corner tells a story of heritage and modernity intertwining seamlessly.' });
  const sliderData = [
    { src: londonImage,countryName:'england',title: 'Explore England', description: 'Britain, a tapestry of tradition and innovation, boasts iconic landmarks, rich history, and diverse culture. From historic sites like Stonehenge to the bustling streets of London, every corner tells a story of heritage and modernity intertwining seamlessly.' },
    { src: turkeyImage,countryName:'turkey', title: 'Explore Turkey', description: 'Turkey, where ancient history meets modern charm, offering diverse experiences from iconic landmarks to breathtaking landscapes along the Mediterranean.' },
    { src: dubaiImage, countryName:'dubai',title: 'Explore Dubai', description: 'Dubai, a modern marvel in the desert, dazzles with futuristic architecture, luxurious shopping, and desert adventures, offering a glimpse into a dynamic city where tradition meets opulence.' },
    { src: franceImage,countryName:'france', title: 'Explore France', description: 'France, a cultural haven, entices with its timeless elegance, from the romantic allure of Paris to the vineyard-laden countryside, promising a journey through art, history, and gastronomy.' },
    { src: greeceImage,countryName:'greece', title: 'Explore Greece', description: 'Greece, steeped in mythology and Mediterranean beauty, beckons with ancient ruins, idyllic islands, and a rich tapestry of culture, creating an unforgettable blend of history and relaxation.' },
    { src: japanImage,countryName:'japan', title: 'Explore Japan', description: 'Japan, a captivating blend of tradition and innovation, invites exploration of ancient temples, cherry blossoms, and futuristic cityscapes, providing a harmonious balance between past and present.' }
  
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
      countryName: sliderData[activeIndex].countryName,
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
                    <Link to={`/Package`} state={selectedData.countryName}>
                      <button className={styles.explore}>Explore</button>
                    </Link>
                  
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

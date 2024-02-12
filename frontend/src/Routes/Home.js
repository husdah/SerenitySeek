import React from 'react';
import Banner from '../components/banner/Banner';
import AboutUs from '../components/aboutUs/AboutUs';
import Destinations from '../components/destinations/Destinations'
import Services from '../components/servicesSection/Services';

const Home = () => {
  return (
    <div>
      <Banner />
      <AboutUs />
      <Services/>
      <Destinations />
    </div>
  )
}

export default Home
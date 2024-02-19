import React from 'react';
import Banner from '../components/banner/Banner';
import AboutUs from '../components/aboutUs/AboutUs';
import Destinations from '../components/destinations/Destinations'
import Services from '../components/servicesSection/Services';
import Travelers from '../components/travelers/Travelers';
import Footer from '../components/Footer/Footer';
import Companies from '../components/companies/Companies';

const Home = () => {
  return (
    <div>
      <Banner />
      <AboutUs />
      <Services/>
      <Destinations />
      <Companies/>
      <Travelers/>
      <Footer/>
    </div>
  )
}

export default Home
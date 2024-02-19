import React from 'react';
import styles from '../assets/css/TermsOfServices.module.css'

import Navbar from '../components/navbar/Navbar'
import TermsServices from '../components/TermsServices';
import Footer from '../components/Footer/Footer';

const TermsOfServices = () => {
  return (
    <>
        <div className={styles.Body}>

            <Navbar />
            <TermsServices />

        </div>
        
        <Footer />
    </>
  );
};

export default TermsOfServices;
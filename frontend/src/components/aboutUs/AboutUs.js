import React from 'react'
import londonImage from '../../images/london.jpg';
import dubaiImage from '../../images/dubai.jpg';
import styles from './aboutUs.module.css';
import { FaCheck } from "react-icons/fa";

export default function AboutUs() {
  return (
    <div className={styles.aboutUs}>
        <h1>About Us</h1>
        <div className={styles.content}>
            <div className={styles.aboutustext}>
               <h2>Welcome to Serenity seek</h2>
               <p>We are your premier destination for seamless corporate travel solutions. At Serenity Seek, we understand the significance of smooth and efficient travel arrangements for businesses. Our mission is simple: to revolutionize the way companies plan, book, and manage their corporate travel needs. With a dedicated team of travel experts, cutting-edge technology, and an extensive network of partners, we strive to offer tailored packages that cater to the unique requirements of businesses of all sizes.</p>
               <div className={styles.fortitles}>
                <div>
                    <FaCheck className={styles.icon}/>
                    <span>Premier Corporate Travel Solutions</span>
                </div>
                <div>
                    <FaCheck className={styles.icon}/>
                    <span>Revolutionizing Corporate Travel</span>
                </div>
                <div>
                    <FaCheck className={styles.icon} />
                    <span>Tailored Packages for Every Business</span>
                </div>
                <div>
                    <FaCheck className={styles.icon}/>
                    <span>Dedicated to Streamlined Business Travel</span>
                </div>
                
               </div>
            </div>
            <div className={styles.forimg}>
                <img src={londonImage} alt="img" />
                <img src={dubaiImage} alt="img" />
            </div>
        </div>
    </div>
  )
}

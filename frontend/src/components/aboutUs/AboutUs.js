import React from 'react'
import londonImage from '../../images/london.jpg';
import dubaiImage from '../../images/dubai.jpg';
import styles from './aboutUs.module.css';

export default function AboutUs() {
  return (
    <div className={styles.aboutUs}>
        <h1>About Us</h1>
        <div className={styles.content}>
            <div className={styles.aboutustext}>
                <p>
                Welcome to Serenity Seek! We are your premier destination for seamless corporate travel solutions. At Serenity Seek, we understand the significance of smooth and efficient travel arrangements for businesses.
            Our mission is simple: to revolutionize the way companies plan, book, and manage their corporate travel needs. With a dedicated team of travel experts, cutting-edge technology, and an extensive network of partners, we strive to offer tailored packages that cater to the unique requirements of businesses of all sizes.
                </p>
            </div>
            <div className={styles.forimg}>
                <img src={londonImage} alt="img" />
                <img src={dubaiImage} alt="img" />
            </div>
        </div>
    </div>
  )
}

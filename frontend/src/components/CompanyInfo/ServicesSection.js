import React from 'react'
import styles from '../../assets/css/companyInfo.module.css'
import { FaHandsHelping , FaMoneyCheck, FaList, FaPaypal} from "react-icons/fa"

function ServicesSection() {
  return (
    <section className={styles.page_content} id="services">
        <header className={styles.section_header}>
        <h2>Services</h2>
        <p className={styles.lite_text}>What we're all about!</p>
        </header>
        <div className={styles.grid_wrap}>

        <div className={styles.box}>
            <span className={styles.box_icon} alt="Web Development"><FaList></FaList></span>
            <p>Tour Packages</p>
        </div>
        <div className={styles.box}>
            <span className={styles.box_icon} alt="Web Design"><FaMoneyCheck></FaMoneyCheck></span>
            <p>Discounts</p>
        </div>
        
        <div className={styles.clear}></div>

        <div className={styles.box}>
            <span className={styles.box_icon} alt="Brand Monetization"><FaPaypal></FaPaypal></span>
            <p>Online Payment</p>
        </div>
        <div className={styles.box}>
            <span className={styles.box_icon} alt="Cloud"><FaHandsHelping></FaHandsHelping></span>
            <p>Customer Support</p>
        </div>

        <div className={styles.clear}></div>

        </div>
    </section>
  )
}

export default ServicesSection